'use strict';

angular.module('dodDocs').directive('tsDocletMenu', ['$resource', function($resource) {
    var directive = {
        restrict: 'E',
        scope: true,
        templateUrl: '/views/tsDocletMenu.html'
    };

    directive.link = function(scope) {
        scope.visible = false;
        //scope.menu = $resource('data/menu.json').get();
        scope.menu = $resource('docs/data/menu.json').get();
    };

    return directive;
}]);

angular.module('dodDocs').directive('tsDoclet', ['$resource', '$stateParams', function($resource, $stateParams) {
    var directive = {
        restrict: 'E',
        scope: true,
        templateUrl: '/views/tsDoclet.html'
    };

    directive.link = function(scope) {
        //var dataPath = 'data/' + $stateParams.docletId + '.json';
        var dataPath = 'docs/data/' + $stateParams.docletId + '.json';
        scope.data = $resource(dataPath).get();
    };

    return directive;
}]);

angular.module('dodDocs').directive('tsDocletClass', [function() {
    var directive = {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: '/views/tsDocletClass.html'
    };

    directive.link = function() {
    };

    return directive;
}]);

angular.module('dodDocs').directive('tsDocletEnum', [function() {
    var directive = {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: '/views/tsDocletEnum.html'
    };

    directive.link = function() {
    };

    return directive;
}]);

angular.module('dodDocs').filter('trustedHtml', ['$sce', function($sce) {
    return function(html) {
        return $sce.trustAsHtml(html);
    };
}]);
