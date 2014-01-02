module.exports = function(grunt) {

	// Set UTF-8 Charset
	grunt.file.defaultEncoding = 'utf8';
	
	// Load grunt packages
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Set our instructions
	grunt.initConfig({
		// Read package.json for instructions on what packages to use
		pkg : grunt.file.readJSON('package.json'),
		copy : {
			// WordPress
			wp : {
				files : [{
					expand : true,
					cwd : 'app/wordpress',
					src : 'wp-content/**',
					dest : 'app'
				}, {
					expand : true,
					cwd : 'app/wordpress',
					src : 'wp-config-sample.php',
					dest : 'app'
				}]
			}
		},
		clean : {
			// WordPress
			wp : ['app/wordpress/wp-config-sample.php', 'app/wp-content/plugins/hello.php', 'app/wp-content/themes/twentyten', 'app/wp-content/themes/twentyeleven', 'app/wp-content/themes/twentytwelve']
		},
		compass : {
			wp : {
				options : {
					environment : 'development',
					outputStyle : 'expanded',
					relativeAssets : true,
					basePath : 'app/wp-content/themes/gutsThemeStarter',
					cssDir : 'css',
					sassDir : 'sass',
					imagesDir : 'img',
					javascriptsDir : 'js',
					fontsDir : 'font',
					noLineComments : true,
					force : true
				}
			}
		},
		watch: {
			// Watch our sass files and auto compile them
			wp: {					
				files: ['app/wp-content/themes/gutsThemeStarter/sass/**.*'],
				tasks: ['compass:wp']
			},
			// Watch our js files and auto compile them
			// js: {
				// files: ['assets/js/main.js', 'components/**/*.js'],
				// tasks: ['uglify']
			// },
			// Watch our files for any changes, then automatically reload the page
			// Requires livereload chrome extension, or equivalent
			livereload: {
				files: ['app/wp-content/themes/gutsThemeStarter/css/*.*'],
				options: {
					livereload: true
				}
			}
		},
		replace: {
			wpconfig: {
				src: ['app/wp-config.php'],
				overwrite: true,
				//dest: 'app/wp-config.php',
				replacements: [{
					from: '<?php',
					to: function (matchedWord) {   // callback replacement
						//return matchedWord;
						var phpTag = matchedWord + '\n\n\n';
						var prewrap1 = "/***** Dynamicaly generated from Gruntfile.js *****/ \n"
						var prewrap2 = "/***** You may need to update the path to your project *****/ \n"
					    var wp_home = "define('WP_HOME',    'http://' . $_SERVER['SERVER_NAME'] . '/eikoncodex.com/app'); \n"; 
					    var wp_siteurl = "define('WP_SITEURL', 'http://' . $_SERVER['SERVER_NAME'] . '/eikoncodex.com/app/wordpress'); \n";
					    var wp_content_dir = "define('WP_CONTENT_DIR', $_SERVER['DOCUMENT_ROOT'] . '/eikoncodex.com/app/wp-content'); \n";
					    var wp_content_url = "define('WP_CONTENT_URL', 'http://' . $_SERVER['SERVER_NAME'] . '/eikoncodex.com/app/wp-content'); \n";
						var postwrap = "/***** End Gruntfile.js inserts *****/ \n\n\n"	    
					    return [phpTag + prewrap1 + prewrap2 + wp_home + wp_siteurl + wp_content_dir + wp_content_url + postwrap];
					}
				}]
			}
		}
	});

	/*
	 * Define Grunt Tasks
	 */
	// Set up wordpress, copy across wp-content and create index.php and wp-config-sample.php
	grunt.registerTask('wp', function() {
		grunt.file.write("app/index.php", '<?php define(\'WP_USE_THEMES\',true);require(dirname(__FILE__).\'/wordpress/wp-blog-header.php\');');
		grunt.task.run('copy:wp', 'clean:wp');
	});
	// Compile styles, and watch for changes
	grunt.registerTask('wpsass', ['compass:wp', 'watch:wp']);
	// Dynamically add necessary paths to wp-config.php. You will need to edit this.
	grunt.registerTask('wpconfig', function() {
		grunt.task.run('replace:wpconfig');
		grunt.log.write('Guts has dynamically added new lines to the top of your wp-config.php file in the app folder. You will need to edit these lines. Please do this now./');
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
