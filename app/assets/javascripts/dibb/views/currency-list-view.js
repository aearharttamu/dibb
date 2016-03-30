
DiBB.CurrencyListView = Backbone.View.extend({

  template: JST['dibb/templates/currency-list-view'],

  id: 'currency-list-view',
  className: 'dibb-list-view',

  trIDTemplate: _.template("#currency-id-<%= id %>"),

  events: {
    'click .delete-button': 'onDelete'
  },

  initialize: function(options) {
    this.isAdmin = options.isAdmin;
  },

  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var currencyID = parseInt(deleteButton.attr("data-currency-id"));
    var deletedRole = this.collection.get(currencyID);

    if( deletedRole ) {
      deleteButton.attr("disabled", true);
      deletedRole.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: currencyID}));
        tableRow.detach();
      }, this) });
    }
  },

  render: function() {
    this.$el.html(this.template( { currencies: this.collection.toJSON(), canDelete: this.isAdmin } ));
    $(".dibb-app").html(this.$el);
  }

});