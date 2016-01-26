
DiBB.Biblio = Backbone.Model.extend({

  validYear: /(^\d{4}$)/,
  
  initialize: function(attributes, options) {
    var publicationPlacesJSON = attributes.publication_places;
    var publicationPlaceOptions = { biblio: attributes.id, biblio_set_id: attributes.biblio_set_id };
    
    var publicationPlacesObj = ( publicationPlacesJSON ) ? JSON.parse(publicationPlacesJSON) : null;
    this.publicationPlaces = new DiBB.PublicationPlaceCollection( publicationPlacesObj, publicationPlaceOptions );
  },
  
  validate: function(attributes, options) {
        
    if( attributes.year && !this.validYear.exec(attributes.year) ) {
      return { year: "Year of Publication must be a four digit year." };
    }    
  },
  
  obj: function() {
    var obj = this.toJSON();
    obj.publicationPlaces = this.publicationPlaces.toJSON();
    return obj;
  }
  
});

DiBB.BiblioCollection = Backbone.Collection.extend({

  model: DiBB.Biblio,
  urlTemplate: _.template("biblio_sets/<%= biblioSetID %>/biblios"),
          
  initialize: function( models, options ) {
    if( options ) {
      this.biblioSetID = options.biblioSetID;    
    }
  },
    
  url: function() {
    return (this.biblioSetID) ? this.urlTemplate({ biblioSetID: this.biblioSetID }) :  "/noop.js";
  }
              
}); 