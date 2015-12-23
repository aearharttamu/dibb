$(document).ready(function() {
	"use strict";
	var body = $("body");

	body.on('click', '.single-item a', function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	body.on('hide.bs.tab', '.single-item a', function (e) {
		console.log("TODO: tab changed: save object here.");
	});
});
