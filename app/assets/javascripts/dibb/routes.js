
DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioList",  
    "biblio/new": "biblioNew",
    "biblio/:id/edit": "biblioEdit",  
  },
  
  initialize: function() {
                      
    // global singleton
    DiBB.Routes.routes = this;
  },

  biblioList: function() {
    
    this.initBiblios( _.bind( function() {
      var biblioListView = new DiBB.BiblioListView( { biblios: this.biblios });      
      biblioListView.render();
    }, this));        
  },
  
  biblioNew: function() {

    this.initBiblios( _.bind( function() {
      var biblioFormView = new DiBB.BiblioFormView( { biblios: this.biblios } );
      biblioFormView.render();
    }, this));        
    
  },

  biblioEdit: function(biblioID) {
    
    this.initBiblios( _.bind( function() {
      var biblioFormView = new DiBB.BiblioFormView( { biblios: this.biblios, biblioID: biblioID } );
      biblioFormView.render();
    }, this));
  },
  
  initBiblios: function( initView ) {

    if( !this.biblios ) {
      // TODO improve error handling
      var onFetchError = function( collection, response, options ) {
        alert(response);
      };

      this.biblios = new DiBB.BiblioCollection();    
      this.biblios.fetch( { success: initView, error: onFetchError } );

    } else {
      initView();
    }
  }      

});