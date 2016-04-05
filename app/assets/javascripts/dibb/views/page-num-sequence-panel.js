DiBB.PageNumSequencePanel = Backbone.View.extend({

  template: JST['dibb/templates/biblio-form/page-num-sequences-panel'],

  partials: {
    sequenceForm: JST['dibb/templates/biblio-form/page-num-sequences-form'],
    inputCell: JST['dibb/templates/common/string-input-cell']
  },

  id: 'page-num-sequences-panel',

  events: {
    "click .add-sequence-button": "onAdd",
    "click .edit-sequence-button": "onEdit",
    "click .delete-sequence-button": "onDelete",
    "change #first_page_number_as_appears": "onFirstNumChange",
    "change #final_page_number_as_appears": "onFinalNumChange"
  },

  initialize: function(options) {
    _.bindAll( this, "onSave", "onCancel" );

    this.title = options.title;
    this.instructions = options.instructions;
    this.embedded = options.embedded;
  },

  onSave: function() {

    this.model.set( 'first_page_number_as_appears', this.$('#first_page_number_as_appears').val() );
    this.model.set( 'first_page_number', this.$('#first_page_number').val() );
    this.model.set( 'final_page_number_as_appears', this.$('#final_page_number_as_appears').val() );
    this.model.set( 'final_page_number', this.$('#final_page_number').val() );

    this.collection.add(this.model);
    this.closeForm();
    this.render();
  },

  onCancel: function() {
    this.closeForm();
    this.render();
  },

  openForm: function( mode ) {

    this.$(".add-sequence-button").attr("disabled", true);
    this.$(".edit-sequence-button").attr("disabled", true);
    this.$(".delete-sequence-button").attr("disabled", true);

    // can't add another while this is open
    this.$(".add-sequence-button").attr("disabled", true);

    var sequenceForm = this.partials.sequenceForm({
      sequenceMember: this.model,
      first_page_number_as_appears: this.model.first_page_number_as_appears,
      first_page_number: this.model.first_page_number,
      final_page_number_as_appears: this.model.final_page_number_as_appears,
      final_page_number: this.model.final_page_number,
      partials: this.partials
    });

    if (mode == "edit") {
      // replace the existing row with the form
      this.$("#sequence-" + this.model.cid).replaceWith(sequenceForm);
    } else {
      // must be adding a new one
      this.$('#sequences-tbody').append(sequenceForm);
    }

    this.$(".save-sequence-button").click(this.onSave);
    this.$(".cancel-sequence-button").click(this.onCancel);
  },

  closeForm: function() {
    this.$('.edit-sequence-form').detach();
    this.$(".add-sequence-button").attr("disabled", false);
    this.$(".edit-sequence-button").attr("disabled", false);
    this.$(".delete-sequence-button").attr("disabled", false);
  },

  onAdd: function() {
    this.model = new DiBB.PageNumSequence();
    this.openForm("add");
  },

  onEdit: function(e) {
    var id = $(e.currentTarget).attr('data-sequence-cid');
    this.model = this.collection.get(id);
    this.openForm("edit");
  },

  onDelete: function(e) {
    var id = $(e.currentTarget).attr('data-sequence-cid');
    var model = this.collection.get(id);
    this.collection.remove(model);
    this.render();
  },

  onFirstNumChange: function(e) {
    var str = $(e.currentTarget).val();
    if ($.isNumeric(str)) {
      this.$('#first_page_number').val(str);
    }
    else {
      var num = deromanize(str);

      this.$('#first_page_number').val(num);
    }

  },

  onFinalNumChange: function(e) {
    var str = $(e.currentTarget).val();

    if ($.isNumeric(str)) {
      this.$('#final_page_number').val(str);
    }
    else {
      var num = deromanize(str);

      this.$('#final_page_number').val(num);
    }
  },

  render: function() {
    this.$el.html( this.template( {
      title: this.title,
      instructions: this.instructions,
      sequence: this.collection.models
    } ) );
  }

});