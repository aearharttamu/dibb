DiBB.PublisherBloodhound = new Bloodhound({

  remote: {
    url: '/publishers'
  },
  
  identify: function(datum) {
    return datum.id;
  },
  
  queryTokenizer: Bloodhound.tokenizers.whitespace,  
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label')

});
