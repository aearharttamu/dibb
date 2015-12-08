DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form-view'],
  
  id: 'biblio-form-view',
  className: 'biblio-form',
  
  pageTitle: {
    "new": "New Bibliography",
    "edit": "Edit Bibliography"
  },
  
  events: {
    'click .save-button' : 'onSave',
    'click .cancel-button' : 'onCancel'
	},
	
	initialize: function(options) {
    this.biblios = options.biblios;
    
    if( options.biblioID ) {
      this.biblio = this.biblios.get(parseInt(options.biblioID));
      this.mode = "edit";
    } else {
      this.biblio = new DiBB.Biblio();
      this.mode = "new";
    }    
    
  },
  
  onSave: function(e) {
  
    var onSuccess = function(model, response, options) {
      DiBB.Routes.routes.navigate("/", {trigger: true});    
    };
    
    var onError = function(model, response, options) {
      // TODO show error messages, stay on this page.   
      alert(response);  
    };
    
    this.biblio.set( {
      title: this.$('#bib-title').val(),
      genre: this.$('#bib-genre').val(),
      date: this.$('#bib-date').val(),
      provenance: this.$('#bib-provenance').val(),
      pubnumber: this.$('#bib-pubnumber').val()
    });
    
    this.biblios.add(this.biblio);    
    this.biblio.save(null, { success: onSuccess, error: onError });
  },
  
  onCancel: function() {
    if( this.mode == 'new') {
      this.biblios.remove(this.biblio);
    }
    DiBB.Routes.routes.navigate("/", {trigger: true});
  },
  
  render: function() {
    
    var pageTitle = this.pageTitle[this.mode];
    
   this.$el.html(this.template( { pageTitle: pageTitle, biblio: this.biblio.toJSON() })); 
   $(".dibb-app").html(this.$el);
   
  }
  
});