/*globals genreList */
$(document).ready(function() {
	"use strict";
	var body = $("body");

	body.on('change', '#bib-genre', function (e) {
		e.preventDefault();

		var value = $(this).val();
		for (var i = 0; i < genreList.length; i++) {
			if (genreList[i].value === value) {
				var pane = genreList[i].type;
				$(".genre-pane").removeClass("active");
				$("#"+pane).addClass("active");
			}
		}
	});

});
