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
    var deletedCitation = this.citations.get(citID);

    if( deletedCitation ) {
      deletedCitation.attr("disabled", true);  
      deletedCitation.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: citID}));
        tableRow.detach();
      }, this) });
    }          
  },
            
  save: function( onSuccessCallback ) {   
                  
    var onSuccess = _.bind( function(model, response, options) {
      this.validationErrors = null;
      onSuccessCallback(model, response, options);
    }, this);

    this.collection.biblioSetID = this.model.get("biblio_set_id");
    this.collection.add(this.model);
    this.model.save(null, { success: onSuccess, error: DiBB.Routes.onError });   
  },
  
              
  render: function() {        
    this.$el.html(this.template( { citations: this.model.citations.toJSON(), biblio_id: this.model.id } ));
  }
  
});