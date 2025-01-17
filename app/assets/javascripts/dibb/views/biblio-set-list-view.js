/*global DiBB, Backbone, JST, _ */

DiBB.BiblioSetListView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-set-list-view'],
  
  id: 'biblio-set-list-view',
  className: 'dibb-list-view',
  
  trIDTemplate: _.template("#bibid-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.biblioSets = options.biblioSets;
    this.isAdmin = options.isAdmin;
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var bibID = parseInt(deleteButton.attr("data-bibid"));
    var deletedBiblioSet = this.biblioSets.get(bibID);

    if( deletedBiblioSet ) {
      deleteButton.attr("disabled", true);  
      deletedBiblioSet.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: bibID}));
        tableRow.detach();
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { biblio_sets: this.biblioSets.toJSON(), canDelete: this.isAdmin } ));
    $(".dibb-app").html(this.$el);
  }
  
});