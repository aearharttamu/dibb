/*global DiBB, Backbone */
DiBB.Bibliograph = Backbone.Model.extend({
  
  validate: function(attributes, options) {
        
    if( attributes.name == null || attributes.name.length == 0 ) {
      return { name: "Graph name cannot be blank." };
    }    
  }
  
});

DiBB.BibliographCollection = Backbone.Collection.extend({

  model: DiBB.Bibliograph,
  url: "/bibliographs",
        
  initialize: function( models, options ) {

  }
          
}); 