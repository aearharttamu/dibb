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
        
    if( !options.model ) {
      this.model = new DiBB.Citation({ biblio_id: options.biblioID });
      this.mode = "new";
    } else {
      this.model = options.model;
      this.mode = "edit";
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

    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError }); 
  },
  
  onCancel: function() {
    window.history.back();
  },
      
  render: function() {    
    
    var renderNow = _.bind( function() {
      var pageTitle = this.pageTitle[this.mode];

      this.$el.html(this.template( {
        citation: this.model.toJSON(),
        partials: this.partials,
        sequences: this.model.sequences.sequenceList(),
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

      this.$('#summernote').summernote('code',this.model.get("full_text"))
      $(".dibb-app").html(this.$el);    
    }, this);
    
    if( this.model.sequences ) {
      renderNow();
    } else {
      // otherwise, go get page sequences first, then render
      DiBB.Routes.routes.loadPageNumSequences( this.model.get("biblio_id"), _.bind( function( sequences ) {
        this.model.sequences = sequences;
        renderNow();
      }, this ));
    }
  }
  
});