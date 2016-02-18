DiBB.TitleFormView = Backbone.View.extend({

	template: JST['dibb/templates/title-form/title-form-view'],
  
  id: 'title-form-view',
  className: 'dibb-form-view',
  
  pageTitle: {
    "new": "New Title",
    "edit": "Edit Title"
  },
  
  events: {
    "click .save-button": "onSave",
    "click .cancel-button": "onCancel"
  },
    	
	initialize: function(options) {
    
    if( options.titleID ) {
      this.model = this.collection.get(parseInt(options.titleID));
      this.mode = "edit";
    } else {
      this.model = new DiBB.Title();
      this.mode = "new";
    }    
        
   },
  
  onSave: function(e) {
    this.titleFormPanel.save(this.onCancel);
  },
  
  onCancel: function() {
    DiBB.Routes.routes.navigate("titles", {trigger: true});
  },
    
  render: function() {    
    var pageTitle = this.pageTitle[this.mode];
    
    this.$el.html(this.template( { 
      pageTitle: pageTitle,
    }));
    
    // render panel with form    
    this.titleFormPanel = new DiBB.TitleFormPanel( { model: this.model });
    this.titleFormPanel.render();    
    this.$("#"+this.titleFormPanel.id).replaceWith(this.titleFormPanel.$el);
    
    $(".dibb-app").html(this.$el);
  }
  
});