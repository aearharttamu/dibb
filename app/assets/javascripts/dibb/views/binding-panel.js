DiBB.BindingPanel = Backbone.View.extend({

  template: JST['dibb/templates/biblio-form/binding-panel'],

  partials: {
    dropdownInputCell: JST['dibb/templates/common/dropdown-input-cell'],
    bindingForm: JST['dibb/templates/biblio-form/binding-form'],
    inputCell: JST['dibb/templates/common/string-input-cell']
  },

  id: 'binding-panel',

  events: {
    "click .add-binding-button": "onAdd",
    "click .edit-binding-button": "onEdit",
    "click .delete-binding-button": "onDelete"
  },

  initialize: function(options) {
    _.bindAll( this, "onSave", "onCancel" );

    this.title = options.title;
    this.instructions = options.instructions;
    this.embedded = options.embedded;
  },

  onSave: function() {

    var formatDropdown = this.$("#format_id")[0];
    var format = formatDropdown[formatDropdown.selectedIndex].label;
    this.model.set( 'format', format );

    var currencyDropdown = this.$("#currency_id")[0];
    var currency = currencyDropdown[currencyDropdown.selectedIndex].label;
    this.model.set( 'currency', currency );

    this.model.set( 'format_id', this.$('#format_id').val() );
    this.model.set( 'currency_id', this.$('#currency_id').val() );
    this.model.set( 'price', this.$('#price').val() );



    this.collection.add(this.model);
    this.closeForm();
    this.render();
  },

  onCancel: function() {
    this.closeForm();
    this.render();
  },

  openForm: function( mode ) {

    this.$(".add-binding-button").attr("disabled", true);
    this.$(".edit-binding-button").attr("disabled", true);
    this.$(".delete-binding-button").attr("disabled", true);

    DiBB.Routes.routes.loadFormats( _.bind( function(formats) {

      DiBB.Routes.routes.loadCurrencies(_.bind(function (currencies) {

        // can't add another while this is open
        this.$(".add-binding-button").attr("disabled", true);

        var bindingForm = this.partials.bindingForm({
          bindingMember: this.model,
          formats: formats.names(),
          currencies: currencies.names(),
          price: this.model.price,
          partials: this.partials
        });

        if (mode == "edit") {
          // replace the existing row with the form
          this.$("#binding-" + this.model.cid).replaceWith(bindingForm);
        } else {
          // must be adding a new one
          this.$('#bindings-tbody').append(bindingForm);
        }

        this.$(".save-binding-button").click(this.onSave);
        this.$(".cancel-binding-button").click(this.onCancel);

      }, this));
    },this));
  },

  closeForm: function() {
    this.$('.edit-binding-form').detach();
    this.$(".add-binding-button").attr("disabled", false);
    this.$(".edit-binding-button").attr("disabled", false);
    this.$(".delete-binding-button").attr("disabled", false);
  },

  onAdd: function() {
    this.model = new DiBB.Binding();
    this.openForm("add");
  },

  onEdit: function(e) {
    var id = $(e.currentTarget).attr('data-binding-cid');
    this.model = this.collection.get(id);
    this.openForm("edit");
  },

  onDelete: function(e) {
    var id = $(e.currentTarget).attr('data-binding-cid');
    var model = this.collection.get(id);
    this.collection.remove(model);
    this.render();
  },

  render: function() {
    this.$el.html( this.template( {
      title: this.title,
      instructions: this.instructions,
      edition: this.collection.models
    } ) );
  }

});