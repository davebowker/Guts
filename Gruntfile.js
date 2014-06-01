/*
 * TODO:
 * Watch: Only watch for changed files
 * Deploy: Create a dist folder
 * Deploy: Automatic deployments (Capistrano?)
 * Q&A: Ask for name of theme. Use that variable for creating folders etc.
 * Test Server: Use grunt-contrib-server to create a local server
 * Bower: Why does is not copy everything? (Bower main?)
 * Compass: Load susy and bourbon
 * 
 * 
 * 11) Grunt auto install and copy over and make sure all the folders are copied as well
 *
 *
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
				browsers : ['last 2 versions', '> 1%', 'ie 8', 'ie 9'],
				src : '<%= pathToTheme %>/style.css',
				dest : '<%= pathToTheme %>/style.css'
			}
		},
		bower : {
			setup : {
				options : {
					cleanBowerDir : true,
					cleanTargetDir : true,
					targetDir : 'bower_components_grunt',
					layout : 'byComponent',
					install : true,
					verbose : true,
					bowerOptions : {}
				}
			}
		},
		clean : {
			// WordPress
			setup : ['app/wordpress/wp-config-sample.php', 'app/wp-content/plugins/hello.php', 'app/wp-content/themes/twentyten', 'app/wp-content/themes/twentyeleven', 'app/wp-content/themes/twentytwelve'],
			imagemin: ['<%= pathToTheme %>/imgOpt/']
			//wpconfig: ['app/wp-config-sample.php']
		},
		csslint : {
			files : ['<%= pathToTheme %>/style.css'],
			options : {
				csslintrc : '.csslintrc'
			}
		},
		compass : {
			options : {
				//importPath : 'app/wp-content/themes/*',
				basePath : '<%= pathToTheme %>',
				cssDir : '.', // '.' is the same folder level
				sassDir : 'scss',
				imagesDir : 'img',
				javascriptsDir : 'js',
				fontsDir : 'font'
			},
			dev : {
				options : {
					environment : 'development',
					outputStyle : 'expanded',
					relativeAssets : true,
					force : true
				}
			},
			/*
			 * TODO: Update production settings
			 */
			prod : {
				options : {
					environment : 'production',
					outputStyle : 'compressed',
					relativeAssets : false,
					noLineComments : true,
					force : true
				}
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
			},
			js : {
				files : [{
					expand : true,
					src : ['bower_components_grunt/jquery/jquery.js', 'bower_components_grunt/hashgrid/hashgrid.js', 'bower_components_grunt/modernizr/modernizr.js'],
					dest : '<%= pathToTheme %>/js/vendor',
					filter : 'isFile',
					flatten : true
				}]
			}
		},
		imagemin : {
			options : {
				optimizationLevel : 4,
				progressive : true,
				interlace : true,
				cache : false
			},
			dynamic : {
				files : [{
					expand : true,
					cwd : '<%= pathToTheme %>/img',
					src : ['**/*.{png,jpg,gif,ico}'],
					dest : '<%= pathToTheme %>/imgOpt'
				}]
			}
		},
		/*
		 * TODO: Target all js files
		 */
		jshint : {
			files : ['Gruntfile.js', '<%= pathToTheme %>/js/script.js', '<%= pathToTheme %>/js/script.min.js'],
			options : {
				jshintrc : '.jshintrc',
				reporter : require('jshint-stylish')
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
			},
			imagemin : {
				src : ['<%= pathToTheme %>/style.css'],
				overwrite : true,
				replacements : [{
					from : 'img/',
					to : 'imgOpt/'
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
					'<%= pathToTheme %>/js/script.js' : ['<%= pathToTheme %>/js/source/*.js'],
					'<%= pathToTheme %>/js/vendor.js' : ['<%= pathToTheme %>/js/vendor/*.js']
				}
			},
			prod : {
				files : {
					'<%= pathToTheme %>/js/script.min.js' : ['<%= pathToTheme %>/js/source/*.js'],
					'<%= pathToTheme %>/js/vendor.min.js' : ['<%= pathToTheme %>/js/vendor/*.js']
				}
			}
		},
		/*
		 * TODO: Compile js files and compress images
		 */
		watch : {
			img : {
				files : '<%= pathToTheme %>/img/**/*.*',
				tasks : ['imagemin']
			},
			js : {
				files : '<%= pathToTheme %>/js/source/*.js',
				tasks : ['uglify', 'jshint']
			},
			// Catch all for content updates
			livereload : {
				files : ['<%= pathToTheme %>/**'],
				options : {
					livereload : true
				}
			},
			// Watch for SCSS changes
			style : {
				files : ['<%= pathToTheme %>/scss/*.scss', '<%= pathToTheme %>/scss/**/*.scss'],
				tasks : ['compass:dev', 'autoprefixer', 'csslint', 'replace:imagemin']
			}
		}
	});

	/*
	* Define Grunt Tasks
	*/

	// Set up wordpress, copy across wp-content and create index.php and wp-config-sample.php
	grunt.registerTask('setup', function() {
		grunt.file.write("app/index.php", '<?php define(\'WP_USE_THEMES\',true);require(dirname(__FILE__).\'/wordpress/wp-blog-header.php\');');
		grunt.task.run('bower:setup', 'copy:setup', 'copy:js', 'replace:setup', 'clean:setup');
		grunt.log.oklns('********************************************');
		grunt.log.oklns('Guts has done the following tasks:');
		grunt.log.oklns('Installed bower components');
		grunt.log.oklns('Written code to your app/wp-config-sample.php file which points to the app/wp-content/ directory outside of the wordpress folder.');
		grunt.log.oklns('Written app/index.php which tells wordpress that it is in a subdirectory');
		grunt.log.oklns('********************************************');
	});

	// Compile styles, and watch for changes
	grunt.registerTask('style', ['compass:dev', 'autoprefixer']);

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
