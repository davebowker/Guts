'use strict';

module.exports = {
	setup : {
		src : ['app/wp-config-sample.php'],
		overwrite : true,
		replacements : [{
			from : '<?php',
			to : [Function]
		}]
	},
	imagemin : {
		src : ['<%= paths.theme %>/style.css'],
		overwrite : true,
		replacements : [{
			from : 'img/',
			to : 'imgOpt/'
		}]
	}
}; 