'use strict';

angular.module('TORE')
	.directive('focus', function ($timeout) {

		return function (scope, element, attrs) {
			attrs.$observe('focus', function (newValue) {
				if (newValue) {
					$timeout(function() {
						element[0].focus();
					}, 250);
				}
			});
		};

	});
