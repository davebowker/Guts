'use strict';

module.exports = {
	staging : {
		auth : {
			host : '<%= secret.staging.host %>',
			port : '<%= secret.staging.port %>',
			authKey : 'dh-admin'
		},
		src : '<%= paths.app %>',
		dest : '<%= secret.staging.www_dir %>'
	},
	prod : {
		auth : {
			host : '<%= secret.prod.host %>',
			port : '<%= secret.prod.port %>',
			authKey : 'dh-admin'
		},
		src : '<%= paths.app %>',
		dest : '<%= secret.prod.www_dir %>'
	}
};
