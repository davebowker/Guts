"use strict";

module.exports = {
	setup: ["app/wordpress/wp-config-sample.php",
		"app/wp-content/plugins/hello.php",
		"app/wp-content/themes/twentyten",
		"app/wp-content/themes/twentyeleven",
		"app/wp-content/themes/twentytwelve"
	],
	imagemin: ["<%= paths.theme %>/imgOpt/"]
};