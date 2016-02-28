
DiBB.TitleFormModal = Backbone.View.extend({

	template: JST['dibb/templates/title-form/title-form-modal'],
    
  id: 'title-form-modal-view',
  className: 'title-form-modal-view',
  
  events: {
    "click .title-unlink-button": "onUnlink",
    "click .title-save-button": "onSave",
    "click .title-cancel-button": "onCancel"
  },
    
	initialize: function(options) {
    _.bindAll( this, "close");
    this.onCloseCallback = options.onClose;  
   },
  
  onSave: function(e) {
    this.validationErrors = null;
    this.titleFormPanel.save(this.close);
  },
  
  onCancel: function() {
    this.close();
  },
      
  onUnlink: function() {
    this.$('#title-form-modal').modal('hide');
    this.onCloseCallback( "", null);
  },
  
  open: function() {
    this.$('#title-form-modal').modal( { keyboard: false });
  },
  
  close: function() {
    var modalDialog = this.$('#title-form-modal');

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
    this.titleFormPanel = new DiBB.TitleFormPanel( { model: this.model, embedded: true });
    this.titleFormPanel.render();    
    this.$("#"+this.titleFormPanel.id).replaceWith(this.titleFormPanel.$el);
  }
  
});