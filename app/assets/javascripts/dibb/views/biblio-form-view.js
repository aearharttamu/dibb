/*global DiBB, Backbone, JST */

DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/biblio-form-view'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		stringInputCell: JST['dibb/templates/common/string-input-cell'],
		numberInput: JST['dibb/templates/common/number-input'],
		textAreaInput: JST['dibb/templates/common/textarea-input'],
		dropdownInput: JST['dibb/templates/common/dropdown-input'],
    validationErrors: JST['dibb/templates/common/validation-errors'],
		primaryTab: JST['dibb/templates/biblio-form/primary-tab'],
		referenceTab: JST['dibb/templates/biblio-form/reference-tab'],
		physicalTab: JST['dibb/templates/biblio-form/physical-tab'],
		editorialTab: JST['dibb/templates/biblio-form/editorial-tab'],
		citationsTab: JST['dibb/templates/biblio-form/citations-tab'],
		staff: JST['dibb/templates/biblio-form/staff']
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
        year: this.$('#year').val(),
        publication_places_json: this.biblio.publicationPlaces.toJSON()
      });
                      
      var onSuccess = _.bind( function(model, response, options) {
        this.validationErrors = null;
        onSuccessCallback(model, response, options);
      }, this);

      this.biblios.biblioSetID = this.biblio.get("biblio_set_id");
      this.biblios.add(this.biblio);
      this.biblio.save(null, { success: onSuccess, error: DiBB.Routes.onError });   
      
    }, this));
  
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
    
  render: function() {      
        
    this.$el.html(this.template( { 
      embedded: true, 
      biblio: this.biblio.toJSON(), 
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }));
    
    // render publisher reference input field
    var publisherField = new DiBB.ReferenceInput( {
      id: 'publisher-field',
      model: this.biblio, 
      formViewClass: DiBB.PublisherFormModal,
      refModelClass: DiBB.Publisher,
      loader: DiBB.Routes.routes.loadPublishers,
      field_name: 'publisher_id', 
      field_title: 'Publisher Name', 
      field_value: this.biblio.get("publisher_name"), 
      field_instructions: 'Select the name of the publisher as it appears on the item.', 
      error: _.has(this.validationErrors, 'publisher_id')       
    });
    publisherField.render();
    this.$("#publisher-field").replaceWith(publisherField.$el);
        
    // render publications panel
    var publicationPlacesPanel = new DiBB.PublicationPlacesPanel({ collection: this.biblio.publicationPlaces });
    publicationPlacesPanel.render();
    this.$("#"+publicationPlacesPanel.id).replaceWith(publicationPlacesPanel.$el);

    // render staff panel
    var staffPanel = new DiBB.StaffPanel({ collection: this.biblio.staff });
    staffPanel.render();
    this.$("#"+staffPanel.id).replaceWith(staffPanel.$el);
  
  }
  
});