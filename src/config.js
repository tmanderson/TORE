requirejs.config({
	paths: {
		jquery: '/lib/jquery/dist/jquery',
		underscore: '/lib/underscore/underscore',
		backbone: '/lib/backbone/backbone',
		text: '/lib/requirejs-text/text',
		moment: '/lib/moment/moment'
	},

	shim: {
		backbone: {
			deps: [ 'jquery', 'underscore' ]
		}	
	},

	deps: [ 'jquery', 'underscore', 'backbone', 'moment' ]
});

google.setOnLoadCallback(require.bind(require, ['util/jquery', 'main']));