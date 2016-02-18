DiBB.Citation = Backbone.Model.extend({
  
  urlTemplate: _.template("biblios/<%= biblioID %>/citations"),
    
  initialize: function( model, options ) {
    if( options ) {
      this.biblioID = options.biblioID;    
    }
  },

  url: function() {
    return this.urlTemplate({ id: this.id });
  }
  
});

DiBB.CitationCollection = Backbone.Collection.extend({
  model: DiBB.Citation,
  urlTemplate: _.template("biblios/<%= biblioID %>/citations"),
          
  initialize: function( options ) {
    if( options ) {
      this.biblioID = options.biblioID;    
    }
  },
    
  url: function() {
    return (this.biblioID) ? this.urlTemplate({ biblioID: this.biblioID }) :  "/noop.js";
  }
                                
}); 