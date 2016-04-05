DiBB.Citation = Backbone.Model.extend({});

DiBB.CitationCollection = Backbone.Collection.extend({
  model: DiBB.Citation,
  urlTemplate: _.template("biblios/<%= biblioID %>/citations"),
          
  initialize: function( models, options ) {
    this.biblioID = options.biblioID;

    if( models ) {
      var pageSequenceJSON = models.sequence_json;
      var sequenceObj = ( pageSequenceJSON ) ? JSON.parse(pageSequenceJSON) : null;

      this.sequence = new DiBB.PageNumSequenceCollection( sequenceObj );
    } else {
      this.sequence = new DiBB.PageNumSequenceCollection();
    }

  },
    
  url: function() {
    return this.urlTemplate({ biblioID: this.biblioID });
  }
                                
}); 