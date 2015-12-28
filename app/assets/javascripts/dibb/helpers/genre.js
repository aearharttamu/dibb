/*globals genreList */
$(document).ready(function() {
	"use strict";
	var body = $("body");

	function otherGenre(show) {
		var label = $("label[for=bib-other-genre]");
		var control = $("#bib-other-genre").closest(".field-wrapper");
		if (show) {
			label.show();
			control.show();
		} else {
			label.hide();
			control.hide();
		}
	}

	body.on('change', '#bib-genre', function (e) {
		e.preventDefault();

		$(".genre-pane").removeClass("active");
		var value = $(this).val();
		otherGenre(value === 'other');
		for (var i = 0; i < genreList.length; i++) {
			if (genreList[i].value === value) {
				var pane = genreList[i].type;
				$("#"+pane).addClass("active");
				return;
			}
		}
	});

});
