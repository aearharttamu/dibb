
DiBB.PublisherFormModal = Backbone.View.extend({

	template: JST['dibb/templates/publisher-form-modal'],
  
	partials: {
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
    this.onCloseCallback( this.model.get("name"), this.model.id );   
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
    this.$(".pub-cancel-button").click( this.onCancel );
        
  }
  
});