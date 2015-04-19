'use strict';

var app = angular.module('dodDocs', ['ionic', 'ngAnimate', 'ngResource', 'ui.codemirror']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('docs', {
            url: '/docs',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            abstract: true
        })
        .state('docs.guide', {
            url: '/guide',
            templateUrl: '#/docs/views/auto/guide.html'
        })
        .state('docs.doclet', {
            url: '/doclet/:docletId',
            template: '<ts-doclet></ts-doclet>'
        });

    $urlRouterProvider.otherwise('/docs/guide');
}]);
