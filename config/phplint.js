'use strict';

module.exports = {
	options : {
		phpCmd : 'c:/xampp/php/php.exe',
		phpArgs : {
			'-l' : null
		},
		spawnLimit : 10
	},
	all : [
		'<%= paths.theme %>/**/*.php'
	]
}; 