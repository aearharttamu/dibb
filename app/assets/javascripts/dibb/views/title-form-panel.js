
DiBB.TitleFormPanel = Backbone.View.extend({

	template: JST['dibb/templates/title-form/title-form-panel'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
  
  id: 'title-form-panel',
  className: 'title-form-panel',
    	
	initialize: function(options) {
    _.bindAll( this, "onValidationError" );        
    this.model.on("invalid", this.onValidationError );    
   },
          
  save: function( onSuccessCallback ) {   
         
    this.model.set( {
      name: this.$('#name').val(),
      is_review: this.$('#is_review').val(),
      review_full_text: this.$('#review_full_text').val(),
      serial_title: this.$('#serial_title').val(),
      serial_volume_as_appears: this.$('#serial_volume_as_appears').val(),
      serial_issue_as_appears: this.$('#serial_issue_as_appears').val()
      // encompassing_title_id: this.$('#encompassing_title_id').val()
    });
    
    var onSuccess = _.bind( function(model, response, options) {
      this.validationErrors = null;
      onSuccessCallback(model, response, options);
    }, this);

    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError });
  
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
  
  render: function() {    
    this.$el.html( this.template( {
      title: this.model.toJSON(),
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }) );
  }
  
});