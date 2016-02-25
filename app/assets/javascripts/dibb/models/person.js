DiBB.Person = Backbone.Model.extend({

  urlTemplate: _.template("/people/<%= id %>"),
  
  validate: function(attributes, options) {
        
    if( attributes.full_name == null || attributes.full_name.length == 0 ) {
      return { full_name: "Person's full name cannot be blank." };
    }    
  },
  
  url: function() {
    return this.urlTemplate({ id: this.id });
  }
  
});

DiBB.PersonCollection = Backbone.Collection.extend({

  model: DiBB.Person,
  url: "/people",
          
  initialize: function( models, options ) {
  },
  
  names: function() {
    return _.map( this.models, function( person ) {
      var name = person.get('full_name');
      return { label: name, value: name, id: person.id };      
    });
  }
          
}); 