DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form-view'],
  
  id: 'biblio-form-view',
  className: 'biblio-form',
  
  events: {
    'click .save-button' : 'onSave'
	},
	
	initialize: function(options) {
    // TODO can either edit and existing record or create a new one
  
    this.render();
  },
  
  onSave: function(e) {
    alert("save it");
  },
  
  render: function() {
    
   this.$el.html(this.template( { pageTitle: "New Bibliography"})); 
    
   $(".dibb-app").html(this.$el);
   
  }
  
});