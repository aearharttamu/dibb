/*global DiBB, Backbone */
DiBB.Publisher = Backbone.Model.extend({

  urlTemplate: _.template("/publishers/<%= id %>"),
  
  validate: function(attributes, options) {
        
    if( attributes.name == null || attributes.name.length == 0 ) {
      return { name: "Publisher Name cannot be blank." };
    }    
  },
  
  url: function() {
    return this.urlTemplate({ id: this.id });
  }
  
});

DiBB.PublisherCollection = Backbone.Collection.extend({

  model: DiBB.Publisher,
  url: "/publishers",
          
  initialize: function( models, options ) {
  },
  
  names: function() {
    return _.map( this.models, function( publisher ) {
      var name = publisher.get('name');
      return { label: name, value: name, id: publisher.id };      
    });
  }
          
}); 