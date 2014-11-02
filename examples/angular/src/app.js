'use strict';

angular
	.module('TORE', [
		'ui.router'
	])

	.constant('_', window._)

	.config(function ($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([ /.*/ ]);
	});

	// var GR_PUB_KEY = 'gRN7byT0kn0PEJd8yIpGxw';
	// var GR_SEC_KEY = 'dTTIAL2Vlo5JJ5QCFO6vo1SMfxLPOafLOo8sErw7lE';
	// var PROXY_URL = 'http://localhost:8000/';

	// if(window.location.search) {
		// window.close();
	//     var auth = window.location.search;
	//     localStorage.setItem('oauth_token', auth.split('&')[0].split('=')[1]);
	//     localStorage.setItem('oauth_verifier', auth.split('&')[1]);
	// }
