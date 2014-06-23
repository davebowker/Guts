"use strict";

module.exports = {
	files: [
		"config/*",
		"Gruntfile.js",
		"<%= paths.theme %>/js/script.js",
		"<%= paths.theme %>/js/script.min.js"
	],
	options: {
		jshintrc: ".jshintrc",
    	reporter: require('jshint-stylish')
	}
};