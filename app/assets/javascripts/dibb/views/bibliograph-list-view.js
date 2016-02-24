DiBB.BibliographListView = Backbone.View.extend({


  id: 'bibliograph-list-view',
  className: 'bibliograph-list',

	template: JST['dibb/templates/bibliograph-list-view'],
  trIDTemplate: _.template("#graphid-<%= id %>"),
    
	partials: {
		stringInput: JST['dibb/templates/common/string-input'],
    validationErrors: JST['dibb/templates/common/validation-errors']  
	},
      
  events: {
    'click .create-graph-button': 'onCreateGraph',
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.graphDashboardURL = options.graphDashboardURL;
    this.model = new DiBB.Bibliograph();

    _.bindAll( this, "onValidationError" );        
    this.model.on("invalid", this.onValidationError );
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var graphID = parseInt(deleteButton.attr("data-graphid"));
    var deletedBibliograph = this.collection.get(graphID);

    if( deletedBibliograph ) {
      deleteButton.attr("disabled", true);  
      deletedBibliograph.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: graphID}));
        tableRow.detach();
      }, this) });
    }          
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
  
  onCreateGraph: function() {
    
    var newGraphDialog = this.$("#new-graph-dialog");
        
    var onSuccess = _.bind(function(model, response, options) {
      newGraphDialog.modal('hide');
      this.render();
    }, this);
        
    this.model.set( {
      name: this.$('#bilbiograph-name').val()
    });
    
    this.collection.add(this.model);
    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError });
            
  },
  
  render: function() {
    
    var currentTime = new Date();
    this.$el.html(this.template( {  bibliographs: this.collection.toJSON(), 
                                    graphDashboardURL: this.graphDashboardURL, 
                                    defaultGraphName: "DiBB Snapshot - "+currentTime.getTime(),
                                    validationErrors: this.validationErrors,
                                    partials: this.partials } ));
    $(".dibb-app").html(this.$el);
  }
  
});