
DiBB.Routes = Backbone.Router.extend({

  routes: {
    "": "biblioSetList",
    "biblio_set/new": "biblioSetNew",
    "biblio_set/:id/edit": "biblioSetEdit",
    "bibliographs" : "bibliographList",
    "publishers" : "publisherList",
    "publishers/new": "publisherNew",
    "publishers/:id/edit": "publisherEdit",
    "titles" : "titleList",
    "titles/new": "titleNew",
    "titles/:id/edit": "titleEdit",
    "people" : "personList",
    "people/new": "personNew",
    "people/:id/edit": "personEdit",
    "roles" : "roleList",
    "roles/new": "roleNew",
    "roles/:id/edit": "roleEdit",
    "bindings" : "bindingList",
    "bindings/new": "bindingNew",
    "bindings/:id/edit": "bindingEdit",
    "formats" : "formatList",
    "formats/new": "formatNew",
    "formats/:id/edit": "formatEdit",
    "currencies" : "currencyList",
    "currencies/new": "currencyNew",
    "currencies/:id/edit": "currencyEdit",
    "page_num_sequences" : "pageNumSequenceList",
    "page_num_sequences/new": "pageNumSequenceNew",
    "page_num_sequences/:id/edit": "pageNumSequenceEdit",
    "biblios/:bibID/citations/new": "citationNew",
    "biblios/:bibID/citations/:id/edit": "citationEdit",
    "users" : "userList",
    "users/:id/edit": "userEdit",
    "*notFound": "notFound"
  },
    
  initialize: function(options) {
                      
    // global singleton
    DiBB.Routes.routes = this;
    
    this.graphDashboardURL = options.neo4jDashboard; 
    this.isAdmin = options.isAdmin;     
  },

  biblioSetList: function() {      
    this.loadBiblioSets( _.bind( function(biblioSets) {
      var biblioSetListView = new DiBB.BiblioSetListView( { biblioSets: biblioSets, isAdmin: this.isAdmin });
      biblioSetListView.render();
    }, this));        
  },
  
  biblioSetNew: function() {
    var biblioSetFormView = new DiBB.BiblioSetFormView();
    biblioSetFormView.render();
  },

  biblioSetEdit: function(biblioSetID) {    
    this.loadBiblioSets( _.bind( function(biblioSets) {
      var biblioSet = biblioSets.get(biblioSetID);
      var biblioSetFormView = new DiBB.BiblioSetFormView( { model: biblioSet } );
      biblioSetFormView.render();
    }, this));
  },
  
  ////////////////////////////////////
  
  bibliographList: function() {
    
    this.loadBibliograph( _.bind( function(bibliographs) {
      var bibliographListView = new DiBB.BibliographListView( { collection: bibliographs, 
                                                                graphDashboardURL: this.graphDashboardURL });
      bibliographListView.render();
    }, this));        
  },
  
  ////////////////////////////////////
  
  publisherList: function() {

    this.loadPublishers( _.bind( function(publishers) {
      var publisherListView = new DiBB.PublisherListView( { publishers: publishers, isAdmin: this.isAdmin });
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
      var personListView = new DiBB.PersonListView( { people: people, isAdmin: this.isAdmin });
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
      var roleListView = new DiBB.RoleListView( { collection: roles, isAdmin: this.isAdmin });
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

  ////////////////////////////////////

  bindingList: function() {

    this.loadBindings( _.bind( function(bindings) {
      var bindingListView = new DiBB.BindingListView( { collection: bindings, isAdmin: this.isAdmin });
      bindingListView.render();
    }, this));
  },

  bindingNew: function() {

    this.loadBindings( _.bind( function(bindings) {
      var bindingFormView = new DiBB.BindingFormView( { collection: bindings } );
      bindingFormView.render();
    }, this));

  },

  bindingEdit: function(roleID) {

    this.loadBindings( _.bind( function(bindings) {
      var bindingFormView = new DiBB.BindingFormView( { collection: bindings, roleID: bindingID } );
      bindingFormView.render();
    }, this));

  },

  ////////////////////////////////////

  formatList: function() {

    this.loadFormats( _.bind( function(formats) {
      var formatListView = new DiBB.FormatListView( { collection: formats, isAdmin: this.isAdmin });
      formatListView.render();
    }, this));
  },

  formatNew: function() {

    this.loadFormats( _.bind( function(formats) {
      var formatFormView = new DiBB.FormatFormView( { collection: formats } );
      formatFormView.render();
    }, this));

  },

  formatEdit: function(formatID) {

    this.loadFormats( _.bind( function(formats) {
      var formatFormView = new DiBB.FormatFormView( { collection: formats, formatID: formatID } );
      formatFormView.render();
    }, this));

  },

  ////////////////////////////////////

  currencyList: function() {

    this.loadCurrencies( _.bind( function(currencies) {
      var currencyListView = new DiBB.CurrencyListView( { collection: currencies, isAdmin: this.isAdmin });
      currencyListView.render();
    }, this));
  },

  currencyNew: function() {

    this.loadCurrencies( _.bind( function(currencies) {
      var currencyFormView = new DiBB.CurrencyFormView( { collection: currencies } );
      currencyFormView.render();
    }, this));

  },

  currencyEdit: function(currencyID) {

    this.loadCurrencies( _.bind( function(currencies) {
      var currencyFormView = new DiBB.CurrencyFormView( { collection: currencies, currencyID: currencyID } );
      currencyFormView.render();
    }, this));

  },

////////////////////////////////////

  pageNumSequenceList: function(biblioID) {

    this.loadPageNumSequences( biblioID, _.bind( function(sequences) {
      var pageNumSequencesListView = new DiBB.PageNumSequencesListView( { collection: sequences, isAdmin: this.isAdmin });
      pageNumSequencesListView.render();
    }, this));
  },

  pageNumSequenceNew: function() {

    this.loadPageNumSequences( _.bind( function(sequences) {
      var pageNumSequencesFormView = new DiBB.PageNumSequencesFormView( { collection: sequences } );
      pageNumSequencesFormView.render();
    }, this));

  },

  pageNumSequenceEdit: function(sequenceID) {

    this.loadPageNumSequences( sequenceID, _.bind( function(sequences) {
      var pageNumSequencesFormView = new DiBB.PageNumSequencesFormView( { collection: sequences, currencyID: sequenceID } );
      pageNumSequencesFormView.render();
    }, this));

  },

  ////////////////////////////////////
    
  citationNew: function(biblioID) {
    
    this.loadCitations( biblioID, _.bind( function(citations) {
      var citationFormView = new DiBB.CitationFormView( { collection: citations } );
      citationFormView.render();
    }, this));        
    
  },

  citationEdit: function(biblioID,citationID) {
    
    this.loadCitations( biblioID, _.bind( function(citations) {
      var citationFormView = new DiBB.CitationFormView( { collection: citations, citationID: citationID } );
      citationFormView.render();
    }, this));        
    
  },
  
  ////////////////////////////////////

  titleList: function() {

    this.loadTitles( _.bind( function(titles) {
      var titleListView = new DiBB.TitleListView( { collection: titles, isAdmin: this.isAdmin });
      titleListView.render();
    }, this));            
  },
  
  titleNew: function() {
    
    this.loadTitles( _.bind( function(titles) {
      var titleFormView = new DiBB.TitleFormView( { collection: titles } );
      titleFormView.render();
    }, this));        
    
  },

  titleEdit: function(titleID) {
    
    this.loadTitles( _.bind( function(titles) {
      var titleFormView = new DiBB.TitleFormView( { collection: titles, titleID: titleID } );
      titleFormView.render();
    }, this));        
    
  },
  
  ////////////////////////////////////

  userList: function() {

    this.loadUsers( _.bind( function(users) {
      var userListView = new DiBB.UserListView( { collection: users });
      userListView.render();
    }, this));            
  },
  
  userEdit: function(userID) {
    
    this.loadUsers( _.bind( function(users) {
      var userFormView = new DiBB.UserFormView( { collection: users, userID: userID } );
      userFormView.render();
    }, this));        
    
  },
  
  ////////////////////////////////////////////////////////////////////////

  loadUsers: function( initView ) {
    var users = new DiBB.UserCollection();
    users.fetch( { success: initView, error: this.onError } );
  },
  
  loadTitles: function( initView ) {
    var titles = new DiBB.TitleCollection();
    titles.fetch( { success: initView, error: this.onError } );
  },
  
  loadCitations: function( biblioID, initView ) {
    var citations = new DiBB.CitationCollection( null, { biblioID: biblioID });
    citations.fetch( { success: initView, error: this.onError } );
  },  
  
  loadRoles: function( initView ) {
    var roles = new DiBB.RoleCollection();
    roles.fetch( { success: initView, error: this.onError } );
  },

  loadBindings: function( initView ) {
    var bindings = new DiBB.BindingCollection();
    bindings.fetch( { success: initView, error: this.onError } );
  },

  loadFormats: function( initView ) {
    var formats = new DiBB.FormatCollection();
    formats.fetch( { success: initView, error: this.onError } );
  },

  loadCurrencies: function( initView ) {
    var currencies = new DiBB.CurrencyCollection();
    currencies.fetch( { success: initView, error: this.onError } );
  },

  loadPageNumSequences: function( biblioID, initView ) {
    var page_num_sequences = new DiBB.PageNumSequenceCollection(null, biblioID);
    page_num_sequences.fetch( { success: initView, error: this.onError } );
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