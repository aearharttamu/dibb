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

    // if the user created a person and it isn't linked, save it
    var personName = this.$('#person_id').val();
    if( !this.model.get('person_id') && personName.length > 0 ) {      
      this.model.set( 'new_person_name', personName );      
    } else {
      this.model.set( 'new_person_name', null );      
    }
    
    this.model.set( 'person_name', personName );
    
    var roleDropdown = this.$("#role_id")[0];
    var roleName = roleDropdown[roleDropdown.selectedIndex].label;
    this.model.set( 'role', roleName );

    this.model.set( 'role_id', this.$('#role_id').val() );
    
    this.collection.add(this.model);
    this.closeForm();
    this.render();
  },
  
  onCancel: function() {
    this.closeForm();    
    this.render();
  },
  
  openForm: function( mode ) {
    
    this.$(".add-staff-button").attr("disabled", true);  
    this.$(".edit-staff-button").attr("disabled", true);  
    this.$(".delete-staff-button").attr("disabled", true);  
    
    DiBB.Routes.routes.loadRoles( _.bind( function(roles) {

      // can't add another while this is open
      this.$(".add-staff-button").attr("disabled", true);

      var staffForm = this.partials.staffForm( { 
        staffMember: this.model, 
        roles: roles.names(), 
        partials: this.partials 
      }); 

      if( mode == "edit") {
        // replace the existing row with the form
        this.$("#staff-"+this.model.cid).replaceWith(staffForm);      
      } else {
        // must be adding a new one
        this.$('#staff-tbody').append(staffForm);
      }
              
      // render person reference input field
      var personField = new DiBB.ReferenceInput( {
        id: 'person-field',
        model: this.model, 
        formViewClass: DiBB.PersonFormModal,
        refModelClass: DiBB.Person,
        loader: DiBB.Routes.routes.loadPeople,
        field_name: 'person_id', 
        field_value: this.model.get("person_name"), 
        cellMode: true,
        error: false      
      });
      personField.render();
      this.$("#person-field").replaceWith(personField.$el);
              
      this.$(".save-staff-button").click( this.onSave );
      this.$(".cancel-staff-button").click( this.onCancel );    
      
    }, this ));  
    
  },
  
  closeForm: function() {
    this.$('.edit-staff-form').detach();
    this.$(".add-staff-button").attr("disabled", false);  
    this.$(".edit-staff-button").attr("disabled", false);  
    this.$(".delete-staff-button").attr("disabled", false);  
  },
  
  onAdd: function() {
    this.model = new DiBB.StaffMember();
    this.openForm("add");    
  },
  
  onEdit: function(e) {
    var id = $(e.currentTarget).attr('data-staff-cid');
    this.model = this.collection.get(id);
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