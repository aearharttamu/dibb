/*global DiBB, Backbone, JST */

DiBB.BiblioSetFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-set-form/biblio-set-form-view'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		dropdownInput: JST['dibb/templates/common/dropdown-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']
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
    
    _.bindAll( this, "save" );
        
    if( options.model ) {
      this.mode = "edit";
    } else {
      this.model = new DiBB.BiblioSet();
      this.mode = "new";
    }        
  },
  
  onSave: function(e) {
          
    // after everything saves successfully, navigate out 
    var onSuccess = function(model, response, options) {
      DiBB.Routes.routes.navigate("/", {trigger: true});    
    };
    
    this.save( onSuccess );    
  },
  
  onCancel: function() {
    DiBB.Routes.routes.navigate("/", {trigger: true});
  },
  
  save: function( onSuccess ) {   
    this.model.set( {
      title: this.$('#bib-title').val(),
      genre: this.$('#bib-genre').val(),
      other_genre: this.$('#bib-other-genre').val()
    });
    
    this.model.save(null, { success: _.bind( function() {
      // always insure biblio is linked to this set
      this.biblioFormView.model.set( { biblio_set_id: this.model.id } );
      this.biblioFormView.saveForm(onSuccess);
    }, this), error: DiBB.Routes.onError });
    
  },
  
  render: function() {    
    
    // render the page without the biblio panel content
    var pageTitle = this.pageTitle[this.mode];
    this.$el.html(this.template( { 
      pageTitle: pageTitle, 
      biblioSet: this.model.toJSON(), 
      partials: this.partials,
      validationErrors: {} 
    }));
    
    // genre determines view layout    
    var genre = DiBB.Genres.getGenre( this.model.get('genre') );
    
    if( genre.list ) {      
      if( this.mode == 'new' ) {
        var biblios = new DiBB.BiblioCollection();
        // TODO init list view         
        $(".dibb-app").html(this.$el);      
      } else {
        // retrieve biblios for this set and display them
        var biblios = new DiBB.BiblioCollection(null, { biblioSetID: this.biblioSet.id });      
        biblios.fetch( { success: _.bind( function(biblios) {   
          // TODO init list view         
          $(".dibb-app").html(this.$el);      
        }, this), error: DiBB.Routes.onError } );
      }
    } else {
      if( this.mode == 'new') {
        this.biblioFormView = new DiBB.BiblioFormView( { biblioSetSave: this.save });             
      } else {
        // use pre-fetched biblio 
        var biblio = new DiBB.Biblio( this.model.get("biblio") );
        this.biblioFormView = new DiBB.BiblioFormView( { biblioSetSave: this.save, model: biblio } );
      }
      this.biblioFormView.render();
      this.$(".biblio-panel").html(this.biblioFormView.$el);      
      $(".dibb-app").html(this.$el);      
    }
  }
  
});