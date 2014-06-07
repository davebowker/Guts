'use strict';

module.exports = {
	options : {
		files : ['package.json'],
		updateConfigs : [],
		commit : true,
		commitMessage : 'Release v%VERSION%',
		commitFiles : ['.'],
		createTag : true,
		tagName : 'v%VERSION%',
		tagMessage : 'Version %VERSION%',
		push : false,
		pushTo : 'origin',
		gitDescribeOptions : '--tags --always --abbrev=1 --dirty=-d'
	}
}; 