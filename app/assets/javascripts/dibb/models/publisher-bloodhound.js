DiBB.PublisherBloodhound = new Bloodhound({

  remote: {
    url: '/publishers'
  },
  
  queryTokenizer: Bloodhound.tokenizers.whitespace,  
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
  
  identify: function(datum) {
    return datum.id;
  }  
});

DiBB.PublisherBloodhound.getModel = function( id ) {
  var publisher;
  if( id ) {
    var datum = this.get( [id] );
    publisher = new DiBB.Publisher(datum);
  } else {
    publisher =  new DiBB.Publisher();
  }
  return publisher;
};
