DiBB.Title = Backbone.Model.extend({

  urlTemplate: _.template("/titles/<%= id %>"),
  
  initialize: function(attributes, options) {
    
    if( attributes ) {
      var staffJSON = attributes.staff_json;
      var staffObj = ( staffJSON ) ? JSON.parse(staffJSON) : null;
      this.staff = new DiBB.StaffMemberCollection( staffObj );
    }
    
  },
  
  validate: function(attributes, options) {
        
    if( attributes.name == null || attributes.name.length == 0 ) {
      return { name: "Title cannot be blank." };
    }    
  },
  
  url: function() {
    return this.urlTemplate({ id: this.id });
  }
  
});

DiBB.TitleCollection = Backbone.Collection.extend({

  model: DiBB.Title,
  url: "/titles",
          
  initialize: function( models, options ) {
  },
  
  names: function() {
    return _.map( this.models, function( title ) {
      var name = title.get('name');
      return { label: name, value: name, id: title.id };      
    });
  }
          
}); 