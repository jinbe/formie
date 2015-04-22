'use strict';

/**
 * @tsdoc directive
 * @name tsForm
 *
 * @description
 * Displays a form.
 *
 * @param {Form} form the form.
 * @param {boolean} showOverview whether the form overview is shown at the start/end of the wizard.
 * @param {string} submitState the state to show when the form is complete.
 */
angular.module('formieIonic').directive('tsForm', ['$state', function($state) {
    var directive = {
        restrict: 'E',
        scope: {
            form: '=',
            showOverview: '=',
            submitState: '='
        },
        templateUrl: '/views/directives/tsForm.html'
    };

    directive.link = function(scope) {
        if (!scope.form.currentField) {
            scope.form.nextField();
        }

        if (scope.submitState) {
            scope.$watch('form.currentField', function(currentField) {
                if (!currentField) {
                    $state.go(scope.submitState);
                }
            });
        }
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormField', [function() {
    var directive = {
        restrict: 'E',
        scope: {
            form: '=',
            formField: '='
        },
        templateUrl: '/views/directives/tsFormField.html'
    };

    directive.controller = function($scope) {
        this.onComplete = function() {
            if ($scope.formField.valid()) {
                $scope.form.nextField();
            }
        };
    };

    directive.link = function() {
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldInput', [function() {
    var directive = {
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldInput.html'
    };

    directive.link = function() {
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldAddress', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldAddress.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldBloodPressure', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldBloodPressure.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldCheck', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldCheck.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.complete = function() {
            controller.onComplete();
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldDate', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldDate.html'
    };

    directive.link = function() {
        // TODO handle done button
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldDiscrete', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldDiscrete.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.complete = function(value) {
            if (value) {
                scope.formField.value = value;
            }

            controller.onComplete();
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldDoctor', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldDoctor.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldEmail', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldEmail.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldHeight', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldHeight.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldMonth', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldMonth.html'
    };

    directive.link = function() {
        // TODO handle done button
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldPassword', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldPassword.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldPhone', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldPhone.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldText', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldText.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldTextArea', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldTextArea.html'
    };

    directive.link = function() {
        // TODO handle 'done' button
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormFieldWeight', [function() {
    var directive = {
        require: '^tsFormField',
        restrict: 'E',
        scope: {
            formField: '='
        },
        templateUrl: '/views/directives/tsFormFieldWeight.html'
    };

    directive.link = function(scope, element, attrs, controller) {
        scope.input = function(event) {
            if (event.keyCode === 13) {
                controller.onComplete();
            }
        };
    };

    return directive;
}]);

angular.module('formieIonic').directive('tsFormHelp', [function() {
    var directive = {
        restrict: 'E',
        scope: {
            helpData: '='
        },
        templateUrl: '/views/directives/tsFormHelp.html'
    };

    directive.link = function() {
    };

    return directive;
}]);
