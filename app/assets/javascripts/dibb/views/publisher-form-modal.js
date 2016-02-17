
DiBB.PublisherFormModal = Backbone.View.extend({

	template: JST['dibb/templates/publisher-form/publisher-form-modal'],
    
  id: 'publisher-form-modal-view',
  className: 'publisher-form-modal-view',
  
  events: {
    "click .pub-unlink-button": "onUnlink",
    "click .pub-save-button": "onSave",
    "click .pub-cancel-button": "onCancel"
  },
    
	initialize: function(options) {
    _.bindAll( this, "close");
    this.onCloseCallback = options.onClose;  
   },
  
  onSave: function(e) {
    this.validationErrors = null;
    this.publisherFormPanel.save(this.close);
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
    
  render: function() {    
    this.$el.html( this.template() );
    
    // render panel with form    
    this.publisherFormPanel = new DiBB.PublisherFormPanel( { model: this.model });
    this.publisherFormPanel.render();    
    this.$("#"+this.publisherFormPanel.id).replaceWith(this.publisherFormPanel.$el);
  }
  
});