/*global DiBB, Backbone */
DiBB.Bibliograph = Backbone.Model.extend({});

DiBB.BibliographCollection = Backbone.Collection.extend({

  model: DiBB.Bibliograph,
  url: "/bibliographs",
        
  initialize: function( models, options ) {

  }
          
}); 