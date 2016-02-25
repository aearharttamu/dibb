
DiBB.UserListView = Backbone.View.extend({

	template: JST['dibb/templates/user-list-view'],
  
  id: 'user-list-view',
  className: 'dibb-list-view',  
  
  trIDTemplate: _.template("#user-id-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var userID = parseInt(deleteButton.attr("data-userid"));
    var deletedUser = this.collection.get(userID);

    if( deletedUser ) {
      deleteButton.attr("disabled", true);  
      deletedUser.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: userID}));
        tableRow.detach();
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { users: this.collection.toJSON() } ));
    $(".dibb-app").html(this.$el);
  }
  
});