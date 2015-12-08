DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioList",  
    "biblio/:id/edit": "biblioEdit",  
    "biblio/:id/new": "biblioEdit"  
  },

  biblioList: function() {
    new DiBB.BiblioListView();
  },

  biblioEdit: function(biblioID) {
    new DiBB.BiblioFormView( { biblioID: biblioID } );
  }

});