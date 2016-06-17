DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/biblio-form-view'],
    
  id: 'biblio-form-view',
  className: 'biblio-form',
    
  pageTitle: {
    "new": "New Bibliography",
    "edit": "Edit Bibliography"
  },
  
  events: {
    "click .bib-tab": "onSwitchTab"
  },
    	
	initialize: function(options) {
        
    this.biblios = options.biblios;
    this.embedded = options.embed;
    this.activeTab = 'primary-tab';
      
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
  
  onSwitchTab: function( e ) {
    var tabID = $(e.currentTarget).attr('data-tab-id');

    // if save succeeds, switch tabs
    this.saveForm( _.bind( function() {
      this.$('#'+this.activeTab).detach();
      this.activeTab = tabID;
      this.render();
    }, this));

  },
  
  saveForm: function( saveCallback ) {
    this.tab.save(saveCallback);    
  },
      
  render: function() {      
        
    this.$el.html(this.template( { 
      embedded: true, 
      activeTab: this.activeTab
    }));
  
    // construct selected tab
    if( this.activeTab == 'primary-tab' ) {
      this.tab = new DiBB.PrimaryTab({ model: this.biblio, collection: this.biblios });
    } else if( this.activeTab == 'reference-tab' ) {
      this.tab = new DiBB.ReferenceTab({ model: this.biblio, collection: this.biblios });      
    } else if( this.activeTab == 'physical-tab' ) {
      this.tab = new DiBB.PhysicalTab({ model: this.biblio, collection: this.biblios });
    } else if( this.activeTab == 'editorial-tab' ) {
      this.tab = new DiBB.EditorialTab({ model: this.biblio, collection: this.biblios });
    } else if( this.activeTab == 'citations-tab' ) {
      this.tab = new DiBB.CitationsTab({ model: this.biblio, collection: this.biblios });
    }
    
    this.tab.render();
    this.$("#"+this.tab.id).replaceWith(this.tab.$el);
  
  }
  
});