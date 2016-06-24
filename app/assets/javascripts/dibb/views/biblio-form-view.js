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
        
    this.activeTab = 'primary-tab';
      
    this.biblioSetSave = options.biblioSetSave;
      
    if( options.model ) {
      this.mode = "edit";
    } else {
      this.model = new DiBB.Biblio();
      this.mode = "new";
    }
                  
  },
  
  onSwitchTab: function( e ) {
    var tabID = $(e.currentTarget).attr('data-tab-id');
    
    // if save succeeds, switch tabs
    this.biblioSetSave( _.bind( function() {
      this.$('#'+this.activeTab).detach();
      this.activeTab = tabID;
      this.render();
    }, this));

  },
  
  saveForm: function( saveCallback ) {

    // hack: make sure these list stay in sync with JSON being sent to server
    this.model.set( {
      publication_places_json: this.model.publicationPlaces.toJSON(),
      staff_json: this.model.staff.toJSON(),
      sequence_json: this.model.sequences.toJSON()
    });
    
    this.tab.save(saveCallback);    
  },
      
  render: function() {      
        
    this.$el.html(this.template( { 
      activeTab: this.activeTab,
      citationsEnabled: (this.model.id != null)
    }));
  
    // construct selected tab
    if( this.activeTab == 'primary-tab' ) {
      this.tab = new DiBB.PrimaryTab({ model: this.model });
    } else if( this.activeTab == 'reference-tab' ) {
      this.tab = new DiBB.ReferenceTab({ model: this.model });      
    } else if( this.activeTab == 'physical-tab' ) {
      this.tab = new DiBB.PhysicalTab({ model: this.model });
    } else if( this.activeTab == 'editorial-tab' ) {
      this.tab = new DiBB.EditorialTab({ model: this.model });
    } else if( this.activeTab == 'citations-tab' ) {
      this.tab = new DiBB.CitationsTab({ model: this.model });
    }
    
    this.tab.render();
    this.$("#"+this.tab.id).replaceWith(this.tab.$el);
  
  }
  
});