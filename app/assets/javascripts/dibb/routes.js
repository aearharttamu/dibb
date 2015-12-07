DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioList",  
    "biblio/:id/edit": "biblioEdit",  
    "biblio/:id/new": "biblioEdit"  
  },

  biblioList: function() {
    var biblioListView = new DiBB.BiblioListView();
    biblioListView.render();
  },

  biblioEdit: function(biblioID) {
    var biblioFormView = new DiBB.BiblioFormView( { biblioID: biblioID } );
    biblioFormView.render();
  }

});