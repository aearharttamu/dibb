/*global DiBB, Backbone, JST */

DiBB.PublicationPlacesPanel = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/publication-places'],
  
	partials: {
		stringInputCell: JST['dibb/templates/common/string-input-cell'],
		publicationPlaceForm: JST['dibb/templates/biblio-form/publication-place-form']
	},
  
  id: 'publication-places',
  
  events: {
    "click .add-publication-place-button": "onAddPublicationPlace",
    "click .edit-publication-place-button": "onEditPublicationPlace",
    "click .delete-publication-place-button": "onDeletePublicationPlace"    
  },
    
  openPublicationPlaceForm: function( publicationPlace ) {
    
    var placeForm = this.partials.publicationPlaceForm( { publicationPlace: publicationPlace, partials: this.partials }); 
    
    // TODO if existing id, replace otherwise add to end
    this.$('#publication-places-tbody').append(placeForm);
    
    this.$(".save-place-button").click( _.bind( function() { 
      // TODO save and render publication table
      
      this.closePublicationPlaceForm();
    }, this));

    this.$(".cancel-place-button").click( _.bind( function() { 
      this.closePublicationPlaceForm();
    }, this));    
    
  },
  
  closePublicationPlaceForm: function() {
    this.$('.edit-place-form').detach();
    this.$(".add-publication-place-button").attr("disabled", false);  
  },
  
  onAddPublicationPlace: function() {
    var publicationPlace = new DiBB.PublicationPlace({ biblioID: this.collection.biblioID });
    this.openPublicationPlaceForm(publicationPlace);    
    this.$(".add-publication-place-button").attr("disabled", true);
  },
  
  onEditPublicationPlace: function() {
    // TODO
    // var publicationPlace = new DiBB.PublicationPlace({ biblioID: this.biblio.id });
    // this.editPublicationPlace(publicationPlace);
    // this.$(".add-publication-place-button").attr("disabled", true);
  },
  
  onDeletePublicationPlace: function() {
    // TODO
  },
    
  renderPublicationTable: function() {
    // TODO
  },
    
  render: function() {      
    this.$el.html( this.template( { publicationPlaces: this.collection.toJSON() } ) );
  }
  
});