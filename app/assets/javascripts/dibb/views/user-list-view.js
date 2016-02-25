
DiBB.UserListView = Backbone.View.extend({

	template: JST['dibb/templates/user-list-view'],
  
  id: 'user-list-view',
  className: 'dibb-list-view',  
  
  partials: {
    checkMark: JST['dibb/templates/common/check-mark']
  },
  
  trIDTemplate: _.template("#user-id-<%= id %>"),
  
  initialize: function() {
    _.bindAll(this, "onEnable");    
  },
    
  onEnable: function(event) {
    var enableButton = $(event.currentTarget);
    var userID = parseInt(enableButton.attr("data-userid"));
    var enabledUser = this.collection.get(userID);
    
    enabledUser.set( { enabled: true });
   
    var onSuccess = _.bind( function(model, response, options) {
      this.render();
    }, this);

    enabledUser.save(null, { success: onSuccess, error: DiBB.Routes.onError }); 
  },
  
  render: function() {
    this.$el.html(this.template( { users: this.collection.toJSON(), partials: this.partials } ));
    $(".dibb-app").html(this.$el);
    $('.enable-user-button').click( this.onEnable );
  }
  
});