/*global DiBB, Backbone, JST */

DiBB.PublisherFormView = Backbone.View.extend({

	template: JST['dibb/templates/publisher-form/publisher-form-view'],
  
  id: 'publisher-form-view',
  className: 'dibb-form-view',
  
  pageTitle: {
    "new": "New Publisher",
    "edit": "Edit Publisher"
  },
  
  events: {
    "click .save-button": "onSave",
    "click .cancel-button": "onCancel"
  },
    	
	initialize: function(options) {
    
    this.publishers = options.publishers;            
    
    if( options.publisherID ) {
      this.model = this.publishers.get(parseInt(options.publisherID));
      this.mode = "edit";
    } else {
      this.model = new DiBB.Publisher();
      this.mode = "new";
    }    
        
   },
  
  onSave: function(e) {
    this.publisherFormPanel.save(this.onCancel);
  },
  
  onCancel: function() {
    DiBB.Routes.routes.navigate("publishers", {trigger: true});
  },
    
  render: function() {    
    var pageTitle = this.pageTitle[this.mode];
    
    this.$el.html(this.template( { 
      pageTitle: pageTitle,
    }));
    
    // render panel with form    
    this.publisherFormPanel = new DiBB.PublisherFormPanel( { model: this.model });
    this.publisherFormPanel.render();    
    this.$("#"+this.publisherFormPanel.id).replaceWith(this.publisherFormPanel.$el);
    
    $(".dibb-app").html(this.$el);
  }
  
});