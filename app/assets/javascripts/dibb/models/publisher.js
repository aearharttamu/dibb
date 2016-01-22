/*global DiBB, Backbone */
DiBB.Publisher = Backbone.Model.extend({});

DiBB.PublisherCollection = Backbone.Collection.extend({

  model: DiBB.Publisher,
  url: "/publishers",
          
  initialize: function( models, options ) {
  },
            
}); 