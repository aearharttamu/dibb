/*global DiBB, Backbone, JST */

DiBB.BiblioSetFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-set-form-view'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		dropdownInput: JST['dibb/templates/common/dropdown-input']
	},
  
  id: 'biblio-set-form-view',
  className: 'biblio-set-form',
  
  pageTitle: {
    "new": "New Bibliography",
    "edit": "Edit Bibliography"
  },
  
  events: {
    'click .save-button' : 'onSave',
    'click .cancel-button' : 'onCancel'
	},
	
	initialize: function(options) {
    this.biblioSets = options.biblioSets;
    
    if( options.biblioSetID ) {
      this.biblioSet = this.biblioSets.get(parseInt(options.biblioSetID));
      this.mode = "edit";
    } else {
      this.biblioSet = new DiBB.BiblioSet();
      this.mode = "new";
    }        
  },
  
  onSave: function(e) {
          
    this.biblioSet.set( {
      title: this.$('#bib-title').val(),
      genre: this.$('#bib-genre').val(),
      other_genre: this.$('#bib-other-genre').val()
    });
    
    // after everything saves successfully, navigate out 
    var onSuccess = function(model, response, options) {
      DiBB.Routes.routes.navigate("/", {trigger: true});    
    };
    
    this.biblioSets.add(this.biblioSet);
    this.biblioSet.save(null, { success: _.bind( function() {
      this.biblioFormView.biblio.set( { biblio_set_id: this.biblioSet.id } );
      this.biblioFormView.saveForm(onSuccess);    
    }, this), error: DiBB.Routes.onError });
    
  },
  
  onCancel: function() {
    DiBB.Routes.routes.navigate("/", {trigger: true});
  },
  
  render: function() {    
    
    // render the page without the biblio panel content
    var pageTitle = this.pageTitle[this.mode];
    this.$el.html(this.template( { pageTitle: pageTitle, biblioSet: this.biblioSet.toJSON(), partials: this.partials }));
    $(".dibb-app").html(this.$el);
    
    var biblios = new DiBB.BiblioCollection(null, { biblioSetID: this.biblioSet.id });
    
    // retrieve bilbios for this set and display them
    biblios.fetch( { success: _.bind( function(biblios) {
      
      // TODO this is where we switch based on genre type between different subviews
      
      var biblio = biblios.at(0);
      var firstID = biblio ? biblio.id : null;
      this.biblioFormView = new DiBB.BiblioFormView( { biblios: biblios, biblioID: firstID, embed: true } );
      this.biblioFormView.render();
            
      this.$(".biblio-panel").html(this.biblioFormView.$el);
      
    }, this), error: DiBB.Routes.onError } );
                        
  }
  
});