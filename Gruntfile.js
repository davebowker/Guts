/*
 * TODO:
 * Watch: Only watch for changed files
 * Deploy: Create a dist folder, copy everything across. Minify and link.
 * Deploy: Automatic deployments (Capistrano?)
 * Q&A: Ask for name of theme. Use that variable for creating folders etc. (pkg.name)
 * Test Server: Use grunt-contrib-server to create a local server
 * Bower: Why does is not copy everything? (Bower main?)
 * Compass: Load susy and bourbon
 * Generate a list of 'patch files' for wp-config, and to add into functions.php (eg, load css/js/favicon)
 * Img sprite generation
 * Ask to generate GA code. FBOG. Google Plus Authors. Create a (template) file for the user to use, or automatically insert it
 *
 * TODO: (Optimisation)
 * Better setup. Make it the grunt default task.
 *
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	/*
	 * Load grunt tasks
	 */
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	/*
	 * Define variables and set global options
	 */
	var options = {
		pkg : grunt.file.readJSON('package.json'),
		//banner : '/*! \n Name:\t\t\t<%= pkg.name %> \n Version:\t\t<%= pkg.version %> \n Updated:\t\t<%= grunt.template.today("yyyy-mm-dd hh:mm") %> \n Author:\t\t<%= pkg.author %> \n Author URL:\t<%= pkg.author_url %> \n Issues:\t\t<%= pkg.bugs.url %> \n*/\n',
		paths : {
			app : 'app/',
			theme : 'app/wp-content/themes/gutsThemeStarter/'
		},
		ports : {
			app : '9000',
			test : '9001',
			livereload : '35729'
		}
	};

	/*
	 * Load grunt configs
	 */
	var configs = require('load-grunt-configs')(grunt, options);
	grunt.initConfig(configs);

	/*
	* TODO: Grunt setup a server
	*/
	// grunt.registerTask('serve', function(target) {
	// if (target === 'dist') {
	// return grunt.task.run(['build', 'connect:dist:keepalive']);
	// }
	// grunt.task.run(['clean:server', 'concurrent:server', 'autoprefixer', 'connect:livereload', 'watch']);
	// });
	
	/*
	 * Development focused tasks
	 */
	grunt.registerTask('dev', function () {
		grunt.log.subhead('Running development tasks');
		grunt.task.run([
			'compass:dev',
			'autoprefixer',
			'uglify:dev'
		]);
	});

	/*
	 * Production focused tasks
	 */
	grunt.registerTask('prod', [
		'compass:prod'
	]);
	

	/*
	 * Initial project setup
	 */
	grunt.registerTask('default', function() {
		grunt.file.write("app/index.php", '<?php define(\'WP_USE_THEMES\',true);require(dirname(__FILE__).\'/wordpress/wp-blog-header.php\');');
		grunt.task.run([
			'bower:setup',
			'copy:setup',
			'copy:js',
			'replace:setup',
			'clean:setup'
		]);
		grunt.log.oklns('********************************************');
		grunt.log.oklns('Guts has done the following tasks:');
		grunt.log.oklns('Installed bower components');
		grunt.log.oklns('Written code to your app/wp-config-sample.php file which points to the app/wp-content/ directory outside of the wordpress folder.');
		grunt.log.oklns('Written app/index.php which tells wordpress that it is in a subdirectory');
		grunt.log.oklns('********************************************');
	});
};
