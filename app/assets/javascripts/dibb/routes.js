
DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioSetList",
    "biblio_set/new": "biblioSetNew",
    "biblio_set/:id/edit": "biblioSetEdit",
    "bibliographs" : "bibliographList",
    "publishers" : "publisherList",
    "publishers/new": "publisherNew",
    "publishers/:id/edit": "publisherEdit",
    "people" : "personList",
    "people/new": "personNew",
    "people/:id/edit": "personEdit",
    "roles" : "roleList",
    "roles/new": "roleNew",
    "roles/:id/edit": "roleEdit"
  },
    
  initialize: function(options) {
                      
    // global singleton
    DiBB.Routes.routes = this;
    
    // TODO
    this.graphDashboardURL = ""; 
    
  },

  biblioSetList: function() {    
    
    this.loadBiblioSets( _.bind( function(biblioSets) {
      var biblioSetListView = new DiBB.BiblioSetListView( { biblioSets: biblioSets });
      biblioSetListView.render();
    }, this));        
  },
  
  biblioSetNew: function() {
    
    this.loadBiblioSets( _.bind( function(biblioSets) {
      var biblioSetFormView = new DiBB.BiblioSetFormView( { biblioSets: biblioSets } );
      biblioSetFormView.render();
    }, this));        
    
  },

  biblioSetEdit: function(biblioSetID) {
    
    this.loadBiblioSets( _.bind( function(biblioSets) {
      var biblioSetFormView = new DiBB.BiblioSetFormView( { biblioSets: biblioSets, biblioSetID: biblioSetID } );
      biblioSetFormView.render();
    }, this));
  },
  
  ////////////////////////////////////
  
  bibliographList: function() {
    
    this.loadBibliograph( _.bind( function(bibliographs) {
      var bibliographListView = new DiBB.BibliographListView( { bibliographs: bibliographs, 
                                                                graphDashboardURL: this.graphDashboardURL });
      bibliographListView.render();
    }, this));        
  },
  
  ////////////////////////////////////
  
  publisherList: function() {

    this.loadPublishers( _.bind( function(publishers) {
      var publisherListView = new DiBB.PublisherListView( { publishers: publishers });
      publisherListView.render();
    }, this));            
  },
  
  publisherNew: function() {
    
    this.loadPublishers( _.bind( function(publishers) {
      var publisherFormView = new DiBB.PublisherFormView( { publishers: publishers } );
      publisherFormView.render();
    }, this));        
    
  },

  publisherEdit: function(publisherID) {
    
    this.loadPublishers( _.bind( function(publishers) {
      var publisherFormView = new DiBB.PublisherFormView( { publishers: publishers, publisherID: publisherID } );
      publisherFormView.render();
    }, this));        
    
  },
  
  ////////////////////////////////////
  
  personList: function() {

    this.loadPeople( _.bind( function(people) {
      var personListView = new DiBB.PersonListView( { people: people });
      personListView.render();
    }, this));            
  },
  
  personNew: function() {
    
    this.loadPeople( _.bind( function(people) {
      var personFormView = new DiBB.PersonFormView( { people: people } );
      personFormView.render();
    }, this));        
    
  },

  personEdit: function(personID) {
    
    this.loadPeople( _.bind( function(people) {
      var personFormView = new DiBB.PersonFormView( { people: people, personID: personID } );
      personFormView.render();
    }, this));        
    
  },
  
  ////////////////////////////////////

  roleList: function() {

    this.loadRoles( _.bind( function(roles) {
      var roleListView = new DiBB.RoleListView( { collection: roles });
      roleListView.render();
    }, this));            
  },
  
  roleNew: function() {
    
    this.loadRoles( _.bind( function(roles) {
      var roleFormView = new DiBB.RoleFormView( { collection: roles } );
      roleFormView.render();
    }, this));        
    
  },

  roleEdit: function(roleID) {
    
    this.loadRoles( _.bind( function(roles) {
      var roleFormView = new DiBB.RoleFormView( { collection: roles, roleID: roleID } );
      roleFormView.render();
    }, this));        
    
  },
  
  ////////////////////////////////////////////////////////////////////////
  
  loadRoles: function( initView ) {
    var roles = new DiBB.RoleCollection();
    roles.fetch( { success: initView, error: this.onError } );
  },
  
  loadPublishers: function( initView ) {
    var publishers = new DiBB.PublisherCollection();
    publishers.fetch( { success: initView, error: this.onError } );
  },
  
  loadPeople: function( initView ) {
    var people = new DiBB.PersonCollection();
    people.fetch( { success: initView, error: this.onError } );
  },
  
  loadBibliograph: function( initView ) {
    var bibliographs = new DiBB.BibliographCollection();
    bibliographs.fetch( { success: initView, error: this.onError } );
  },
  
  loadBiblioSets: function( initView ) {
    var biblioSets = new DiBB.BiblioSetCollection();
    biblioSets.fetch( { success: initView, error: this.onError } );
  },
  
   // TODO improve error handling
  onError: function( collection, response, options ) {
     alert(response);    
  }    

});