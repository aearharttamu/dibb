DiBB.BiblioListView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-list-view'],
  
  id: 'biblio-list-view',
    
	initialize: function(options) {
    _.bindAll(this, "onDelete");
  },
  
  onDelete: function(event) {
    alert("delete item");    
  },  
  
  render: function() {
    
   $(".dibb-app").html(this.template());   
   $('#biblio-table').DataTable();
  
   // buttons in the table must be inited after table renders
   $('.delete-button').click(this.onDelete);
    
  }
  
});