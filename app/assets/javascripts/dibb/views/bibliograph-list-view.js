/*global DiBB, Backbone, JST, _ */

DiBB.BibliographListView = Backbone.View.extend({

	template: JST['dibb/templates/bibliograph-list-view'],
  
  id: 'bibliograph-list-view',
  className: 'bibliograph-list',
  
	partials: {
		stringInput: JST['dibb/templates/string-input']
	},
    
  events: {
    'click .create-graph-button': 'onCreateGraph',
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.bibliographs = options.bibliographs;
    this.graphDashboardURL = options.graphDashboardURL;
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var graphID = parseInt(deleteButton.attr("data-graphid"));
    var deletedBibliograph = this.bibliographs.get(graphID);

    if( deletedBibliograph ) {
      deleteButton.attr("disabled", true);
      deletedBibliograph.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: bibID}));
        this.dataTable.row(tableRow).remove().draw();
      }, this) });
    }
  },
  
  onCreateGraph: function() {
    
    var onSuccess = function(model, response, options) {
      // close dialog and reset it
    };
    
    var onError = function(model, response, options) {
      // TODO show error messages, stay on dialog.   
    };
    
    this.bibliograph.set( {
      name: this.$('#graph-name').val()
    });
    
    this.bibliographs.add(this.bibliograph);
    this.bibliograph.save(null, { success: onSuccess, error: onError });
            
  },
  
  render: function() {
    this.$el.html(this.template( {  bibliographs: this.bibliographs.toJSON(), 
                                    graphDashboardURL: this.graphDashboardURL, 
                                    defaultGraphName: "graph000",
                                    partials: this.partials } ));
    this.dataTable = this.$('#bibliograph-table').DataTable();
    $(".dibb-app").html(this.$el);
  }
  
});