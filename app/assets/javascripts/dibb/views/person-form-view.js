DiBB.PersonFormView = Backbone.View.extend({

	template: JST['dibb/templates/person-form/person-form-view'],
  
  id: 'person-form-view',
  className: 'dibb-form-view',
  
  pageTitle: {
    "new": "New Person",
    "edit": "Edit Person"
  },
  
  events: {
    "click .save-button": "onSave",
    "click .cancel-button": "onCancel"
  },
    	
	initialize: function(options) {
    
    this.people = options.people;            
    
    if( options.personID ) {
      this.model = this.people.get(parseInt(options.personID));
      this.mode = "edit";
    } else {
      this.model = new DiBB.Person();
      this.mode = "new";
    }    
        
   },
  
  onSave: function(e) {
    this.personFormPanel.save(this.onCancel);
  },
  
  onCancel: function() {
    DiBB.Routes.routes.navigate("people", {trigger: true});
  },
    
  render: function() {    
    var pageTitle = this.pageTitle[this.mode];
    
    this.$el.html(this.template( { 
      pageTitle: pageTitle,
    }));
    
    // render panel with form    
    this.personFormPanel = new DiBB.PersonFormPanel( { model: this.model });
    this.personFormPanel.render();    
    this.$("#"+this.personFormPanel.id).replaceWith(this.personFormPanel.$el);
    
    $(".dibb-app").html(this.$el);
  }
  
});