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
    
    this.publicationPlace.set( 'city', this.$('#city').val() );
    this.publicationPlace.set( 'state', this.$('#state').val() );
    this.publicationPlace.set( 'country', this.$('#country').val() );
    
    // TODO validation publication place
    
    this.collection.add(this.publicationPlace);
    this.closePublicationPlaceForm();
    this.render();
  },
  
  onCancel: function() {
    this.closePublicationPlaceForm();    
    this.render();
  },
  
  openPublicationPlaceForm: function( mode ) {
    
    var placeForm = this.partials.publicationPlaceForm( 
      { publicationPlace: this.publicationPlace, partials: this.partials }); 
    
    if( mode == "edit") {
      // replace the existing row with the form
      this.$("#place-"+this.publicationPlace.cid).replaceWith(placeForm);      
    } else {
      // must be adding a new one
      this.$('#publication-places-tbody').append(placeForm);
    }
    
    this.$(".save-place-button").click( this.onSave );
    this.$(".cancel-place-button").click( this.onCancel );    

    // can't add another while this is open
    this.$(".add-publication-place-button").attr("disabled", true);
  },
  
  closePublicationPlaceForm: function() {
    this.$('.edit-place-form').detach();
    this.$(".add-publication-place-button").attr("disabled", false);  
  },
  
  onAddPublicationPlace: function() {
    this.publicationPlace = new DiBB.PublicationPlace();
    this.openPublicationPlaceForm("add");    
  },
  
  onEditPublicationPlace: function(e) {
    var placeID = $(e.currentTarget).attr('data-place-cid');
    this.publicationPlace = this.collection.get(placeID);
    this.openPublicationPlaceForm("edit");    
  },
  
  onDeletePublicationPlace: function(e) {
    var placeID = $(e.currentTarget).attr('data-place-cid');
    var place = this.collection.get(placeID);
    this.collection.remove(place);
    this.render();
  },
        
  render: function() {      
    this.$el.html( this.template( { publicationPlaces: this.collection.models } ) );
  }
  
});