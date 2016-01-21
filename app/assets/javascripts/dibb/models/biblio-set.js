/*global DiBB, Backbone */
DiBB.BiblioSet = Backbone.Model.extend({});

DiBB.BiblioSetCollection = Backbone.Collection.extend({

  model: DiBB.BiblioSet,
  url: "/biblio_sets",
          
  initialize: function( models, options ) {
  },
  
  fetchSet: function() {
    
    fetch( { success: initView, error: onFetchError } );
  }
          
}); 