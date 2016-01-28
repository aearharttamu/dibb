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
