/*global DiBB, Backbone */
DiBB.BiblioSet = Backbone.Model.extend({
  urlRoot: "biblio_sets"
});

DiBB.BiblioSetCollection = Backbone.Collection.extend({
  model: DiBB.BiblioSet,
  url: "biblio_sets"            
}); 