DiBB.Currency = Backbone.Model.extend({

  urlTemplate: _.template("/currencies/<%= id %>"),

  validate: function(attributes, options) {

    if( attributes.name == null || attributes.name.length == 0 ) {
      return { name: "Currency name cannot be blank." };
    }
  },

  url: function() {
    return this.urlTemplate({ id: this.id });
  }

});

DiBB.CurrencyCollection = Backbone.Collection.extend({

  model: DiBB.Currency,
  url: "/currencies",

  names: function() {
    return _.map( this.models, function( currency ) {
      var name = currency.get('name');
      return { text: name, value: currency.id };
    });
  }

});