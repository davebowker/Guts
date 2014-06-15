'use strict';

module.exports = {
	publish: {
		files: {
			"./": "app/**"
		},
		options: {
			host: '<%= secret.host %>',
			username: '<%= secret.username %>',
			password: '<%= secret.password %>',
			path: '<%= secret.www_dir %>',
			srcBasePath: "app/",
			showProgress: true
		}
	}
};