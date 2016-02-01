DiBB.PublisherBloodhound = new Bloodhound({

  remote: {
    url: '/publishers'
  },
  
  queryTokenizer: Bloodhound.tokenizers.whitespace,  

  datumTokenizer: function( datum ) {
    return datum.name.split(" ");
  },
      
  identify: function(datum) {
    return datum.id;
  }  
});
