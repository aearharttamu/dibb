
// application namespace
var DiBB = {};

// application main
$(document).ready(function() {
  
  var routes = new DiBB.Routes(DiBBSettings);
  Backbone.history.start();
  
});