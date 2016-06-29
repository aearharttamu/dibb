DiBB.PageNumSequence = Backbone.Model.extend({
  urlRoot: "page_num_sequences"
});

DiBB.PageNumSequenceCollection = Backbone.Collection.extend({
  model: DiBB.PageNumSequence,
  urlTemplate: _.template("biblios/<%= biblioID %>/page_num_sequences"),
  sequenceItemTemplate: _.template("<%= first_page_number_as_appears %>...<%= final_page_number_as_appears %>"),
          
  initialize: function( models, options ) {
    if( options ) {
      this.biblioID = options.biblioID;
    }
  },
   
  sequenceList: function() {
    var sequenceObjs = this.toJSON();
    return _.map( sequenceObjs, _.bind( function( sequence ) {
      return { text: this.sequenceItemTemplate(sequence), value: sequence.id };
    }, this));    
  },
    
  url: function() {
    return this.urlTemplate({ biblioID: this.biblioID });
  }
});