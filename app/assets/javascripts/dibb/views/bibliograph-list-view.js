/*global DiBB, Backbone, JST, _ */

DiBB.BibliographListView = Backbone.View.extend({

	template: JST['dibb/templates/bibliograph-list-view'],
  
  id: 'bibliograph-list-view',
  className: 'bibliograph-list',
  
  trIDTemplate: _.template("#bibid-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.bibliographs = options.bibliographs;
  },
  
  onDelete: function(event) {
    // var deleteButton = $(event.currentTarget);
   //  var bibID = parseInt(deleteButton.attr("data-bibid"));
   //  var deletedBiblioSet = this.biblio_sets.get(bibID);
   //
   //  if( deletedBiblioSet ) {
   //    deleteButton.attr("disabled", true);
   //    deletedBiblioSet.destroy( { success: _.bind( function(){
   //      var tableRow = this.$(this.trIDTemplate({id: bibID}));
   //      this.dataTable.row(tableRow).remove().draw();
   //    }, this) });
   //  }
  },
  
  render: function() {
    this.$el.html(this.template( { bibliographs: this.bibliographs.toJSON() } ));
    this.dataTable = this.$('#bibliograph-table').DataTable();
    $(".dibb-app").html(this.$el);
  }
  
});