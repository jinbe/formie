'use strict';

var app = angular.module('formieDemo', ['ionic', 'ngAnimate', 'ui.codemirror', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('demo', {
            url: '/demo',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            abstract: true
        });

    $urlRouterProvider.otherwise('/demo');
}]);
