
DiBB.PublisherFormModal = Backbone.View.extend({

	template: JST['dibb/templates/publisher-form-modal'],
  
	partials: {
    publisherFormPanel: JST['dibb/templates/publisher-form-modal/publisher-form-panel'],
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
  
  id: 'publisher-form-modal-view',
  className: 'publisher-form-modal-view',
    	
	initialize: function(options) {

    _.bindAll( this, "onValidationError", "onSave", "onCancel", "onUnlink", "close" );
        
    this.model.on("invalid", this.onValidationError );
    this.onCloseCallback = options.onClose;
    
   },
  
  onSave: function(e) {
    this.validationErrors = null;
    this.save(this.close);
  },
  
  onCancel: function() {
    this.close();
  },
      
  onUnlink: function() {
    this.$('#publisher-form-modal').modal('hide');
    this.onCloseCallback( "", null);
  },
  
  open: function() {
    this.$('#publisher-form-modal').modal( { keyboard: false });
  },
  
  close: function() {
    var modalDialog = this.$('#publisher-form-modal');

    modalDialog.on('hidden.bs.modal', _.bind( function (e) {
      this.$el.detach();
    }, this) ); 
    
    modalDialog.modal('hide');

    // only update the parent form if values are valid and saved
    if( this.validationErrors == null ) {
      this.onCloseCallback( this.model.get("name"), this.model.id );   
    }
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
    this.renderForm();
  },
  
  renderForm: function() {    
    this.$(".publisher-form-panel").html( this.partials.publisherFormPanel( { 
      publisher: this.model.toJSON(),
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }));    
  },
    
  render: function() {    
    this.$el.html( this.template() );
    this.renderForm();
    this.$(".pub-unlink-button").click( this.onUnlink );
    this.$(".pub-save-button").click( this.onSave );
    this.$(".pub-cancel-button").click( this.onCancel );
        
  }
  
});