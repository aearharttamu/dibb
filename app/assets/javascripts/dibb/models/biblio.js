
DiBB.Biblio = Backbone.Model.extend({

  validYear: /(^\d{4}$)/,
  
  initialize: function(attributes, options) {    

    if( attributes ) {
      var publicationPlacesJSON = attributes.publication_places_json;
      var publicationPlacesObj = ( publicationPlacesJSON ) ? JSON.parse(publicationPlacesJSON) : null;
      this.publicationPlaces = new DiBB.PublicationPlaceCollection( publicationPlacesObj );
      var staffJSON = attributes.staff_json;
      var staffObj = ( staffJSON ) ? JSON.parse(staffJSON) : null;
      this.staff = new DiBB.StaffMemberCollection( staffObj );
      var citationsJSON = attributes.citations_json;
      var citationsObj = ( citationsJSON ) ? JSON.parse(citationsJSON) : null;
      this.citations = new DiBB.CitationCollection( citationsObj, { biblioID: this.id } );
    } else {
      this.publicationPlaces = new DiBB.PublicationPlaceCollection();
      this.staff = new DiBB.StaffMemberCollection();
      this.citations = new DiBB.CitationCollection( null, { biblioID: this.id });
    }

  },
  
  validate: function(attributes, options) {
        
    if( attributes.year && !this.validYear.exec(attributes.year) ) {
      return { year: "Year of Publication must be a four digit year." };
    }    
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