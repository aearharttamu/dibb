DiBB.Format = Backbone.Model.extend({

  urlTemplate: _.template("/formats/<%= id %>"),

  validate: function(attributes, options) {

    if( attributes.name == null || attributes.name.length == 0 ) {
      return { name: "Format name cannot be blank." };
    }
  },

  url: function() {
    return this.urlTemplate({ id: this.id });
  }

});

DiBB.FormatCollection = Backbone.Collection.extend({

  model: DiBB.Format,
  url: "/formats",

  names: function() {
    return _.map( this.models, function( format ) {
      var name = format.get('name');
      return { text: name, value: format.id };
    });
  }

});