module.exports = function(grunt) {
	
	// Set UTF-8 Charset
	grunt.file.defaultEncoding = 'utf8';
	
	// Set our instructions
	grunt.initConfig({
		// Read package.json for instructions on what packages to use
		pkg: grunt.file.readJSON('package.json'),
		copy: [
				// Copy WordPress
				{
					expand: true,
					cwd: 'bower_components',
					src: 'wordpress/**',
					dest: 'app/'
				},
				{
					expand: true,
					cwd: 'bower_components',
					src: 'gutsWordPressTheme/**',
					dest: 'app/wp-content/themes/'
				}			
		],
		clean: {
            wordpress: [
                'app/wordpress/wp-config-sample.php',
                'app/wp-content/plugins/hello.php',
                'app/wp-content/themes/twentyten',
                'app/wp-content/themes/twentyeleven',
                'app/wp-content/themes/twentytwelve'
            ],
			bowerCleanHouse: [
				'bower_components/wordpress'
            ]
		}
	});
	
	// Load grunt packages
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	// Define grunt tasks
	grunt.registerTask ('setupWordPress', function() {
		grunt.file.write("app/index.php", '<?php define(\'WP_USE_THEMES\',true);require(dirname(__FILE__).\'/wordpress/wp-blog-header.php\');');
		grunt.task.run('copy','clean');
	});	
	
	// We want to disable default grunt for now, so provide a nice message
	grunt.registerTask('default', 'My "default" task description.', function() {
		grunt.log.writeln('');
		grunt.log.writeln('********************************************');
		grunt.log.writeln('There are no default tasks in this project.');
		grunt.log.writeln('Open Gruntfile.js to see how Grunt is built.');
		grunt.log.writeln('********************************************');
	});

};
