DiBB.CitationsTab = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/citations-tab'],
    
  id: 'citations-tab-panel',
  className: 'biblio-tab',
            	
  trIDTemplate: _.template("#citid-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
      
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var citID = parseInt(deleteButton.attr("data-citid"));
    var deletedCitation = this.model.citations.get(citID);

    if( deletedCitation ) {
      deleteButton.attr("disabled", true);  
      deletedCitation.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: citID}));
        tableRow.detach();
      }, this) });
    }          
  },
            
  save: function( onSuccessCallback ) {   
    // NOOP for this tab
    onSuccessCallback();
  },
              
  render: function() {        
    this.$el.html(this.template( { citations: this.model.citations.toJSON(), biblio_id: this.model.id } ));
  }
  
});