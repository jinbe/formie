'use strict';

/**
 * @tsdoc directive
 * @name tsErrorMessage
 *
 * @description
 * Displays an error message.
 *
 * @param {string} message Message to display.
 */
angular.module('dodDocs').directive('tsErrorMessage', [function() {
    var directive = {
        restrict: 'E',
        scope: {
            message: '='
        },
        templateUrl: '/views/directives/tsErrorMessage.html'
    };

    directive.link = function() {
    };

    return directive;
}]);
