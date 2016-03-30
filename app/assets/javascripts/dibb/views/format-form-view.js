DiBB.FormatFormView = Backbone.View.extend({

  template: JST['dibb/templates/format-form-view'],

  id: 'format-form-view',
  className: 'dibb-form-view',

  partials: {
    stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']
  },

  pageTitle: {
    "new": "New Format",
    "edit": "Edit Format"
  },

  events: {
    "click .save-button": "onSave",
    "click .cancel-button": "onCancel"
  },

  initialize: function(options) {

    if( options.formatID ) {
      this.model = this.collection.get(parseInt(options.formatID));
      this.mode = "edit";
    } else {
      this.model = new DiBB.Format();
      this.mode = "new";
    }

    _.bindAll( this, "onValidationError" );
    this.model.on("invalid", this.onValidationError );

  },

  onValidationError: function( model, errors ) {
    this.validationErrors = errors;
    this.render();
  },

  onSave: function(e) {

    this.model.set( {
      name: this.$('#name').val()
    });

    var onSuccess = _.bind( function(model, response, options) {
      DiBB.Routes.routes.navigate("formats", {trigger: true});
    }, this);

    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError });
  },

  onCancel: function() {
    DiBB.Routes.routes.navigate("formats", {trigger: true});
  },

  render: function() {
    var pageTitle = this.pageTitle[this.mode];

    this.$el.html(this.template( {
      format: this.model.toJSON(),
      partials: this.partials,
      validationErrors: this.validationErrors,
      pageTitle: pageTitle,
    }));

    $(".dibb-app").html(this.$el);
  }

})