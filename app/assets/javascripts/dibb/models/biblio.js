
DiBB.Biblio = Backbone.Model.extend({});

DiBB.BiblioCollection = Backbone.Collection.extend({

  model: DiBB.Biblio,
  url: "/biblios",
          
  initialize: function( models, options ) {

  }
          
}); 