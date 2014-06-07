'use strict';

module.exports = {
	dev : {
		options : {
			beautify : true,
			mangle: false,
			preserveComments: 'all',
	        sourceMap: true,
	        sourceMapName: '<%= paths.theme %>/js/js.map'
		},
		files : {
			'<%= paths.theme %>/js/script.js' : ['<%= paths.theme %>/js/source/*.js'],
			'<%= paths.theme %>/js/vendor.js' : ['<%= paths.theme %>/js/vendor/*.js']
		}
	},
	prod : {
		options : {
			compress : {
				drop_console : true
			},
			mangle : {
				except : ['jQuery', 'Backbone']
			},
			preserveComments: 'false',
	        sourceMap: true,
	        sourceMapName: '<%= paths.theme %>/js/js.min.map'
		},
		files : {
			'<%= paths.theme %>/js/script.min.js' : ['<%= paths.theme %>/js/source/*.js'],
			'<%= paths.theme %>/js/vendor.min.js' : ['<%= paths.theme %>/js/vendor/*.js']
		}
	}
}; 