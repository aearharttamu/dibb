
DiBB.UserListView = Backbone.View.extend({

	template: JST['dibb/templates/user-list-view'],
  
  id: 'user-list-view',
  className: 'dibb-list-view',  
  
  trIDTemplate: _.template("#user-id-<%= id %>"),
  
  events: {
    'click .enable-user-button': 'onEnable'    
  },
    
  onEnable: function(event) {
    var enableButton = $(event.currentTarget);
    var userID = parseInt(enableButton.attr("data-userid"));
    var enabledUser = this.collection.get(userID);
    
    enabledUser.set( { enabled: true });
   
    var onSuccess = _.bind( function(model, response, options) {
      this.render();
    }, this);

    enableButton.attr("disabled", true);  
    enabledUser.save(null, { success: onSuccess, error: DiBB.Routes.onError }); 
  },
  
  render: function() {
    this.$el.html(this.template( { users: this.collection.toJSON() } ));
    $(".dibb-app").html(this.$el);
  }
  
});