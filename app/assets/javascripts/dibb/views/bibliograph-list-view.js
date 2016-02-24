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
    this.bibliographs = options.bibliographs;
    this.graphDashboardURL = options.graphDashboardURL;

    _.bindAll( this, "onValidationError" );        
    // this.model.on("invalid", this.onValidationError );
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var graphID = parseInt(deleteButton.attr("data-graphid"));
    var deletedBibliograph = this.bibliographs.get(graphID);

    if( deletedBibliograph ) {
      deleteButton.attr("disabled", true);
      deletedBibliograph.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: graphID}));
        this.dataTable.row(tableRow).remove().draw();
      }, this) });
    }
    
    return false;
  },
  
  onValidationError: function( model, errors ) {
    this.validationErrors = errors;    
    this.render();
  },
  
  onCreateGraph: function() {
    
    var newGraphDialog = this.$("#new-graph-dialog");
        
    var onSuccess = function(model, response, options) {
      // close dialog and reset it
      // render table? 
      newGraphDialog.modal('hide');
         
    };
    
    var onError = function(model, response, options) {
      // TODO show error messages, stay on dialog.   
    };
    
    this.bibliograph = new DiBB.Bibliograph();
    
    this.bibliograph.set( {
      name: this.$('#bilbiograph-name').val()
    });
    
    this.bibliographs.add(this.bibliograph);
    this.bibliograph.save(null, { success: onSuccess, error: onError });
            
  },
  
  render: function() {
    this.$el.html(this.template( {  bibliographs: this.bibliographs.toJSON(), 
                                    graphDashboardURL: this.graphDashboardURL, 
                                    defaultGraphName: "graph000",
                                    validationErrors: this.validationErrors,
                                    partials: this.partials } ));
    this.dataTable = this.$('#bibliograph-table').DataTable();
    $(".dibb-app").html(this.$el);
  }
  
});