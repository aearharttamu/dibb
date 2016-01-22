
DiBB.PublisherListView = Backbone.View.extend({

	template: JST['dibb/templates/publisher-list-view'],
  
  id: 'publisher-list-view',
  className: 'publisher-list',
  
  trIDTemplate: _.template("#pubid-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.publishers = options.publishers;
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var pubID = parseInt(deleteButton.attr("data-pubid"));
    var deletedPublisher = this.biblioSets.get(pubID);

    if( deletedPublisher ) {
      deleteButton.attr("disabled", true);  
      deletedPublisher.destroy( { success: _.bind( function(){
        // var tableRow = this.$(this.trIDTemplate({id: bibID}));
        // this.dataTable.row(tableRow).remove().draw();
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { publishers: this.publishers.toJSON() } ));
    $(".dibb-app").html(this.$el);
  }
  
});