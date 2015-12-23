/*globals genreList */
$(document).ready(function() {
	"use strict";
	var body = $("body");

	body.on('change', '#bib-genre', function (e) {
		e.preventDefault();

		$(".genre-pane").removeClass("active");
		var value = $(this).val();
		for (var i = 0; i < genreList.length; i++) {
			if (genreList[i].value === value) {
				var pane = genreList[i].type;
				$("#"+pane).addClass("active");
			}
		}
	});

});
