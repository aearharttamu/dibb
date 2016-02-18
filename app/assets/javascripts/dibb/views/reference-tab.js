DiBB.ReferenceTab = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/reference-tab'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		textAreaInput: JST['dibb/templates/common/textarea-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']
	},
  
  id: 'reference-tab-panel',
  className: 'biblio-tab',
        	
	initialize: function(options) {
    _.bindAll( this, "onValidationError" );    
    this.model.on("invalid", this.onValidationError );            
  },
      
  save: function( onSuccessCallback ) {   
    // TODO
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