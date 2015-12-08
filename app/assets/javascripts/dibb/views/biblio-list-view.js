DiBB.BiblioListView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-list-view'],
  
  id: 'biblio-list-view',
  className: 'bilbio-list',
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {
  },
  
  onDelete: function(event) {
    alert("delete item");    
  },  
  
  render: function() {
    
   this.$el.html(this.template());   
   this.$('#biblio-table').DataTable();    
   $(".dibb-app").html(this.$el);
    
  }
  
});