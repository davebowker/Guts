"use strict";

module.exports = {
	prod : {
		options : {
			position : "top",
			banner : "<%= banner %>",
			linebreak : true
		},
		files : {
			src : [
				"<%= paths.theme %>/js/*.js",
				"<%= paths.theme %>/style.css"
			]
		}
	}
}; 