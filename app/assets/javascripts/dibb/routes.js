
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
    
    this.loadBiblioSets( _.bind( function(biblioSets) {
      var biblioSetListView = new DiBB.BiblioSetListView( { biblioSets: biblioSets });
      biblioSetListView.render();
    }, this));        
  },
  
  biblioSetNew: function() {
    
    this.loadBiblioSets( _.bind( function(biblioSets) {
      var biblioSetFormView = new DiBB.BiblioSetFormView( { biblioSets: biblioSets } );
      biblioSetFormView.render();
    }, this));        
    
  },

  biblioSetEdit: function(biblioSetID) {
    
    this.loadBiblioSets( _.bind( function(biblioSets) {
      var biblioSetFormView = new DiBB.BiblioSetFormView( { biblioSets: biblioSets, biblioSetID: biblioSetID } );
      biblioSetFormView.render();
    }, this));
  },
  
  bibliographList: function() {
    
    this.loadBibliograph( _.bind( function(bibliographs) {
      var bibliographListView = new DiBB.BibliographListView( { bibliographs: bibliographs, 
                                                                graphDashboardURL: this.graphDashboardURL });
      bibliographListView.render();
    }, this));        
  },
  
  loadBibliograph: function( initView ) {
    var bibliographs = new DiBB.BibliographCollection();
    bibliographs.fetch( { success: initView, error: this.onError } );
  },
  
  loadBiblioSets: function( initView ) {
    var biblioSets = new DiBB.BiblioSetCollection();
    biblioSets.fetch( { success: initView, error: this.onError } );
  },
  
   // TODO improve error handling
  onError: function( collection, response, options ) {
     alert(response);    
  }    

});