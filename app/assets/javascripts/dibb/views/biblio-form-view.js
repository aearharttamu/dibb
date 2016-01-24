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
		citationsTab: JST['dibb/templates/biblio-form/citations-tab']
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
    
  saveForm: function( onSuccessCallback ) {   
         
    var publisherID = null;
    if( this.referenceFieldSelection['publisher_id'] ) {
      publisherID = this.referenceFieldSelection['publisher_id'].id;
    } else {
      // TODO new object
    }
    
    this.biblio.set( {
      title: this.$('#title').val(),
      descriptors: this.$('#descriptors').val(),
      date_as_appears: this.$('#date_as_appears').val(),
      year: this.$('#year').val(),
      publisher_id: publisherID 
    });
    
    var onSuccess = _.bind( function(model, response, options) {
      this.validationErrors = null;
      onSuccessCallback(model, response, options);
    }, this);

    this.biblios.biblioSetID = this.biblio.get("biblio_set_id");
    this.biblios.add(this.biblio);
    this.biblio.save(null, { success: onSuccess, error: DiBB.Routes.onError });
  
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
  
  initReferenceField: function( fieldID, model, collectionClass ) {
        
    var collection = new collectionClass();
    
    collection.fetch( { success: _.bind( function(collection) {
      var field = this.$( "#"+fieldID );
      
      field.autocomplete({
        source: collection.names()
      });
      
      // populate the field with the currently referenced name
      var refID = model.get(fieldID);
      if( refID ) {
        var refModel = collection.get( parseInt(refID) );
        field.val( refModel.get("name") );
      }
      
      field.on( "autocompletechange", _.bind( function( event, refObject ) {
        this.referenceFieldSelection[fieldID] = refObject.item;     
      }, this) );
      
    }, this), error: DiBB.Routes.onError } );
    
  },
    
  render: function() {      
    
    this.$el.html(this.template( { 
      embedded: true, 
      biblio: this.biblio.toJSON(), 
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }));
  
    this.initReferenceField( "publisher_id", this.biblio, DiBB.PublisherCollection );
  
  }
  
});