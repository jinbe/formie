'use strict';

/**
 * @tsdoc directive
 * @name tsPrice
 *
 * @description
 * Displays a price.
 *
 * @param {number} value Value to display.
 * @param {string} text Text to display if no value provided.
 */
angular.module('dodDocs').directive('tsPrice', [function() {
    var directive = {
        restrict: 'E',
        scope: {
            value: '=',
            text: '='
        },
        templateUrl: '/views/directives/tsPrice.html'
    };

    directive.link = function() {
    };

    return directive;
}]);
