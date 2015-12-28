/*globals DiBB, genreList */
$(document).ready(function() {
	"use strict";

	DiBB.helpers = {};

	DiBB.helpers.formatGenre = function(genreValue, otherGenre) {
		// genreValue is an enum of the different genres. Find the friendly text for it.
		// if it is "other", then we stored the genre name in otherGenre.
		// it may also be blank if it is not filled in yet.
		if (genreValue === 'other')
			return otherGenre;

		for (var i = 0; i < genreList.length; i++) {
			var g = genreList[i];
			if (g.value === genreValue) {
				return g.text;
			}
		}
		return genreValue;
	};
});
