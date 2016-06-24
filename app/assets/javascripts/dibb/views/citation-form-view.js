DiBB.CitationFormView = Backbone.View.extend({

	template: JST['dibb/templates/citation-form-view'],
  
  id: 'citation-form-view',
  className: 'dibb-form-view',
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    numberInput: JST['dibb/templates/common/number-input'],
		textAreaInput: JST['dibb/templates/common/textarea-input'],
    dropdownInput: JST['dibb/templates/common/dropdown-input'],
    richTextInput: JST['dibb/templates/common/richtext-input'],
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
      full_text: this.$('#summernote').summernote('code'),
      page_number: this.$('#page_number').val(),
      page_num_sequence_id: this.$('#page_num_sequence_id').val(),
      originating_page_number_as_appears: this.$('#originating_page_number_as_appears').val(),
      ending_page_number_as_appears: this.$('#ending_page_number_as_appears').val(),
      // category_id: this.$('#category_id').val(),
      notes: this.$('#notes').val(),
    });
    
    // if the user created a title and it isn't linked, save it
    var titleName = this.$('#title_id').val();
    if( !this.model.get('title_id') && titleName.length > 0 ) {      
      this.model.set( 'title_name', titleName );      
    } else {
      this.model.set( 'title_name', null );      
    }
   
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
    var pageNumSequencesJSON = this.model.get("page_num_sequences_json")
    var sequences = pageNumSequencesJSON ? JSON.parse(pageNumSequencesJSON) : [];

    this.$el.html(this.template( {
      citation: this.model.toJSON(),
      partials: this.partials,
      sequences: sequences,
      validationErrors: this.validationErrors,
      pageTitle: pageTitle,
    }));


    // render title reference input field
    var titleField = new DiBB.ReferenceInput( {
      id: 'title-field',
      model: this.model,
      formViewClass: DiBB.TitleFormModal,
      refModelClass: DiBB.Title,
      loader: DiBB.Routes.routes.loadTitles,
      field_name: 'title_id',
      field_title: 'Title',
      field_value: this.model.get("title_name"),
      field_instructions: 'Select the name of the title as it appears in the citation.',
      error: _.has(this.validationErrors, 'title_id')
    });
    titleField.render();

    this.$("#title-field").replaceWith(titleField.$el);
    this.$("#summernote").summernote({
      height: 300,
      minHeight: null,
      maxHeight: null,
      focus: true,
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']]
      ]
    });

    this.collection.add(this.model.get("sequence_json"));



    this.$('#summernote').summernote('code',this.model.get("full_text"))
    $(".dibb-app").html(this.$el);
  }
  
});