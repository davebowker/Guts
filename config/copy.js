"use strict";

module.exports = {
	setup : {
		files : [{
			expand : true,
			cwd : "app/wordpress",
			src : "wp-content/**",
			dest : "app"
		}, {
			expand : true,
			cwd : "app/wordpress",
			src : "wp-config-sample.php",
			dest : "app"
		}, {
			expand : true,
			src : ["bower_components_grunt/jquery/jquery.js", "bower_components_grunt/hashgrid/hashgrid.js", "bower_components_grunt/modernizr/modernizr.js"],
			dest : "<%= paths.theme %>/js/vendor",
			filter : "isFile",
			flatten : true
		}]
	}
};