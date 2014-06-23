'use strict';

module.exports = {
	dev : {
		options : {
			browsers : ['last 2 versions', '> 1%', 'ie 8', 'ie 9'],
			cascade : true
		},
		src : '<%= paths.theme %>/style.css'
	}
};
