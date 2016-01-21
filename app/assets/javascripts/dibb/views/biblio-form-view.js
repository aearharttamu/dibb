/*global DiBB, Backbone, JST */

DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form-view'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		textAreaInput: JST['dibb/templates/common/textarea-input'],
		dropdownInput: JST['dibb/templates/common/dropdown-input'],
		citationsTab: JST['dibb/templates/biblio-form/citations-tab'],
		editorialTab: JST['dibb/templates/biblio-form/editorial-tab'],
		physicalTab: JST['dibb/templates/biblio-form/physical-tab'],
		primaryTab: JST['dibb/templates/biblio-form/primary-tab'],
		referenceTab: JST['dibb/templates/biblio-form/reference-tab']
	},
  
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
  
  saveForm: function( onSuccess ) {   
         
    this.biblio.set( {
      title: this.$('#title').val(),
      descriptors: this.$('#descriptors').val(),
      date_as_appears: this.$('#date_as_appears').val()  
    });

    this.biblios.biblioSetID = this.biblio.get("biblio_set_id");
    this.biblios.add(this.biblio);
    this.biblio.save(null, { success: onSuccess, error: DiBB.Routes.onError });
  },
    
  render: function() {    
    
    this.$el.html(this.template( { embedded: true, biblio: this.biblio.toJSON(), partials: this.partials }));
    
  }
  
});