requirejs.config({
	paths: {
		jquery: '/lib/jquery/dist/jquery',
		underscore: '/lib/underscore/underscore',
		backbone: '/lib/backbone/backbone'
	},

	shim: {
		backbone: {
			deps: [ 'jquery', 'underscore' ]
		}	
	},

	deps: [ 'jquery', 'underscore', 'backbone' ]
});

google.setOnLoadCallback(require.bind(require, ['util/jquery', 'main']));