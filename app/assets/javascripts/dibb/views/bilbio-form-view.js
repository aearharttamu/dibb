DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form-view'],
  
  id: 'biblio-form-view',
  className: 'biblio-form',
  
  events: {
    'click .save-button' : 'onSave'
	},
	
	initialize: function(options) {
  
  },
  
  onSave: function(e) {
    alert("save it");
    
    return false;
    
  },
  
  render: function() {
    
   this.$el.html(this.template( { title: "New Bibliography"})); 
    
   $(".dibb-app").html(this.$el);
   
  }
  
});