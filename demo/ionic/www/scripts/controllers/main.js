'use strict';

angular.module('formieIonicDemo').controller('MainCtrl', ['$scope', function($scope) {
    $scope.editorOptions = {
        lineWrapping: true,
        lineNumbers: true,
        theme: 'blackboard',
        mode: {
            name: 'javascript',
            json: true
        },
        foldGutter: {
            rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace)
        },
        gutters: ['CodeMirror-foldgutter']
    };

    var initialForm = {
        id: 'formId',
        title: 'Form Title',
        fields: [
            {
                id: 'groupField',
                type: 'choiceGroup',
                abstract: true,
                choiceField: {
                    id: 'choiceField',
                    type: 'yesNo',
                    question: 'Yes or No?',
                    validation: {
                        required: true
                    }
                },
                choiceSubfields: {
                    yes: [
                        {
                            id: 'textField',
                            type: 'text',
                            question: 'Write some text',
                            validation: {
                                required: false
                            }
                        },
                        {
                            id: 'optionField',
                            type: 'option',
                            question: 'Pick an option',
                            options: ['Plan A', 'Plan B', 'Plan C'],
                            validation: {
                                required: true
                            }
                        }
                    ]
                }
            }
        ]
    };

    $scope.form = {
        str: JSON.stringify(initialForm, null, 2).replace(/"([^(")]+)":/g, '$1:').replace(/"/g, '\''),
        obj: null,
        err: null
    };

    $scope.$watch('form.str', function(formStr) {
        if (formStr) {
            try {
                var form = new formieModel.Form(eval('(' + formStr + ')')); // jshint ignore:line
                $scope.form.err = null;
                $scope.form.obj = form;
            }
            catch (e) {
                $scope.form.err = e.message;
                $scope.form.obj = null;
            }
        }
    });
}]);
