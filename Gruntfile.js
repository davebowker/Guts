module.exports = function(grunt) {

	// Set UTF-8 Charset
	grunt.file.defaultEncoding = 'utf8';

	// Set our instructions
	grunt.initConfig({
		// Read package.json for instructions on what packages to use
		pkg : grunt.file.readJSON('package.json'),
		copy : {
			// WordPress
			wp : {
				files : [{
					expand : true,
					cwd : 'bower_components',
					src : 'wordpress/**',
					dest : 'app/'
				}, {
					expand : true,
					cwd : 'bower_components/wordpress',
					src : 'wp-content/**',
					dest : 'app/'
				}, {
					expand : true,
					cwd : 'bower_components/wordpress',
					src : 'wp-config-sample.php',
					dest : 'app/'
				}]
			},
			wptheme : {
				files : [{
					expand : true,
					cwd : 'bower_components',
					src : 'gutstheme/**',
					dest : 'app/wp-content/themes'
				}]
			}
		},
		clean : {
			// WordPress
			wp : ['app/wordpress/wp-config-sample.php', 'app/wp-content/plugins/hello.php', 'app/wp-content/themes/twentyten', 'app/wp-content/themes/twentyeleven', 'app/wp-content/themes/twentytwelve']
		},
		compass : {
			dev : {
				options : {
					environment : 'development',
					outputStyle : 'expanded',
					relativeAssets : true,
					basePath : 'app/wp-content/themes/guts',
					cssDir : 'css',
					sassDir : 'sass',
					imagesDir : 'img',
					javascriptsDir : 'js',
					fontsDir : 'font',
					noLineComments : true,
					force : true
				}
			}
		}
	});

	// Load grunt packages
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Define grunt tasks
	grunt.registerTask('wp', function() {
		grunt.file.write("app/index.php", '<?php define(\'WP_USE_THEMES\',true);require(dirname(__FILE__).\'/wordpress/wp-blog-header.php\');');
		grunt.task.run('copy:wp', 'copy:wptheme', 'clean:wp');
	});
	grunt.registerTask('wpsass', 'compass');

	// We want to disable default grunt for now, so provide a nice message
	grunt.registerTask('default', 'My "default" task description.', function() {
		grunt.log.writeln('');
		grunt.log.writeln('********************************************');
		grunt.log.writeln('There are no default tasks in this project.');
		grunt.log.writeln('Open Gruntfile.js to see how Grunt is built.');
		grunt.log.writeln('********************************************');
	});

};
