/*
 * TODO:
 * 1) Deploy script to deploy only the app directory
 * 2) Image Compression
 * 3) JS concat
 * 4) CSS + JS Lint
 * 5) Watch for js
 * 6) For deploy, do not delete the wp-config-sample but rather do not upload it to production server. MAKE AN AWESOME BUILD FILE.
 * 7) In the watch task, can we pick up the file names/options from the tasks above?? EG. files: ['<%= jshint.files %>']
 * 8) grunt contrib server
 * 9)
 */

module.exports = function(grunt) {

	// Set UTF-8 Charset
	grunt.file.defaultEncoding = 'utf8';

	// Load grunt packages
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Set our instructions
	grunt.initConfig({
		/*
		 * Set up variables for a more gruntier grunt.
		 */
		pkg : grunt.file.readJSON('package.json'),
		pathToTheme : 'app/wp-content/themes/gutsThemeStarter',

		/*
		 * Auto prefix CSS with browser variations (eg, -moz-, -webkit-)
		 */
		autoprefixer : {
			options : {
				browsers : ['last 2 versions', '> 1%', 'ie 8', 'ie 9']
			},
			dev : {
				options : {
					// Target-specific options go here.
				},
				src : '<%= pathToTheme %>/style.css',
				dest : '<%= pathToTheme %>/style.css'
			}
		},
		
		copy : {
			// WordPress
			setup : {
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
			setup : ['app/wordpress/wp-config-sample.php', 'app/wp-content/plugins/hello.php', 'app/wp-content/themes/twentyten', 'app/wp-content/themes/twentyeleven', 'app/wp-content/themes/twentytwelve']
			//wpconfig: ['app/wp-config-sample.php']
		},
		compass : {
			dev : {
				options : {
					environment : 'development',
					outputStyle : 'expanded',
					relativeAssets : true,
					basePath : '<%= pathToTheme %>',
					cssDir : '.', // '.' is the same folder level
					sassDir : 'scss',
					imagesDir : 'img',
					javascriptsDir : 'js',
					fontsDir : 'font',
					noLineComments : true,
					force : true
				}
			},
			/*
			 * TODO: Update production settings
			 */
			production : {
				options : {
					environment : 'production',
					outputStyle : 'compressed',
					relativeAssets : false,
					basePath : '<%= pathToTheme %>',
					cssDir : '',
					sassDir : 'scss',
					imagesDir : 'img',
					javascriptsDir : 'js',
					fontsDir : 'font',
					noLineComments : true,
					force : true
				}
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'<%= pathToTheme %>/js/source/*.js'
				],
				dest: '<%= pathToTheme %>/js/script.js'
			}
		},
		/*
		 * TODO: Target all js files
		 */
		jshint : {
			files : [
				'Gruntfile.js',
				'<%= pathToTheme %>/js/script.js',
				'<%= pathToTheme %>/js/script.min.js'
			],
			options: {
				reporter: require('jshint-stylish'),
				globals: {
					jQuery: true,
					console: true,
					module: true
				},
				lastsemic: true
			}
		},
		// Dynamically add necessary paths to wp-config.php. You will need to edit this.
		replace : {
			setup : {
				src : ['app/wp-config-sample.php'],
				overwrite : true,
				//dest: 'app/wp-config.php',
				replacements : [{
					from : '<?php',
					to : function(matchedWord) {// callback replacement
						//return matchedWord;
						var phpTag = matchedWord + '\n\n\n';
						var prewrap1 = "/***** Dynamicaly generated from Gruntfile.js *****/ \n";
						var prewrap2 = "/***** You may need to update the path to your project *****/ \n";
						var wp_home = "define('WP_HOME',    'http://' . $_SERVER['SERVER_NAME'] . '/app'); \n";
						var wp_siteurl = "define('WP_SITEURL', 'http://' . $_SERVER['SERVER_NAME'] . '/app/wordpress'); \n";
						var wp_content_dir = "define('WP_CONTENT_DIR', $_SERVER['DOCUMENT_ROOT'] . '/app/wp-content'); \n";
						var wp_content_url = "define('WP_CONTENT_URL', 'http://' . $_SERVER['SERVER_NAME'] . '/app/wp-content'); \n";
						var disallowFileEdit = "define('DISALLOW_FILE_EDIT', true); \n";
						var compressCSS = "define('COMPRESS_CSS', true); \n";
						var compressScripts = "define('COMPRESS_SCRIPTS', true); \n";
						var concatenateScripts = "define('CONCATENATE_SCRIPTS', true); \n";
						var enforceGZIP = "define('ENFORCE_GZIP', true); \n";
						var postwrap = "/***** End Gruntfile.js inserts *****/ \n\n\n";
						return [phpTag + prewrap1 + prewrap2 + wp_home + wp_siteurl + wp_content_dir + wp_content_url + disallowFileEdit + compressCSS + compressScripts + concatenateScripts + enforceGZIP + postwrap];
					}
				}]
			}
		},
		/*
		 * TODO: Understand this!
		 * Queue up all files
		 */
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:mm") %> */\n',
				compress : {
					drop_console : true
				},
				mangle : {
					except : ['jQuery', 'Backbone']
				}
			},
			dev : {
				options : {
					beautify : true
				},
				files : {
					'<%= pathToTheme %>/js/script.js' : ['<%= pathToTheme %>/js/source/*.js']
				}
			},
			prod : {
				files : {
					'<%= pathToTheme %>/js/script.min.js' : ['<%= pathToTheme %>/js/source/*.js']
				}
			}
		},
		/*
		 * TODO: Compile js files and compress images
		 */
		watch : {
			// Watch our scss files and auto compile them
			style : {
				files : ['<%= pathToTheme %>/scss/*.scss', '<%= pathToTheme %>/scss/**/*.scss'],
				tasks : ['compass:dev', 'autoprefixer:dev'],
				options : {
					livereload : true
				}
			},
			/*
			* TODO: This needs a 'files' attribute. Need to load in jshint first.
			*/
			js : {
				files: '<%= pathToTheme %>/js/source/*.js',
				tasks : [
					'uglify',
					'jshint'
				]
			},
			// Watch our files for any changes, then automatically reload the page
			// Requires livereload chrome extension, or equivalent
			livereload : {
				files : ['<%= pathToTheme %>/css/**.*', '<%= pathToTheme %>/**'],
				options : {
					livereload : true
				}
			}
		}
	});

	/*
	* Define Grunt Tasks
	*/

	// Set up wordpress, copy across wp-content and create index.php and wp-config-sample.php
	grunt.registerTask('setup', function() {
		grunt.file.write("app/index.php", '<?php define(\'WP_USE_THEMES\',true);require(dirname(__FILE__).\'/wordpress/wp-blog-header.php\');');
		grunt.task.run('copy:setup', 'replace:setup', 'clean:setup');
		grunt.log.oklns('********************************************');
		grunt.log.oklns('Guts has done the following tasks:');
		grunt.log.oklns('1) Written code to your app/wp-config-sample.php file which points to the app/wp-content/ directory outside of the wordpress folder.');
		grunt.log.oklns('2) Written app/index.php which tells wordpress that it is in a subdirectory');
		grunt.log.oklns('********************************************');
	});

	// Compile styles, and watch for changes
	grunt.registerTask('style', ['compass:dev', 'autoprefixer:dev']);

	grunt.registerTask('watcher', ['watch']);

	grunt.registerTask('production', function() {
		grunt.task.run('compass:production');
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
