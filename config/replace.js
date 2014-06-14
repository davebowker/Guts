'use strict';

module.exports = {
	setup : {
		src : ['app/wp-config-sample.php'],
		overwrite : true,
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
		src : ['<%= paths.theme %>/style.css'],
		overwrite : true,
		replacements : [{
			from : 'img/',
			to : 'imgOpt/'
		}]
	}
}; 