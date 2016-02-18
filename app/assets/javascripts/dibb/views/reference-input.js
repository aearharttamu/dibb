DiBB.ReferenceInput = Backbone.View.extend({

	template: JST['dibb/templates/common/reference-input'],
  cellTemplate: JST['dibb/templates/common/reference-input-cell'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
		stringInputCell: JST['dibb/templates/common/string-input-cell'],
		numberInput: JST['dibb/templates/common/number-input'],
		textAreaInput: JST['dibb/templates/common/textarea-input'],
		dropdownInput: JST['dibb/templates/common/dropdown-input'],
    validationErrors: JST['dibb/templates/common/validation-errors'],
		staff: JST['dibb/templates/biblio-form/staff']
	},
  
  className: 'reference-input',
        	
	initialize: function(options) {

    _.bindAll( this, "onRefEditButton", "onRefModalClose" );

    this.formViewClass = options.formViewClass;
    this.refModelClass = options.refModelClass;
    this.loader = options.loader;    
    this.fieldID = options.field_name;
    this.cellMode = options.cellMode;
    this.formOptions = options;
    this.formOptions.partials = this.partials;
        
  },
    
  toggleReferenceFieldState: function( enabled ) {
    var backgroundColor = (enabled) ? 'white' : '#f0f0f0';
    this.inputField.attr("disabled", !enabled );
    this.inputField.css("background-color", backgroundColor);          
  },
  
  onRefEditButton: function() {
    
    var refID = this.model.get(this.fieldID);
    var refModel = new this.refModelClass( { id: refID });
    
    refModel.fetch( { success: _.bind( function(refModel) {
      // set up the edit dialog
      var formView = new this.formViewClass({ model: refModel, onClose: this.onRefModalClose });
      formView.render();
      this.$el.append(formView.$el);
      formView.open();         
    },this), 
    error: DiBB.Routes.onError });
  },
  
  onRefModalClose: function( fieldValue, refID ) {
    this.inputField.val(fieldValue);
    this.model.set( this.fieldID, refID );
    this.toggleReferenceFieldState((refID == null));
  },
  
  render: function() {
    
    // choose either table based or regular
    var template = this.cellMode ? this.cellTemplate : this.template;
    this.$el.html( this.template( this.formOptions ) );    

    this.inputField = this.$( "#"+this.fieldID );
    
    // load the list for the autocompleting drop down
    this.loader( _.bind( function(collection) {
      new Awesomplete( this.inputField[0], {
        list: collection.names()
      });
    }, this ));
        
    // if this field is populated already, disable editing
    if( this.model.get(this.fieldID) ) {
      this.toggleReferenceFieldState(false);
    }
    
    var refEditButton = this.$(".edit-button");
    refEditButton.click( this.onRefEditButton );
    
    // handle selection from the list
    this.inputField.bind('awesomplete-select', _.bind(function(event) {
      var dataID = event.originalEvent.dataID;
      this.model.set( this.fieldID, dataID );
      this.toggleReferenceFieldState(false);
    }, this));
    
  }
    
});