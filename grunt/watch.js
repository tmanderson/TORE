'use strict';

module.exports = {
	injectJS: {
		files: [
			'examples/angular/src/**/*.js',
			'!examples/angular/src/app.js'
		],
		tasks: ['injector:scripts']
	}
};
