'use strict';

var app = angular.module('dodDocs', ['ionic', 'ngAnimate', 'ngResource', 'ui.codemirror']);

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
