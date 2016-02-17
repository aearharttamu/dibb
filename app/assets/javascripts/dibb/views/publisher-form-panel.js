
DiBB.PublisherFormPanel = Backbone.View.extend({

	template: JST['dibb/templates/publisher-form/publisher-form-panel'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
  
  id: 'publisher-form-panel',
  className: 'publisher-form-panel',
    	
	initialize: function(options) {
    _.bindAll( this, "onValidationError" );        
    this.model.on("invalid", this.onValidationError );    
   },
          
  save: function( onSuccessCallback ) {   
         
    this.model.set( {
      name: this.$('#name').val()
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
    this.$el.html( this.template( {
      publisher: this.model.toJSON(),
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }) );
  }
  
});