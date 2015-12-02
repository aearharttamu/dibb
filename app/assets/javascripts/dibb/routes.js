DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioList",  
    "bilbio/:id/edit": "biblioEdit"  
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