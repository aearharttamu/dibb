/*global DiBB, Backbone, JST */

DiBB.PublisherFormView = Backbone.View.extend({

	template: JST['dibb/templates/publisher-form-view'],
  
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
  
  id: 'publisher-form-view',
  className: 'publisher-form',
  
  pageTitle: {
    "new": "New Publisher",
    "edit": "Edit Publisher"
  },
    	
	initialize: function(options) {
        
    this.publishers = options.publishers;
    this.embedded = options.embed;
    
    _.bindAll( this, "onValidationError", "onSave", "onCancel" );
    
    if( options.publisherID ) {
      this.publisher = this.publishers.get(parseInt(options.publisherID));
      this.mode = "edit";
    } else {
      this.publisher = new DiBB.Publisher();
      this.mode = "new";
    }    
    
    this.publisher.on("invalid", this.onValidationError );
    
''  },
  
  onSave: function(e) {
    this.save(this.onCancel);
  },
  
  onCancel: function() {
    DiBB.Routes.routes.navigate("publishers", {trigger: true});
  },
    
  save: function( onSuccessCallback ) {   
         
    this.publisher.set( {
      name: this.$('#name').val() 
    });
    
    var onSuccess = _.bind( function(model, response, options) {
      this.validationErrors = null;
      onSuccessCallback(model, response, options);
    }, this);

    this.publishers.add(this.publisher);
    this.publisher.save(null, { success: onSuccess, error: DiBB.Routes.onError });
  
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
    
  render: function() {    
    var pageTitle = this.pageTitle[this.mode];
    
    this.$el.html(this.template( { 
      pageTitle: pageTitle, 
      embedded: this.embedded, 
      publisher: this.publisher.toJSON(), 
      partials: this.partials, 
      validationErrors: this.validationErrors 
    }));
    
    if( !this.embedded ) {
      this.$(".save-button").click( this.onSave );
      this.$(".cancel-button").click( this.onCancel );
    }
    
    $(".dibb-app").html(this.$el);
  }
  
});