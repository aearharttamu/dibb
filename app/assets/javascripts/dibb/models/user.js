DiBB.User = Backbone.Model.extend({

  urlTemplate: _.template("/admin/<%= id %>"),
  
  validate: function(attributes, options) {
        
    if( attributes.email == null || attributes.email.length == 0 ) {
      return { email: "Email cannot be blank." };
    }    
  },
  
  url: function() {
    return this.urlTemplate({ id: this.id });
  }
  
});

DiBB.UserCollection = Backbone.Collection.extend({

  model: DiBB.User,
  url: "/admin",
          
  initialize: function( models, options ) {
  }
          
}); 