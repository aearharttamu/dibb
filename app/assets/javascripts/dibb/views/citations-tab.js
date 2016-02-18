DiBB.CitationsTab = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/citations-tab'],
  
	partials: {
    validationErrors: JST['dibb/templates/common/validation-errors']
	},
  
  id: 'citations-tab-panel',
  className: 'biblio-tab',
            	
	initialize: function(options) {
    _.bindAll( this, "onValidationError" );    
    this.model.on("invalid", this.onValidationError );            
  },
      
  save: function( onSuccessCallback ) {   
                  
    // this.model.set( {
    //   size: this.$('#size').val(),
    //   binding: this.$('#binding').val(),
    //   pagination: this.$('#pagination').val(),
    //   unnumbered_pages: this.$('#unnumbered_pages').val()
    // });
                  
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
    
  }
  
});