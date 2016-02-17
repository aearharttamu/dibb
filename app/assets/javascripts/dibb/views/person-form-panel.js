
DiBB.PersonFormPanel = Backbone.View.extend({

	template: JST['dibb/templates/person-form/person-form-panel'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
  
  id: 'person-form-panel',
  className: 'person-form-panel',
    	
	initialize: function(options) {
    _.bindAll( this, "onValidationError" );        
    this.model.on("invalid", this.onValidationError );    
   },
          
  save: function( onSuccessCallback ) {   
         
    this.model.set( {
      full_name: this.$('#full_name').val(), 
      first_name: this.$('#first_name').val(), 
      middle_name: this.$('#middle_name').val(), 
      last_name: this.$('#last_name').val(), 
      alternative_name: this.$('#alternative_name').val() 
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
      person: this.model.toJSON(),
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }) );
  }
  
});