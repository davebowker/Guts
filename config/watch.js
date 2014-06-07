'use strict';

module.exports = {
	img : {
		files : '<%= paths.theme %>/img/**/*.*',
		tasks : ['imagemin']
	},
	js : {
		files : '<%= paths.theme %>/js/source/*.js',
		tasks : ['uglify:dev', 'jshint']
	},
	livereload : {
		files : ['<%= paths.theme %>/**'],
		options : {
			livereload : true
		}
	},
	php : {
		files : ['<%= paths.theme %>/**/*.php'],
		tasks : ['phplint']
	},
	style : {
		files : ['<%= paths.theme %>/scss/*.scss', '<%= paths.theme %>/scss/**/*.scss'],
		tasks : ['compass:dev', 'autoprefixer', 'csslint', 'replace:imagemin']
	}
}; 