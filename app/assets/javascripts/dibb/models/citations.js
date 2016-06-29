DiBB.Citation = Backbone.Model.extend({
  
  urlRoot: "citations",
  
  initialize: function( attributes ) {  
    // if are editing, there should be pre-fetch sequence
    if( attributes.sequence_json ) {
      this.sequences = new DiBB.PageNumSequenceCollection( JSON.parse(attributes.sequence_json) );
    }     
  }
  
});

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