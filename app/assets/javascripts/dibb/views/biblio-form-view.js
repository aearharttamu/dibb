DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/biblio-form-view'],
    
  id: 'biblio-form-view',
  className: 'biblio-form',
    
  pageTitle: {
    "new": "New Bibliography",
    "edit": "Edit Bibliography"
  },
    	
	initialize: function(options) {
        
    this.biblios = options.biblios;
    this.embedded = options.embed;
      
    if( options.biblioID ) {
      this.biblio = this.biblios.get(parseInt(options.biblioID));
      this.mode = "edit";
    } else {
      this.biblio = new DiBB.Biblio();
      this.mode = "new";
    }    
                
    if( !this.embedded ) {
      // TODO set up click handlers for save and cancel
    }
    
  },
  
  saveForm: function( saveCallback ) {
    this.currentTab.save(saveCallback);    
  },
      
  render: function() {      
        
    this.$el.html(this.template( { 
      embedded: true
    }));
  
    // render current tab
    this.currentTab = new DiBB.PrimaryTab({ model: this.biblio, collection: this.biblios });
    this.currentTab.render();
    this.$("#"+this.currentTab.id).replaceWith(this.currentTab.$el);
  
  }
  
});