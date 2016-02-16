/*global DiBB, Backbone, JST */

DiBB.PublicationPlacesPanel = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/publication-places-panel'],
  
	partials: {
		stringInputCell: JST['dibb/templates/common/string-input-cell'],
		publicationPlaceForm: JST['dibb/templates/biblio-form/publication-place-form']
	},
  
  id: 'publication-places-panel',
  
  events: {
    "click .add-publication-place-button": "onAddPublicationPlace",
    "click .edit-publication-place-button": "onEditPublicationPlace",
    "click .delete-publication-place-button": "onDeletePublicationPlace"    
  },
  
  initialize: function() {
    _.bindAll( this, "onSave", "onCancel" );
  },
  
  onSave: function() {
    
    var city = this.$('#city').val();
    var state = this.$('#state').val();
    var country = this.$('#country').val();

    var publicationPlace = new DiBB.PublicationPlace( { city: city, 
                                                        state: state, 
                                                        country: country } );
    this.collection.add(publicationPlace);
    this.closePublicationPlaceForm();
    this.render();
  },
  
  onCancel: function() {
    this.closePublicationPlaceForm();    
  },
  
  openPublicationPlaceForm: function( publicationPlace ) {
    
    var placeForm = this.partials.publicationPlaceForm( { publicationPlace: publicationPlace, 
                                                          partials: this.partials }); 
    
    // TODO if existing id, replace otherwise add to end
    this.$('#publication-places-tbody').append(placeForm);

    this.$(".save-place-button").click( this.onSave );
    this.$(".cancel-place-button").click( this.onCancel );    
  },
  
  closePublicationPlaceForm: function() {
    this.$('.edit-place-form').detach();
    this.$(".add-publication-place-button").attr("disabled", false);  
  },
  
  onAddPublicationPlace: function() {
    var publicationPlace = new DiBB.PublicationPlace();
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