DiBB.BibliographListView = Backbone.View.extend({

  id: 'bibliograph-list-view',
  className: 'bibliograph-list',

  pollInterval: 3000,

	template: JST['dibb/templates/bibliograph-list-view'],
  trIDTemplate: _.template("#graphid-<%= id %>"),
          
  events: {
    'click .new-graph-button': 'onNewGraph',
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.graphDashboardURL = options.graphDashboardURL;
    this.rendering = false;
    _.bindAll( this, "pollProgress" );        
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

  // check the server to see if the graph rendering is in progress
  pollProgress: function() {  
    $.ajax({
      url: "/in_progress",
    }).success(_.bind( function(data) {
      var renderStatus = data.in_progress;

      if( this.rendering != renderStatus ) {
        this.rendering = renderStatus;
        // we could have naved away from this view
        var viewVisible = $("#"+this.id).length > 0;
        if( viewVisible ) {
          this.newGraphDialog.close();
          this.render();        
        } else {
          window.clearTimeout(this.pollTimer); 
          this.pollTimer = null;         
        }
      }
    }, this ));
  },

  startPolling: function() {
    if( !this.pollTimer ) {
      this.pollProgress();
      this.pollTimer = window.setInterval( this.pollProgress, this.pollInterval );            
    }
  },

  onNewGraph: function() {
    var saveCallback = _.bind( function() {
      this.startPolling();
    },this);

    var bibliograph = new DiBB.Bibliograph();
    this.newGraphDialog = new DiBB.NewGraphDialog({ 
      model: bibliograph, 
      collection: this.collection, 
      saveCallback: saveCallback 
    });
    this.newGraphDialog.render();
    this.$('#new-graph-dialog-container').replaceWith(this.newGraphDialog.el);
    this.newGraphDialog.open();
  },
  
  render: function() {
    
    this.$el.html(this.template({ 
      bibliographs: this.collection.toJSON(), 
      rendering: this.rendering,
      graphDashboardURL: this.graphDashboardURL
    }));

    $(".dibb-app").html(this.$el);
    this.startPolling();
  }
  
});