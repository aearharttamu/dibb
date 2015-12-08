
DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioList",  
    "biblio/:id/edit": "biblioEdit",  
    "biblio/:id/new": "biblioEdit"  
  },
  
  initialize: function() {
    this.biblios = new DiBB.BiblioCollection();
  },

  biblioList: function() {
    new DiBB.BiblioListView( { biblios: this.biblios });
  },

  biblioEdit: function(biblioID) {
    new DiBB.BiblioFormView( { biblios: this.biblios, biblioID: biblioID } );
  }

});