DiBB.BindingFormView = Backbone.View.extend({

  template: JST['dibb/templates/binding-form/binding-form-view'],

  id: 'binding-form-view',
  className: 'dibb-form-view',

  pageTitle: {
    "new": "New Binding",
    "edit": "Edit Binding"
  },

  events: {
    "click .save-button": "onSave",
    "click .cancel-button": "onCancel"
  },

  initialize: function(options) {

    this.binding = options.binding;

    if( options.bindingID ) {
      this.model = this.binding.get(parseInt(options.bindingID));
      this.mode = "edit";
    } else {
      this.model = new DiBB.Binding();
      this.mode = "new";
    }

  },

  onSave: function(e) {
    this.bindingFormPanel.save(this.onCancel);
  },

  onCancel: function() {
    DiBB.Routes.routes.navigate("binding", {trigger: true});
  },

  render: function() {
    var pageTitle = this.pageTitle[this.mode];

    this.$el.html(this.template( {
      pageTitle: pageTitle,
    }));

    // render panel with form
    this.bindingFormPanel = new DiBB.BindingFormPanel( { model: this.model });
    this.bindingFormPanel.render();
    this.$("#"+this.bindingFormPanel.id).replaceWith(this.bindingFormPanel.$el);

    $(".dibb-app").html(this.$el);
  }

});