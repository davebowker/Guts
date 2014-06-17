'use strict';

module.exports = {
	prod : {
			auth : {
				host : '<%= secret.host %>',
				port : '<%= secret.port %>',
				authKey : 'dh-admin'
			},
			src : '<%= paths.app %>',
			dest : '<%= secret.www_dir %>'
		}
	
};
