DiBB.BiblioListView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-list-view'],
  
  id: 'biblio-list-view',
  className: 'biblio-list',
  
  trIDTemplate: _.template("#bibid-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.biblios = options.biblios;
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var bibID = parseInt(deleteButton.attr("data-bibid"));
    var deletedBiblio = this.biblios.get(bibID);

    if( deletedBiblio ) {
      deleteButton.attr("disabled", true);  
      deletedBiblio.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: bibID}));
        this.dataTable.row(tableRow).remove().draw();        
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { biblios: this.biblios.toJSON() } ));
    this.dataTable = this.$('#biblio-table').DataTable();    
    $(".dibb-app").html(this.$el);
  }
  
});