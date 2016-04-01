DiBB.PageNumSequence = Backbone.Model.extend({

  urlTemplate: _.template("/page_num_sequences/<%= id %>"),

  url: function() {
    return this.urlTemplate({ id: this.id });
  }

});

DiBB.PageNumSequenceCollection = Backbone.Collection.extend({

  model: DiBB.PageNumSequence,

  url: "/page_num_sequences"

});