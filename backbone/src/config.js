requirejs.config({
	paths: {
		jquery: '/bower_components/jquery/dist/jquery',
		underscore: '/bower_components/underscore/underscore',
		backbone: '/bower_components/backbone/backbone',
		text: '/bower_components/requirejs-text/text',
		moment: '/bower_components/moment/moment'
	},

	shim: {
		backbone: {
			deps: [ 'jquery', 'underscore' ]
		}	
	},

	deps: [ 'jquery', 'underscore', 'backbone', 'moment' ]
});

google.setOnLoadCallback(require.bind(require, ['main']));
