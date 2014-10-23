TORE.directive('focus', function () {
    'use strict';

    return function (scope, element, attrs) {
        attrs.$observe('focus', function (newValue) {
            newValue === 'true' && setTimeout(function() {
                element[0].focus();
            }, 250);
        });
    };
});