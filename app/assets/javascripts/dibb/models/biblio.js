DiBB.Biblio = Backbone.Model.extend({

  validYear: /(^\d{4}$)/,

  validPublicationNumber: function () {

    // Check for numeric
    if (this.attributes.pub_number && !$.isNumeric(this.attributes.pub_number)) {
      return false;
    }

    if (this.attributes.pub_number_type == "issn" && this.attributes.pub_number.length == 8) {
      return true;
    }
    else if (this.attributes.pub_number_type == "isbn" && (this.attributes.pub_number.length == 10 || this.attributes.pub_number.length == 13)) {
      return true;
    }
    else {
      return false;
    }
  },

  initialize: function (attributes, options) {

    if (attributes) {
      var publicationPlacesJSON = attributes.publication_places_json;
      var publicationPlacesObj = ( publicationPlacesJSON ) ? JSON.parse(publicationPlacesJSON) : null;
      this.publicationPlaces = new DiBB.PublicationPlaceCollection(publicationPlacesObj);
      var staffJSON = attributes.staff_json;
      var staffObj = ( staffJSON ) ? JSON.parse(staffJSON) : null;
      this.staff = new DiBB.StaffMemberCollection(staffObj);
      var citationsJSON = attributes.citations_json;
      var citationsObj = ( citationsJSON ) ? JSON.parse(citationsJSON) : null;
      this.citations = new DiBB.CitationCollection(citationsObj, {biblioID: this.id});
    } else {
      this.publicationPlaces = new DiBB.PublicationPlaceCollection();
      this.staff = new DiBB.StaffMemberCollection();
      this.citations = new DiBB.CitationCollection(null, {biblioID: this.id});
    }

  },

  validate: function (attributes, options) {

    var errors = {};

    if (attributes.year && !this.validYear.exec(attributes.year)) {
      {
        errors.year = "Year of Publication must be a four digit year.";
      }
    }

    if (attributes.pub_number && attributes.pub_number.length > 0 && !attributes.pub_number_type) {
      {
        errors.pub_number_type = "Must specify a publication number type (either ISSN or ISBN)";
      }
    }

    if (attributes.pub_number && attributes.pub_number.length > 0 && !this.validPublicationNumber()) {
      {
        errors.pub_number = "Pubication number must be 8 digits for ISSN, or 10 or 13 digits for ISBN.";
      }
    }

    if (_.isEmpty(errors))
      return null;

    return errors;

  }

});

DiBB.BiblioCollection = Backbone.Collection.extend({

  model: DiBB.Biblio,
  urlTemplate: _.template("biblio_sets/<%= biblioSetID %>/biblios"),

  initialize: function (models, options) {
    if (options) {
      this.biblioSetID = options.biblioSetID;
    }
  },

  url: function () {
    return (this.biblioSetID) ? this.urlTemplate({biblioSetID: this.biblioSetID}) : "/noop.js";
  }

}); 