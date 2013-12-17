module.exports = function(grunt) {
	
	grunt.initConfig({
		// Read package.json for instructions on what packages to use
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			moveWordPress: {
				src: 'wordpress/*',
				dest: 'app/',
				expand: true,
				cwd: 'bower_components'
			}
		}
	});
	
	// Load grunt packages
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	// Define grunt tasks
	grunt.registerTask('setupWordPress', ['copy']);
	
	// We want to disable default grunt for now
	//grunt.registerTask('default', []);

};
