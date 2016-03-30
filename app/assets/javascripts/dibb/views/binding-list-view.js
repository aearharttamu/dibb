
DiBB.BindingListView = Backbone.View.extend({

  template: JST['dibb/templates/binding-list-view'],

  id: 'binding-list-view',
  className: 'dibb-list-view',

  trIDTemplate: _.template("#pid-<%= id %>"),

  events: {
    'click .delete-button': 'onDelete'
  },

  initialize: function(options) {
    this.binding = options.binding;
    this.isAdmin = options.isAdmin;
  },

  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var pID = parseInt(deleteButton.attr("data-pid"));
    var deletedBinding = this.binding.get(pID);

    if( deletedBinding ) {
      deleteButton.attr("disabled", true);
      deletedBinding.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: pID}));
        tableRow.detach();
      }, this) });
    }
  },

  render: function() {
    this.$el.html(this.template( { binding: this.binding.toJSON(), canDelete: this.isAdmin } ));
    $(".dibb-app").html(this.$el);
  }

});