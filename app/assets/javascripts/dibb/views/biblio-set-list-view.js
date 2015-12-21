/*global DiBB, Backbone, JST, _ */

DiBB.BiblioSetListView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-set-list-view'],
  
  id: 'biblio-set-list-view',
  className: 'biblio-set-list',
  
  trIDTemplate: _.template("#bibid-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.biblio_sets = options.biblio_sets;
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var bibID = parseInt(deleteButton.attr("data-bibid"));
    var deletedBiblioSet = this.biblio_sets.get(bibID);

    if( deletedBiblioSet ) {
      deleteButton.attr("disabled", true);  
      deletedBiblioSet.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: bibID}));
        this.dataTable.row(tableRow).remove().draw();        
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { biblio_sets: this.biblio_sets.toJSON() } ));
    this.dataTable = this.$('#biblio_set-table').DataTable();
    $(".dibb-app").html(this.$el);
  }
  
});