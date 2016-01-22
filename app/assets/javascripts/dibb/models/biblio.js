
DiBB.Biblio = Backbone.Model.extend({
  
  validate: function(attributes, options) {
    
    var year = attributes.year.toString();
    
    if( year.length != 4 ) {
      return "Year of Publication must be a four digit year.";
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