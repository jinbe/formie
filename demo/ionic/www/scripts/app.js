'use strict';

var app = angular.module('formieIonicDemo', ['formieIonic', 'ionic', 'ui.codemirror']);

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

app.run(['$ionicPlatform', function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            window.StatusBar.styleDefault();
        }
    });
}]);
