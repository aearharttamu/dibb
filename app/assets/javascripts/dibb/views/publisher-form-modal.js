
DiBB.PublisherFormModal = Backbone.View.extend({

	template: JST['dibb/templates/publisher-form-modal'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
  
  id: 'publisher-form-modal-view',
  className: 'publisher-form-modal-view',
    	
	initialize: function(options) {

    _.bindAll( this, "onValidationError", "onSave", "onClose", "onUnlink" );
        
    this.model.on("invalid", this.onValidationError );
    
   },
  
  onSave: function(e) {
    this.validationErrors = null;
    this.save(this.onClose);
  },
    
  onClose: function() {
    // TODO close the modal
  },
  
  onUnlink: function() {
    // TODO unlink this record 
  },
  
  open: function() {
    this.$('#publisher-form-modal').modal();
  },
    
  save: function( onSuccessCallback ) {   
         
    this.model.set( {
      name: this.$('#name').val() 
    });
    
    var onSuccess = _.bind( function(model, response, options) {
      this.validationErrors = null;
      onSuccessCallback(model, response, options);
    }, this);

    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError });
  
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
    
  render: function() {    
    
    this.$el.html(this.template( { 
      publisher: this.model.toJSON(),
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }));
    
    this.$(".pub-unlink-button").click( this.onUnlink );
    this.$(".pub-save-button").click( this.onSave );
    this.$(".pub-cancel-button").click( this.onClose );
        
  }
  
});