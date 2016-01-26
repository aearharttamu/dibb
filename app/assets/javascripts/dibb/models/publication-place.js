
DiBB.PublicationPlace = Backbone.Model.extend({

});

DiBB.PublicationPlaceCollection = Backbone.Collection.extend({

  model: DiBB.PublicationPlace,
  urlTemplate: _.template("biblio_sets/<%= biblioSetID %>/biblios/<$= biblioID %>/publication_places"),
          
  initialize: function( models, options ) {
    if( options ) {
      this.biblioSetID = options.biblioSetID;    
      this.biblioID = options.biblioID;
    }
  },
  
  url: function() {
    return (this.biblioSetID && this.biblioID) ? this.urlTemplate({ biblioSetID: this.biblioSetID, biblioID: this.biblioID }) :  "/noop.js";
  }
              
}); 