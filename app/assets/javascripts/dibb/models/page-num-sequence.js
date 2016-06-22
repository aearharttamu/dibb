DiBB.PageNumSequence = Backbone.Model.extend({
  urlRoot: _.template("page_num_sequences")
});

DiBB.PageNumSequenceCollection = Backbone.Collection.extend({
  model: DiBB.PageNumSequence,
  url: "page_num_sequences"
});