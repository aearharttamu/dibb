DiBB.EditorialTab = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/editorial-tab'],
  
	partials: {
		textAreaInput: JST['dibb/templates/common/textarea-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']
	},
  
  id: 'editorial-tab-panel',
  className: 'biblio-tab',
            	
	initialize: function(options) {
    _.bindAll( this, "onValidationError" );    
    this.model.on("invalid", this.onValidationError );            
  },
      
  save: function( onSuccessCallback ) {   
                  
    this.model.set( {
      contents: this.$('#contents').val(),
      publisher_name: null
    });
                  
    var onSuccess = _.bind( function(model, response, options) {
      this.validationErrors = null;
      onSuccessCallback(model, response, options);
    }, this);

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