
DiBB.PublicationPlace = Backbone.Model.extend({
  
  urlTemplate: _.template("/biblios/<$= biblioID %>/publication_places"),
          
  initialize: function( options ) {
    if( options ) {
      this.urlRoot = this.urlTemplate({ biblioID: options.biblioID });
    }
  }

});

DiBB.PublicationPlaceCollection = Backbone.Collection.extend({

  model: DiBB.PublicationPlace,
  urlTemplate: _.template("/biblios/<$= biblioID %>/publication_places"),
          
  initialize: function( models, options ) {
    if( options ) {
      this.biblioID = options.biblioID;
    }
  },
  
  url: function() {
    return (this.biblioID) ? this.urlTemplate({ biblioID: this.biblioID }) :  "/publication_places";
  }
              
}); 