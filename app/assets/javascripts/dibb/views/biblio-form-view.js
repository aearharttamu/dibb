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
  
  pageTitle: {
    "new": "New Bibliography",
    "edit": "Edit Bibliography"
  },
    	
	initialize: function(options) {
        
    this.biblios = options.biblios;
    this.embedded = options.embed;
    this.referenceFieldSelection = {};
    
    _.bindAll( this, "onValidationError" );
    
    if( options.biblioID ) {
      this.biblio = this.biblios.get(parseInt(options.biblioID));
      this.mode = "edit";
    } else {
      this.biblio = new DiBB.Biblio();
      this.mode = "new";
    }    
    
    this.biblio.on("invalid", this.onValidationError );
    
    if( !this.embedded ) {
      // TODO set up click handlers for save and cancel
    }
    
  },
  
  saveReferenceFields: function( onSuccessCallback ) {
    
    // if this is a stub publisher record, create it on server before continuing
    if( !this.referenceFieldSelection['publisher_id']  ) {
      var publisherName = this.$('#publisher_id').val();
      
      // create a new record if the publisher name is not empty
      if( publisherName.length > 0 ) { 
        publisher = new DiBB.Publisher({ name: publisherName });
        publisher.save(null, { success: _.bind( function(publisher) {
          this.referenceFieldSelection['publisher_id'] = publisher.id;
          onSuccessCallback();
        }, this), error: DiBB.Routes.onError });
      }      
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
        year: this.$('#year').val(),
        publisher_id: this.referenceFieldSelection['publisher_id'] 
      });
      
      var publicationPlace = this.biblio.publicationPlaces.at(0);
      
      if( !publicationPlace ) {
        publicationPlace = new DiBB.PublicationPlace();
      }
    
      publicationPlace.set( {
        city: this.$('#city').val(),
        state: this.$('#state').val(),
        country: this.$('#country').val()        
      });
                
      var onSuccess = _.bind( function(model, response, options) {
        this.validationErrors = null;
        onSuccessCallback(model, response, options);
      }, this);

      this.biblio.publicationPlaces.add(publicationPlace); 
      publicationPlace.save(null, { error: DiBB.Routes.onError })      

      this.biblios.biblioSetID = this.biblio.get("biblio_set_id");
      this.biblios.add(this.biblio);
      this.biblio.save(null, { success: onSuccess, error: DiBB.Routes.onError });   
      
    }, this));
  
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
  
  initReferenceField: function( fieldID, model, suggestionDataSource ) {
        
    var field = this.$( "#"+fieldID );
    
    // this field tracks the reference to the collection's table
    this.referenceFieldSelection[fieldID] = model.get(fieldID);
    
    // if( this.referenceFieldSelection[fieldID] ) {
    //   field.attr("disabled", true);
    // }
        
    field.typeahead({
      minLength: 3,
      highlight: true
    },
    {
      name: fieldID,
      source: suggestionDataSource,
      display: function( suggestion ) { return suggestion.name; }
    });        
    
    field.bind('typeahead:select', _.bind(function(ev, suggestion) {
      this.referenceFieldSelection[fieldID] = suggestion.id;
      field.attr("disabled", true);
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
  
    this.initReferenceField( "publisher_id", this.biblio, DiBB.PublisherBloodhound );
  
  }
  
});