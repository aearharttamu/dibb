DiBB.RoleFormView = Backbone.View.extend({

	template: JST['dibb/templates/role-form-view'],
  
  id: 'role-form-view',
  className: 'dibb-form-view',
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
  
  pageTitle: {
    "new": "New Role",
    "edit": "Edit Role"
  },
  
  events: {
    "click .save-button": "onSave",
    "click .cancel-button": "onCancel"
  },
    	
	initialize: function(options) {
        
    if( options.roleID ) {
      this.model = this.collection.get(parseInt(options.roleID));
      this.mode = "edit";
    } else {
      this.model = new DiBB.Role();
      this.mode = "new";
    }    

    _.bindAll( this, "onValidationError" );        
    this.model.on("invalid", this.onValidationError );    
        
   },
   
   onValidationError: function( model, errors ) {
     this.validationErrors = errors;    
     this.render();
   },
  
  onSave: function(e) {

    this.model.set( {
      name: this.$('#name').val()
    });
   
    var onSuccess = _.bind( function(model, response, options) {
      DiBB.Routes.routes.navigate("roles", {trigger: true});
    }, this);

    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError }); 
  },
  
  onCancel: function() {
    DiBB.Routes.routes.navigate("roles", {trigger: true});
  },
      
  render: function() {    
    var pageTitle = this.pageTitle[this.mode];
    
    this.$el.html(this.template( { 
      role: this.model.toJSON(),
      partials: this.partials,
      validationErrors: this.validationErrors,
      pageTitle: pageTitle,
    }));
        
    $(".dibb-app").html(this.$el);
  }
  
});