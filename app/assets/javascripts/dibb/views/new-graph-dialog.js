DiBB.NewGraphDialog = Backbone.View.extend({

  id: 'new-graph-dialog-container',

	template: JST['dibb/templates/new-graph-dialog'],
  graphNameTemplate: _.template("DiBB <%= getMonth() %>/<%= getDate() %>/<%= getFullYear() %> @ <%= getHours() %>:<%= getMinutes() %> "),
    
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
      
  events: {
    'click .create-graph-button': 'onCreateGraph',
    'click .cancel-button': 'onCancel'
  },
    
	initialize: function(options) {    
    this.saveCallback = options.saveCallback;
    _.bindAll( this, "onValidationError" );        
    this.model.on("invalid", this.onValidationError );
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
    
  onCreateGraph: function() {
            
    var onSuccess = _.bind(function(model, response, options) {
      this.close( this.saveCallback );
    }, this);
        
    this.model.set( {
      name: this.$('#bilbiograph-name').val()
    });
    
    this.collection.add(this.model);
    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError });            
  },

  onCancel: function() {
     this.close();
  },

  close: function(callback) {
    var newGraphDialog = this.$("#new-graph-dialog");

    newGraphDialog.on('hidden.bs.modal', _.bind( function (e) {
      newGraphDialog.detach();
      if( callback ) {
        callback();
      }
    }, this) ); 
    
    newGraphDialog.modal('hide');
  },

  open: function() {
    var newGraphDialog = this.$("#new-graph-dialog");
    newGraphDialog.modal({ keyboard: false });
  },
  
  render: function() {    
    var defaultGraphName = this.graphNameTemplate( new Date() );

    this.$el.html(this.template({  
      defaultGraphName: defaultGraphName,
      validationErrors: this.validationErrors,
      partials: this.partials 
    }));

  }
  
});