DiBB.CitationFormView = Backbone.View.extend({

	template: JST['dibb/templates/citation-form-view'],
  
  id: 'citation-form-view',
  className: 'dibb-form-view',
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    numberInput: JST['dibb/templates/common/number-input'],
		textAreaInput: JST['dibb/templates/common/textarea-input'],	
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
  
  pageTitle: {
    "new": "New Citation",
    "edit": "Edit Citation"
  },
  
  events: {
    "click .save-button": "onSave",
    "click .cancel-button": "onCancel"
  },
    	
	initialize: function(options) {
        
    if( options.citationID ) {
      this.model = this.collection.get(parseInt(options.citationID));
      this.mode = "edit";
    } else {
      this.model = new DiBB.Citation();
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
      // title_id: this.$('#title_id').val(),
      full_text: this.$('#full_text').val(),
      page_number: this.$('#page_number').val(),
      // page_number_sequence_id: this.$('#page_number_sequence_id').val(),
      originating_page_number_as_appears: this.$('#originating_page_number_as_appears').val(),
      ending_page_number_as_appears: this.$('#ending_page_number_as_appears').val(),
      // category_id: this.$('#category_id').val(),
      notes: this.$('#notes').val()
    });
   
    var onSuccess = _.bind( function(model, response, options) {
      window.history.back();
    }, this);

    this.collection.add( this.model );
    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError }); 
  },
  
  onCancel: function() {
    window.history.back();
  },
      
  render: function() {    
    var pageTitle = this.pageTitle[this.mode];
    
    this.$el.html(this.template( { 
      citation: this.model.toJSON(),
      partials: this.partials,
      validationErrors: this.validationErrors,
      pageTitle: pageTitle,
    }));
        
    $(".dibb-app").html(this.$el);
  }
  
});