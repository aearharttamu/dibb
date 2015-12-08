DiBB.BiblioFormView = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form-view'],
  
  id: 'biblio-form-view',
  className: 'biblio-form',
  
  events: {
    'click .save-button' : 'onSave'
	},
	
	initialize: function(options) {
    // TODO can either edit and existing record or create a new one
    this.biblios = options.biblios;
    this.render();
  },
  
  onSave: function(e) {
    
    var title = this.$('#bib-title').val();
    var genre = this.$('#bib-genre').val();
    var date = this.$('#bib-date').val();
    var provenance = this.$('#bib-provenance').val();
    var pubnumber = this.$('#bib-pubnumber').val();
    
    var biblio = new DiBB.Biblio( { title: title, genre: genre, date: date, provenance: provenance, pubnumber: pubnumber });
    this.biblios.add(biblio);
    biblio.save();
  },
  
  render: function() {
    
   this.$el.html(this.template( { pageTitle: "New Bibliography"})); 
   $(".dibb-app").html(this.$el);
   
  }
  
});