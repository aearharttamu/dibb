DiBB.Role = Backbone.Model.extend({

  urlTemplate: _.template("/roles/<%= id %>"),
  
  validate: function(attributes, options) {
        
    if( attributes.name == null || attributes.name.length == 0 ) {
      return { year: "Role name cannot be blank." };
    }    
  },
  
  url: function() {
    return this.urlTemplate({ id: this.id });
  }
  
});

DiBB.RoleCollection = Backbone.Collection.extend({

  model: DiBB.Role,
  url: "/roles",
          
  initialize: function( models, options ) {
  },
  
  names: function() {
    return _.map( this.models, function( role ) {
      var name = role.get('name');
      return { label: name, value: role.id };      
    });
  }
          
}); 