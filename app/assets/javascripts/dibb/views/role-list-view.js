
DiBB.RoleListView = Backbone.View.extend({

	template: JST['dibb/templates/role-list-view'],
  
  id: 'role-list-view',
  className: 'dibb-list-view',  
  
  trIDTemplate: _.template("#role-id-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
  
  initialize: function(options) {    
    this.isAdmin = options.isAdmin;
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var roleID = parseInt(deleteButton.attr("data-role-id"));
    var deletedRole = this.collection.get(roleID);

    if( deletedRole ) {
      deleteButton.attr("disabled", true);  
      deletedRole.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: roleID}));
        tableRow.detach();
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { roles: this.collection.toJSON(), canDelete: this.isAdmin } ));
    $(".dibb-app").html(this.$el);
  }
  
});