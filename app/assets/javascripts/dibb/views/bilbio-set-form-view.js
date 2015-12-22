/*global DiBB, Backbone, JST */

DiBB.BiblioSetFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-set-form-view'],
	partials: {
		stringInput: JST['dibb/templates/string-input'],
		dropdownInput: JST['dibb/templates/dropdown-input'],
		singleItem: JST['dibb/templates/biblio-form-single-item'],
		serialList: JST['dibb/templates/biblio-form-serial-list'],
		volumeList: JST['dibb/templates/biblio-form-volume-list'],
		citationsTab: JST['dibb/templates/biblio-form-citations-tab'],
		editorialTab: JST['dibb/templates/biblio-form-editorial-tab'],
		physicalTab: JST['dibb/templates/biblio-form-physical-tab'],
		primaryTab: JST['dibb/templates/biblio-form-primary-tab'],
		referenceTab: JST['dibb/templates/biblio-form-reference-tab']
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
    this.biblio_sets = options.biblio_sets;
    
    if( options.biblioSetID ) {
      this.biblio_set = this.biblio_sets.get(parseInt(options.biblioSetID));
      this.mode = "edit";
    } else {
      this.biblio_set = new DiBB.BiblioSet();
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
    
    this.biblio_set.set( {
      title: this.$('#bib-title').val(),
      genre: this.$('#bib-genre').val()
    });
    
    this.biblio_sets.add(this.biblio_set);
    this.biblio_set.save(null, { success: onSuccess, error: onError });
  },
  
  onCancel: function() {
    if( this.mode === 'new') {
      this.biblio_sets.remove(this.biblio_set);
    }
    DiBB.Routes.routes.navigate("/", {trigger: true});
  },
  
  render: function() {
    
    var pageTitle = this.pageTitle[this.mode];
    
   this.$el.html(this.template( { pageTitle: pageTitle, biblio_set: this.biblio_set.toJSON(), partials: this.partials }));
   $(".dibb-app").html(this.$el);
   
  }
  
});