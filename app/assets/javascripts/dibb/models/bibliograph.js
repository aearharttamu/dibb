/*global DiBB, Backbone */
DiBB.Bibliograph = Backbone.Model.extend({});

DiBB.BibliographCollection = Backbone.PageableCollection.extend({

  model: DiBB.Bibliograph,
  url: "/bibliographs",
        
  initialize: function( models, options ) {

  }
          
}); 