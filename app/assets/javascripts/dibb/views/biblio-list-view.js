DiBB.BiblioListView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-list-view'],
  
  id: 'biblio-list-view',
  
  events: {
    // 'click .save-button' : 'onSave',
	},
	
	initialize: function(options) {
  
  },
  
  render: function() {
    
   $(".dibb-app").html(this.template()); 
    
  }
  
});