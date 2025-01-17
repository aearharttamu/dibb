
DiBB.PublisherListView = Backbone.View.extend({

	template: JST['dibb/templates/publisher-list-view'],
  
  id: 'publisher-list-view',
  className: 'dibb-list-view',  
  
  trIDTemplate: _.template("#pubid-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.publishers = options.publishers;
    this.isAdmin = options.isAdmin;
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var pubID = parseInt(deleteButton.attr("data-pubid"));
    var deletedPublisher = this.publishers.get(pubID);

    if( deletedPublisher ) {
      deleteButton.attr("disabled", true);  
      deletedPublisher.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: pubID}));
        tableRow.detach();
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { publishers: this.publishers.toJSON(), canDelete: this.isAdmin } ));
    $(".dibb-app").html(this.$el);
  }
  
});