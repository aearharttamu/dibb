DiBB.PrimaryTab = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/primary-tab'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		textAreaInput: JST['dibb/templates/common/textarea-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']
	},
  
  id: 'primary-tab-panel',
  className: 'biblio-tab',
        	
	initialize: function(options) {
    _.bindAll( this, "onValidationError" );    
    this.model.on("invalid", this.onValidationError );            
  },
      
  save: function( onSuccessCallback ) {   
                  
    this.model.set( {
      title: this.$('#title').val(),
      descriptors: this.$('#descriptors').val(),
      date_as_appears: this.$('#date_as_appears').val(),
      year: this.$('#year').val(),
      publication_places_json: this.model.publicationPlaces.toJSON()
    });

    // if the user created a publisher and it isn't linked, save it
    var publisherName = this.$('#publisher_id').val();
    if( !this.model.get('publisher_id') && publisherName.length > 0 ) {      
      this.model.set( 'publisher_name', publisherName );      
    } else {
      this.model.set( 'publisher_name', null );      
    }
                  
    var onSuccess = _.bind( function(model, response, options) {
      this.validationErrors = null;
      onSuccessCallback(model, response, options);
    }, this);

    this.collection.biblioSetID = this.model.get("biblio_set_id");
    this.collection.add(this.model);
    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError });   
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
    
  render: function() {      
        
    this.$el.html(this.template( { 
      biblio: this.model.toJSON(), 
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }));
    
    // render publisher reference input field
    var publisherField = new DiBB.ReferenceInput( {
      id: 'publisher-field',
      model: this.model, 
      formViewClass: DiBB.PublisherFormModal,
      refModelClass: DiBB.Publisher,
      loader: DiBB.Routes.routes.loadPublishers,
      field_name: 'publisher_id', 
      field_title: 'Publisher Name', 
      field_value: this.model.get("publisher_name"), 
      field_instructions: 'Select the name of the publisher as it appears on the item.', 
      error: _.has(this.validationErrors, 'publisher_id')       
    });
    publisherField.render();
    this.$("#publisher-field").replaceWith(publisherField.$el);
        
    // render places panel
    var publicationPlacesPanel = new DiBB.PublicationPlacesPanel({ collection: this.model.publicationPlaces });
    publicationPlacesPanel.render();
    this.$("#"+publicationPlacesPanel.id).replaceWith(publicationPlacesPanel.$el);

    // render staff panel
    var staffPanel = new DiBB.StaffPanel({ collection: this.model.staff });
    staffPanel.render();
    this.$("#"+staffPanel.id).replaceWith(staffPanel.$el);
  
  }
  
});