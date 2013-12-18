module.exports = function(grunt) {
	
	// Set UTF-8 Charset
	grunt.file.defaultEncoding = 'utf8';
	
	// Set our instructions
	grunt.initConfig({
		// Read package.json for instructions on what packages to use
		pkg: grunt.file.readJSON('package.json'),
		// Copy WordPress into the app folder
		copy: [
				// Copy WordPress
				{
					expand: true,
					cwd: 'bower_components',
					src: 'wordpress/**',
					dest: 'app/'
				}
				// Copy wp-content
//				{
//					expand: true,
//					cwd: 'bower_components/wordpress',
//					src: 'wp-content/**',
//					dest: 'app'
//				}
				// includes files within path and its sub-directories
				//{expand: true, src: ['path/**'], dest: 'dest/'},
				
				// makes all src relative to cwd
				//{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
				
				// flattens results to a single level
				//{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
			
		],
		// Remove bower copy of wordpress
		clean: {
            removeWpConfigSample: {
                src: 'app/wordpress/wp-config-sample.php'
            }
//			,bowerCleanHouse: {
//				src: 'bower_components'
//			}
		}
	});
	
	// Load grunt packages
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	// Define grunt tasks
	grunt.registerTask ('setupWordPress', function() {
		//grunt.file.write("app/index.php", '<?php define(\'WP_USE_THEMES\',true);require(dirname(__FILE__).\'/wordpress/wp-blog-header.php\');');
		grunt.task.run('copy','clean');
	});	
	//grunt.registerTask('setupWordPress', ['copy']);
	
	
	// We want to disable default grunt for now, so provide a nice message
	grunt.registerTask('default', 'My "default" task description.', function() {
		grunt.log.writeln('');
		grunt.log.writeln('********************************************');
		grunt.log.writeln('There are no default tasks in this project.');
		grunt.log.writeln('Open Gruntfile.js to see how Grunt is built.');
		grunt.log.writeln('********************************************');
	});

};
