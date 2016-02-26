
DiBB.PersonFormModal = Backbone.View.extend({

	template: JST['dibb/templates/person-form/person-form-modal'],
    
  id: 'person-form-modal-view',
  className: 'person-form-modal-view',
  
  events: {
    "click .person-unlink-button": "onUnlink",
    "click .person-save-button": "onSave",
    "click .person-cancel-button": "onCancel"
  },
    
	initialize: function(options) {
    _.bindAll( this, "close");
    this.onCloseCallback = options.onClose;  
   },
  
  onSave: function(e) {
    this.validationErrors = null;
    this.personFormPanel.save(this.close);
  },
  
  onCancel: function() {
    this.close();
  },
      
  onUnlink: function() {
    this.$('#person-form-modal').modal('hide');
    this.onCloseCallback( "", null);
  },
  
  open: function() {
    this.$('#person-form-modal').modal( { keyboard: false });
  },
  
  close: function() {
    var modalDialog = this.$('#person-form-modal');

    modalDialog.on('hidden.bs.modal', _.bind( function (e) {
      this.$el.detach();
    }, this) ); 
    
    modalDialog.modal('hide');

    // only update the parent form if values are valid and saved
    if( this.validationErrors == null ) {
      this.onCloseCallback( this.model.get("full_name"), this.model.id );   
    }
  },
    
  render: function() {    
    this.$el.html( this.template() );
    
    // render panel with form    
    this.personFormPanel = new DiBB.PersonFormPanel( { model: this.model });
    this.personFormPanel.render();    
    this.$("#"+this.personFormPanel.id).replaceWith(this.personFormPanel.$el);
  }
  
});