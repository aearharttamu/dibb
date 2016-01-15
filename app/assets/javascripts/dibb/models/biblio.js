/*global DiBB, Backbone */
DiBB.BiblioSet = Backbone.Model.extend({});

DiBB.BiblioSetCollection = Backbone.PageableCollection.extend({

  model: DiBB.BiblioSet,
  url: "/biblio_sets",
        
  initialize: function( models, options ) {

    this.setPageSize(20);
    
  }
          
}); 