'use strict';

module.exports = {
	files: [
		'Gruntfile.js',
		'<%= paths.theme %>/js/script.js',
		'<%= paths.theme %>/js/script.min.js'
	],
	options: {
		jshintrc: '.jshintrc',
		reporter: 'C:\\xampp\\htdocs\\xysupply.co\\node_modules\\jshint-stylish\\stylish.js'
	}
};