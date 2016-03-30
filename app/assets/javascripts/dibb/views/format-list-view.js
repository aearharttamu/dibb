
DiBB.FormatListView = Backbone.View.extend({

  template: JST['dibb/templates/format-list-view'],

  id: 'format-list-view',
  className: 'dibb-list-view',

  trIDTemplate: _.template("#format-id-<%= id %>"),

  events: {
    'click .delete-button': 'onDelete'
  },

  initialize: function(options) {
    this.isAdmin = options.isAdmin;
  },

  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var formatID = parseInt(deleteButton.attr("data-format-id"));
    var deletedRole = this.collection.get(formatID);

    if( deletedRole ) {
      deleteButton.attr("disabled", true);
      deletedRole.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: formatID}));
        tableRow.detach();
      }, this) });
    }
  },

  render: function() {
    this.$el.html(this.template( { formats: this.collection.toJSON(), canDelete: this.isAdmin } ));
    $(".dibb-app").html(this.$el);
  }

});