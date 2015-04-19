'use strict';

var app = angular.module('dodDocs', ['ngAnimate', 'ngResource', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('docs', {
            url: '/docs',
            templateUrl: '/views/doc.html',
            abstract: true
        })
        .state('docs.guide', {
            url: '/guide',
            templateUrl: '/views/auto/guide.html'
        })
        .state('docs.doclet', {
            url: '/doclet/:docletId',
            template: '<ts-doclet></ts-doclet>'
        });

    $urlRouterProvider.otherwise('/docs/guide');
}]);
