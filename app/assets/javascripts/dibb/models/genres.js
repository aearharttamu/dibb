DiBB.Genres = {
  
  genres: [  
  	{ text: "Print Monograph", value: "print-monograph", list: false, type: "monograph" },
  	{ text: "Digital Monograph", value: "digital-monograph", list: false, type: "monograph" },
  	{ text: "Print Serial", value: "print-serial", list: true, type: "serial" },
  	{ text: "Digital Serial", value: "digital-serial", list: true, type: "serial" },
  	{ text: "Print Volume", value: "print-volume", list: true, type: "volume" },
  	{ text: "Digital Volume", value: "digital-volume", list: true, type: "volume" },
  	{ text: "Other", value: "other", list: false, type: "other"}
  ],

  getGenre: function( genreID ) {
    var i = _.findIndex( DiBB.Genres.genres, function(genre) {
      return (genre.value == genreID);     
    });
    
    return DiBB.Genres.genres[i];
  }
  
};
