/*global DiBB, Backbone, _ */

DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioSetList",
    "biblio_set/new": "biblioSetNew",
    "biblio_set/:id/edit": "biblioSetEdit",
    "bibliographs" : "bibliographList"
  },
  
  initialize: function(options) {
                      
    // global singleton
    DiBB.Routes.routes = this;
    
    // TODO
    this.graphDashboardURL = ""; 
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
  
  bibliographList: function() {
    this.initBibliograph( _.bind( function() {
      var bibliographListView = new DiBB.BibliographListView( { bibliographs: this.bibliographs, 
                                                                graphDashboardURL: this.graphDashboardURL });
      bibliographListView.render();
    }, this));        
  },
  
  initBibliograph: function( initView ) {
    
    if( !this.bibliographs ) {
      // TODO improve error handling
      var onFetchError = function( collection, response, options ) {
        alert(response);
      };

      this.bibliographs = new DiBB.BibliographCollection();
      this.bibliographs.fetch( { success: initView, error: onFetchError } );

    } else {
      initView();
    }
    
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