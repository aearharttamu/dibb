DiBB.Citation = Backbone.Model.extend({});

DiBB.CitationCollection = Backbone.Collection.extend({
  model: DiBB.Citation,
  urlTemplate: _.template("biblios/<%= biblioID %>/citations"),
          
  initialize: function( models, options ) {
    this.biblioID = options.biblioID;    
  },
    
  url: function() {
    return this.urlTemplate({ biblioID: this.biblioID });
  }
                                
}); 