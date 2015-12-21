/*global DiBB, Backbone, _ */

DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioSetList",
    "biblio_set/new": "biblioSetNew",
    "biblio_set/:id/edit": "biblioSetEdit"
  },
  
  initialize: function() {
                      
    // global singleton
    DiBB.Routes.routes = this;
  },

  biblioSetList: function() {
    
    this.initBiblioSets( _.bind( function() {
      var biblioSetListView = new DiBB.BiblioSetListView( { biblio_sets: this.biblio_sets });
      biblioSetListView.render();
    }, this));        
  },
  
  biblioSetNew: function() {

    this.initBiblioSets( _.bind( function() {
      var biblioSetFormView = new DiBB.BiblioSetFormView( { biblio_sets: this.biblio_sets } );
      biblioSetFormView.render();
    }, this));        
    
  },

  biblioSetEdit: function(biblioSetID) {
    
    this.initBiblioSets( _.bind( function() {
      var biblioSetFormView = new DiBB.BiblioSetFormView( { biblio_sets: this.biblio_sets, biblioSetID: biblioSetID } );
      biblioSetFormView.render();
    }, this));
  },
  
  initBiblioSets: function( initView ) {

    if( !this.biblio_sets ) {
      // TODO improve error handling
      var onFetchError = function( collection, response, options ) {
        alert(response);
      };

      this.biblio_sets = new DiBB.BiblioSetCollection();
      this.biblio_sets.fetch( { success: initView, error: onFetchError } );

    } else {
      initView();
    }
  }      

});