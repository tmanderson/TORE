'use strict';

angular.module('TORE')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'src/main/main.html',
        controller: 'MainController'
      });
  });
