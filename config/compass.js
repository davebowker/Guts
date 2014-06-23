"use strict";

module.exports = {
	options : {
		basePath : "<%= paths.theme %>",
		cssDir : ".",
		sassDir : "scss",
		imagesDir : "img",
		javascriptsDir : "js",
		fontsDir : "font"
	},
	dev : {
		options : {
			environment : "development",
			outputStyle : "expanded",
			relativeAssets : true,
			force : true
		}
	},
	prod : {
		options : {
			environment : "production",
			outputStyle : "compressed",
			relativeAssets : false,
			noLineComments : true,
			force : true
		}
	}
}; 