"use strict";

module.exports = {
	img : {
		files : "<%= paths.theme %>/img/**/*.*",
		tasks : ["newer:imagemin"]
	},
	js : {
		files : "<%= paths.theme %>/js/source/*.js",
		tasks : ["newer:uglify:dev", "newer:jshint"]
	},
	livereload : {
		files : ["<%= paths.theme %>/**"],
		options : {
			livereload : true
		}
	},
	php : {
		files : ["<%= paths.theme %>/**/*.php"],
		tasks : ["newer:phplint"]
	},
	style : {
		files : ["<%= paths.theme %>/scss/**/*.scss"],
		tasks : ["compass:dev", "autoprefixer", "replace:imagemin", "csslint"]
	}
};
