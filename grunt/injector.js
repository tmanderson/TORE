'use strict';

module.exports = {
	options: {},

  	// Inject application script files into index.html (doesn't include bower)
  	scripts: {
		options: {
	  		transform: function(filePath) {
				filePath = filePath.replace('/examples/angular', '');
				return '<script src="' + filePath + '"></script>';
	  		},
	  		starttag: '<!-- injector:js -->',
	  		endtag: '<!-- endinjector -->'
		},
		files: {
	 		'examples/angular/index.html': [
		 		[
		 			'examples/angular/src/**/*.js',
		   			'!examples/angular/src/app.js'
		   		]
			]
		}
 	}
};
