
DiBB.PersonListView = Backbone.View.extend({

	template: JST['dibb/templates/person-list-view'],
  
  id: 'person-list-view',
  className: 'dibb-list-view',  
  
  trIDTemplate: _.template("#pid-<%= id %>"),
  
  events: {
    'click .delete-button': 'onDelete'    
  },
    
	initialize: function(options) {    
    this.people = options.people;
  },
  
  onDelete: function(event) {
    var deleteButton = $(event.currentTarget);
    var pID = parseInt(deleteButton.attr("data-pid"));
    var deletedPerson = this.people.get(pID);

    if( deletedPerson ) {
      deleteButton.attr("disabled", true);  
      deletedPerson.destroy( { success: _.bind( function(){
        var tableRow = this.$(this.trIDTemplate({id: pID}));
        tableRow.detach();
      }, this) });
    }          
  },
  
  render: function() {
    this.$el.html(this.template( { people: this.people.toJSON() } ));
    $(".dibb-app").html(this.$el);
  }
  
});