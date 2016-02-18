DiBB.StaffPanel = Backbone.View.extend({

	template: JST['dibb/templates/biblio-form/staff-panel'],
  
	partials: {
		stringInputCell: JST['dibb/templates/common/string-input-cell'],
		dropdownInputCell: JST['dibb/templates/common/dropdown-input-cell'],
		staffForm: JST['dibb/templates/biblio-form/staff-form']
	},
  
  id: 'staff-panel',
  
  events: {
    "click .add-staff-button": "onAdd",
    "click .edit-staff-button": "onEdit",
    "click .delete-staff-button": "onDelete"    
  },
  
  initialize: function(options) {
    _.bindAll( this, "onSave", "onCancel" );
  },
  
  onSave: function() {
    
    // this.staffMember.set( 'name', this.$('#name').val() );
    // this.staffMember.set( 'role', this.$('#role').val() );
    
    // TODO validation staff
    
    this.collection.add(this.staffMember);
    this.closeForm();
    this.render();
  },
  
  onCancel: function() {
    this.closeForm();    
    this.render();
  },
  
  openForm: function( mode ) {
    
    DiBB.Routes.routes.loadRoles( _.bind( function(roles) {

      var staffForm = this.partials.staffForm( { 
        staffMember: this.staffMember, 
        roles: roles.names(), 
        partials: this.partials 
      }); 
    
      if( mode == "edit") {
        // replace the existing row with the form
        this.$("#staff-"+this.staffMember.cid).replaceWith(staffForm);      
      } else {
        // must be adding a new one
        this.$('#staff-tbody').append(staffForm);
      }
    
      // render person reference input field
      var personField = new DiBB.ReferenceInput( {
        id: 'person-field',
        model: this.staffMember, 
        formViewClass: DiBB.PersonFormModal,
        refModelClass: DiBB.Person,
        loader: DiBB.Routes.routes.loadPeople,
        field_name: 'person_id', 
        field_title: '',
        field_instructions: '',
        field_value: this.staffMember.get("name"), 
        cellMode: true,
        error: false      
      });
      personField.render();
      this.$("#person-field").replaceWith(personField.$el);
    
      this.$(".save-staff-button").click( this.onSave );
      this.$(".cancel-staff-button").click( this.onCancel );    

      // can't add another while this is open
      this.$(".add-staff-button").attr("disabled", true);
      
    }, this ));  
    
  },
  
  closeForm: function() {
    this.$('.edit-staff-form').detach();
    this.$(".add-staff-button").attr("disabled", false);  
  },
  
  onAdd: function() {
    this.staffMember = new DiBB.StaffMember();
    this.openForm("add");    
  },
  
  onEdit: function(e) {
    var id = $(e.currentTarget).attr('data-staff-cid');
    this.staffMember = this.collection.get(id);
    this.openForm("edit");    
  },
  
  onDelete: function(e) {
    var id = $(e.currentTarget).attr('data-staff-cid');
    var model = this.collection.get(id);
    this.collection.remove(model);
    this.render();
  },
        
  render: function() {      
    this.$el.html( this.template( { staff: this.collection.models } ) );
  }
  
});