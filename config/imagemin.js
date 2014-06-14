'use strict';

module.exports = {
	options : {
		optimizationLevel : 4,
		progressive : true,
		interlace : true
	},
	all : {
		files : [{
			expand : true,
			cwd : '<%= paths.theme %>/img',
			src : ['**/*.{png,jpg,gif,ico}'],
			dest : '<%= paths.theme %>/imgOpt'
		}]
	}
}; 