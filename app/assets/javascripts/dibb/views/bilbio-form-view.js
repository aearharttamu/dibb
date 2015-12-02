DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form-view'],
  
  id: 'biblio-form-view',
  
  events: {
    // 'click .save-button' : 'onSave',
	},
	
	initialize: function(options) {
  
  },
  
  render: function() {
    
   $(".dibb-app").html(this.template()); 
    
  }
  
});