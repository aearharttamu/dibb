DiBB.BiblioListView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-list-view'],
  
  id: 'biblio-list-view',
  className: 'biblio-list',
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {
    _.bindAll(this, "render");

    // TODO improve error handling
    var errorHandler = function( collection, response, options ) {
      alert(response);
    };
    
    this.biblios = new DiBB.BiblioCollection();
    this.biblios.fetch( { success: this.render, error: errorHandler } );

  },
  
  onDelete: function(event) {
    alert("delete item");    
  },
  
  render: function() {
    this.$el.html(this.template( { biblios: this.biblios.toJSON() } ));
    this.$('#biblio-table').DataTable();    
    $(".dibb-app").html(this.$el);
  }
  
});