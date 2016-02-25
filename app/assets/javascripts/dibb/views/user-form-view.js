DiBB.UserFormView = Backbone.View.extend({

	template: JST['dibb/templates/user-form-view'],
  
  id: 'user-form-view',
  className: 'dibb-form-view',
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		dropdownInput: JST['dibb/templates/common/dropdown-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
    
  events: {
    "click .save-button": "onSave",
    "click .cancel-button": "onCancel"
  },
    	
	initialize: function(options) {
    this.model = this.collection.get(parseInt(options.userID));
    _.bindAll( this, "onValidationError" );        
    this.model.on("invalid", this.onValidationError );            
   },
   
   onValidationError: function( model, errors ) {
     this.validationErrors = errors;    
     this.render();
   },
  
  onSave: function(e) {

    this.model.set( {
      email: this.$('#email').val(),
      admin: this.$('#admin').val()
    });
   
    var onSuccess = _.bind( function(model, response, options) {
      DiBB.Routes.routes.navigate("users", {trigger: true});
    }, this);

    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError }); 
  },
  
  onCancel: function() {
    DiBB.Routes.routes.navigate("users", {trigger: true});
  },
      
  render: function() {    
    
    this.$el.html(this.template( { 
      user: this.model.toJSON(),
      partials: this.partials,
      booleanValues: DiBB.BooleanValues,
      validationErrors: this.validationErrors
    }));
        
    $(".dibb-app").html(this.$el);
  }
  
});