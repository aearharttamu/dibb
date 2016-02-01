/*global DiBB, Backbone, JST */

DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form-view'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		numberInput: JST['dibb/templates/common/number-input'],
		textAreaInput: JST['dibb/templates/common/textarea-input'],
		dropdownInput: JST['dibb/templates/common/dropdown-input'],
		referenceInput: JST['dibb/templates/common/reference-input'],
    validationErrors: JST['dibb/templates/common/validation-errors'],
		primaryTab: JST['dibb/templates/biblio-form/primary-tab'],
		referenceTab: JST['dibb/templates/biblio-form/reference-tab'],
		physicalTab: JST['dibb/templates/biblio-form/physical-tab'],
		editorialTab: JST['dibb/templates/biblio-form/editorial-tab'],
		citationsTab: JST['dibb/templates/biblio-form/citations-tab'],
		publicationPlace: JST['dibb/templates/biblio-form/publication-place']
	},
  
  id: 'biblio-form-view',
  className: 'biblio-form',
  
  refEditButtonSelectorTemplate: _.template("#edit-<%= fieldID %>"),
  
  pageTitle: {
    "new": "New Bibliography",
    "edit": "Edit Bibliography"
  },
    	
	initialize: function(options) {
        
    this.biblios = options.biblios;
    this.embedded = options.embed;
    this.referenceFieldSelection = {};
    
    _.bindAll( this, "onValidationError", "onRefEditButton", "onRefModalClose" );
    
    if( options.biblioID ) {
      this.biblio = this.biblios.get(parseInt(options.biblioID));
      this.mode = "edit";
    } else {
      this.biblio = new DiBB.Biblio();
      this.mode = "new";
    }    
    
    this.biblio.on("invalid", this.onValidationError );
    
    // data source for publisher drop down
    this.publisherBloodhound = DiBB.PublisherBloodhound();
    
    if( !this.embedded ) {
      // TODO set up click handlers for save and cancel
    }
    
  },
  
  saveReferenceFields: function( onSuccessCallback ) {

    var publisherName = this.$('#publisher_id').val();
    
    // if this is a stub publisher record, create it on server before continuing
    if( !this.biblio.get('publisher_id') && publisherName.length > 0 ) {      
      publisher = new DiBB.Publisher({ name: publisherName });
      publisher.save(null, { success: _.bind( function(publisher) {
        this.biblio.set('publisher_id', publisher.id );
        onSuccessCallback();
      }, this), error: DiBB.Routes.onError });
    } else {
      onSuccessCallback();
    }
    
  },
    
  saveForm: function( onSuccessCallback ) {   
         
    this.saveReferenceFields( _.bind( function() {
      
      this.biblio.set( {
        title: this.$('#title').val(),
        descriptors: this.$('#descriptors').val(),
        date_as_appears: this.$('#date_as_appears').val(),
        year: this.$('#year').val()
      });
      
      // var publicationPlace = this.biblio.publicationPlaces.at(0);
      //
      // if( !publicationPlace ) {
      //   publicationPlace = new DiBB.PublicationPlace();
      // }
      //
      // publicationPlace.set( {
      //   city: this.$('#city').val(),
      //   state: this.$('#state').val(),
      //   country: this.$('#country').val()
      // });
                
      var onSuccess = _.bind( function(model, response, options) {
        this.validationErrors = null;
        onSuccessCallback(model, response, options);
      }, this);

      // this.biblio.publicationPlaces.add(publicationPlace);
      // publicationPlace.save(null, { error: DiBB.Routes.onError })

      this.biblios.biblioSetID = this.biblio.get("biblio_set_id");
      this.biblios.add(this.biblio);
      this.biblio.save(null, { success: onSuccess, error: DiBB.Routes.onError });   
      
    }, this));
  
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
  
  toggleReferenceFieldState: function( field, enabled ) {
    var backgroundColor = (enabled) ? 'white' : '#f0f0f0';
    field.attr("disabled", !enabled );
    field.css("background-color", backgroundColor);          
  },
  
  onRefEditButton: function( model, fieldID, refModelClass, formViewClass ) {
    
    var refID = model.get(fieldID);
    var refModel = new refModelClass( { id: refID });
    
    refModel.fetch( { success: _.bind( function(refModel) {
      // set up the edit dialog
      var formView = new formViewClass({ model: refModel, onClose: _.partial( this.onRefModalClose, fieldID, model )});
      formView.render();
      this.$el.append(formView.$el);
      formView.open();         
    },this), 
    error: DiBB.Routes.onError });
  },
  
  onRefModalClose: function( fieldID, model, fieldValue, refID ) {
    var field = this.$( "#"+fieldID );
    field.val(fieldValue);
    model.set( fieldID, refID );
    this.toggleReferenceFieldState(field, (refID == null));
  },
  
  initReferenceField: function( fieldID, model, dataSource, formViewClass, refModelClass ) {
        
    var field = this.$( "#"+fieldID );
    
    // if this field is linked disable editing
    if( model.get(fieldID) ) {
      this.toggleReferenceFieldState(field, false);
    }
        
    field.typeahead({
      minLength: 3,
      highlight: true
    },
    {
      name: fieldID,
      source: dataSource,
      display: function( suggestion ) { return suggestion.name; }
    });        
    
    var refEditButton = this.$(this.refEditButtonSelectorTemplate({ fieldID: fieldID }));
    refEditButton.click( _.partial( this.onRefEditButton, model, fieldID, refModelClass, formViewClass ) );
    
    field.bind('typeahead:select', _.bind(function(ev, suggestion) {
      model.set( fieldID, suggestion.id );
      this.toggleReferenceFieldState(field, false);
    }, this));      
    
  },
    
  render: function() {      
    
    var obj = this.biblio.obj();
    
    this.$el.html(this.template( { 
      embedded: true, 
      biblio: obj, 
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }));
      
    this.initReferenceField( 
      "publisher_id", 
      this.biblio, 
      this.publisherBloodhound, 
      DiBB.PublisherFormModal,
      DiBB.Publisher 
    );
  
  }
  
});