/*
 * TODO:
 * Q&A: Ask for name of theme. Use that variable for creating folders etc. (pkg.name)
 * Bower: Why does is not copy everything? (Bower main?)
 * Compass: Load susy and bourbon
 * Generate a list of "patch files" for wp-config, and to add into functions.php (eg, load css/js/favicon)
 * Img sprite generation
 * Ask to generate GA code. FBOG. Google Plus Authors. Create a (template) file for the user to use, or automatically insert it
 * Grunt run composer to get PHP plugins, move into plugin dir
 * Grunt prompt to run setup:
 * 	Author
 * 	Email
 * 	Theme Name
 * 	FTP Details
 * 	ETC...
 * FTP deploy only the newer files.
 * Grunt generate a .htdocs file making sure /app works
 * Grunt create a template secret.json, .ftppass file
 * Grunt skip copying over parent themes -- use _S and create all dirs needed.
 * Create a wp-config file for local and server side dev -- made from answers to prompts
 * Upload a gzipped file, and then unzip it on the server
 * Create a local and a server side wp-config file
 * Call the domain name .local
 */

"use strict";

module.exports = function(grunt) {

	/*
	 * Load grunt tasks
	 */
	require("load-grunt-tasks")(grunt);
	require("time-grunt")(grunt);

	/*
	 * Define variables and set global options
	 */
	var options = {
		secretjson : grunt.config('secret'),
		pkg : grunt.file.readJSON("package.json"),
		secret: grunt.file.readJSON('secret.json'),
		banner : "/*! \n Name:\t\t\t<%= pkg.name %> \n Version:\t\t<%= pkg.version %> \n Updated:\t\t<%= grunt.template.today(\"yyyy-mm-dd hh:mm\") %> \n Author:\t\t<%= pkg.author.name %> \n Author URL:\t<%= pkg.author.url %> \n Issues:\t\t<%= pkg.bugs.url %> \n*/\n",
		paths : {
			app : "app",
			theme : "app/wp-content/themes/gutsThemeStarter"
		}
	};

	/*
	 * Load grunt configs
	 */
	var configs = require("load-grunt-configs")(grunt, options);
	grunt.initConfig(configs);
	
	/*
	 * Development focused tasks
	 */
	grunt.registerTask("dev", function () {
		grunt.log.subhead("Running development tasks");
		grunt.task.run([
			"compass:dev",
			"autoprefixer",
			"csslint",
			"uglify:dev",
			"jshint",
			"phplint"
		]);
	});
	
	/*
	 * Production focused tasks
	 */
	grunt.registerTask("prod", function () {
		grunt.log.subhead("Running production tasks");
		grunt.task.run([
			"imagemin",
			"compass:prod",
			"replace:imagemin",
			"autoprefixer",
			"uglify:prod",
			"usebanner:prod",
			"bump"
		]);
	});

	/*
	 * Initial project setup
	 */
	grunt.registerTask("default", function() {
		grunt.log.subhead("Running project setup tasks");
		grunt.file.write("app/index.php", "<?php define(\"WP_USE_THEMES\",true);require(dirname(__FILE__).\"/wordpress/wp-blog-header.php\");");
		grunt.task.run([
			"bower:setup",
			"copy:setup",
			"replace:setup",
			"clean:setup"
		]);
	});
};
