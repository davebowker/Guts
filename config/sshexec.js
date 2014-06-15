'use strict';

module.exports = {
	uptime: {
		command: 'uptime',
		options: {
			host: '<%= secret.host %>',
			username: '<%= secret.username %>',
			password: '<%= secret.password %>'
		}
	}
};