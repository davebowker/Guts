module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	copy: {
		main: {
			src: 'bower_components/wordpress',
			dest: 'app/',
		}
	}
  });

  //grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('setupWordPress', ['copy']);

  //grunt.registerTask('default', []);

};
	