
DiBB.TitleListView = Backbone.View.extend({

	template: JST['dibb/templates/title-list-view'],
  
  id: 'title-list-view',
  className: 'dibb-list-view',  
  
  trIDTemplate: _.template("#title-id-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var titleID = parseInt(deleteButton.attr("data-titleid"));
    var deletedTitle = this.collection.get(titleID);

    if( deletedTitle ) {
      deleteButton.attr("disabled", true);  
      deletedTitle.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: titleID}));
        tableRow.detach();
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { titles: this.collection.toJSON() } ));
    $(".dibb-app").html(this.$el);
  }
  
});