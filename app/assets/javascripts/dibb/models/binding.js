DiBB.Binding = Backbone.Model.extend({

  urlTemplate: _.template("/bindings/<%= id %>"),

  url: function() {
    return this.urlTemplate({ id: this.id });
  }

});

DiBB.BindingCollection = Backbone.Collection.extend({

  model: DiBB.Binding,
  url: "/bindings",

  names: function() {
    return _.map( this.models, function( binding ) {
      var name = binding.get('name');
      return { text: name, value: binding.id };
    });
  }

});