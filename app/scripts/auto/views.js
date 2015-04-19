'use strict';

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/main.html',
    '<ion-view view-title="Formie"><ion-content><div class="row"><div class="col col-33 docsSection"><h3 class="sectionTitle">Learn</h3><ts-doclet-menu></ts-doclet-menu><div ui-view=""></div></div><div class="col col-33 jsonSection"><h3 class="sectionTitle">Play</h3><ui-codemirror ui-codemirror-opts="editorOptions" ng-model="form.str"></ui-codemirror></div><div class="col col-33 formSection"><h3 class="sectionTitle">View</h3><ts-error-message message="form.err" ng-if="form.err"></ts-error-message><div class="formView" ng-if="form.obj && !form.err"><div class="formNav row"><div class="left col col-25"><button class="button button-clear" ng-click="form.obj.prevField()" ng-disabled="!form.obj.hasPrevField()"><i class="ion-ios-arrow-back"></i> Back</button></div><div class="center col"><div class="button button-clear">{{form.obj.title}}</div></div><div class="right col col-25"><button class="button button-clear" ng-click="form.obj.nextField()" ng-disabled="!form.obj.currentField || (form.obj.currentField && !form.obj.currentField.valid())"><i class="ion-ios-arrow-forward"></i> Next</button></div></div><ts-form form="form.obj" ng-show="form.obj.currentField"></ts-form><div class="formComplete" ng-show="!form.obj.currentField"><i class="ion-checkmark"></i>Form Complete</div></div></div></div></ion-content></ion-view>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsErrorMessage.html',
    '<strong><i class="icon ion-alert"></i> {{message}}</strong>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsForm.html',
    '<h3 class="formHeader" ng-show="showOverview && !form.currentField">{{form.title}} <a href="#" class="editForm" ng-click="form.nextField()">Edit</a></h3><div class="formBody"><div class="overviewSection"></div><div class="helpSection" ng-if="form.help">Form help:<ts-form-help help-data="form.help"></ts-form-help></div><div class="wizardSection"><ts-form-field form="form" form-field="form.currentField" ng-show="form.currentField"></ts-form-field></div></div><div class="formFooter"></div>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormField.html',
    '<div class="fieldHeader">{{formField.question || formField.choiceField.question}}</div><div class="fieldBody"><div class="list list-inset"><ts-form-field-input ng-repeat="field in formField.answerableFields()" class="item-text-wrap" form-field="field"></ts-form-field-input></div></div><div class="fieldFooter" ng-if="formField.help"><ts-form-help help-data="formField.help"></ts-form-help></div>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldAddress.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="text" placeholder="{{formField.placeholder}}" ng-model="formField.value" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldBloodPressure.html',
    '<label class="item item-input"><input type="number" ng-model="formField.value.max" ng-keypress="input($event)"> <strong>/</strong> <input type="number" ng-model="formField.value.min" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldCheck.html',
    '<ion-checkbox ng-model="formField.value" ng-change="complete()">{{formField.label || formField.question}}</ion-checkbox>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldDate.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="date" placeholder="{{formField.placeholder}}" ng-model="formField.value"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldDiscrete.html',
    '<div class="button-bar" ng-if="formField.options.length === 2"><a class="button" ng-repeat="option in formField.options" ng-class="{\'button-calm\': formField.value === option}" ng-click="complete(option)"><i class="ion-man" ng-if="option === \'male\'"></i> <i class="ion-woman" ng-if="option === \'female\'"></i> {{option}}</a></div><ion-radio ng-repeat="option in formField.options" ng-model="formField.value" ng-value="option" ng-click="complete()" ng-if="formField.options.length !== 2">{{option}}</ion-radio>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldDoctor.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="text" placeholder="{{formField.placeholder}}" ng-model="formField.value" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldEmail.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="email" placeholder="{{formField.placeholder}}" ng-model="formField.value" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldHeight.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="number" placeholder="{{formField.placeholder}}" ng-model="formField.value" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldInput.html',
    '<div ng-switch="formField.type"><ts-form-field-address form-field="formField" ng-if="formField.type === \'address\'"></ts-form-field-address><ts-form-field-blood-pressure form-field="formField" ng-if="formField.type === \'bloodPressure\'"></ts-form-field-blood-pressure><ts-form-field-check form-field="formField" ng-if="formField.type === \'check\'"></ts-form-field-check><ts-form-field-date form-field="formField" ng-if="formField.type === \'date\'"></ts-form-field-date><ts-form-field-doctor form-field="formField" ng-if="formField.type === \'doctor\'"></ts-form-field-doctor><ts-form-field-email form-field="formField" ng-if="formField.type === \'email\'"></ts-form-field-email><ts-form-field-height form-field="formField" ng-if="formField.type === \'height\'"></ts-form-field-height><ts-form-field-month form-field="formField" ng-if="formField.type === \'month\'"></ts-form-field-month><ts-form-field-password form-field="formField" ng-if="formField.type === \'password\'"></ts-form-field-password><ts-form-field-phone form-field="formField" ng-if="formField.type === \'phone\'"></ts-form-field-phone><ts-form-field-text form-field="formField" ng-if="formField.type === \'text\'"></ts-form-field-text><ts-form-field-text-area form-field="formField" ng-if="formField.type === \'textArea\'"></ts-form-field-text-area><ts-form-field-weight form-field="formField" ng-if="formField.type === \'weight\'"></ts-form-field-weight><ts-form-field-discrete form-field="formField" ng-if="formField.isDiscrete()"></ts-form-field-discrete></div>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldMonth.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="month" placeholder="{{formField.placeholder}}" ng-model="formField.value"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldPassword.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="password" placeholder="{{formField.placeholder}}" ng-model="formField.value" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldPhone.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="tel" placeholder="{{formField.placeholder}}" ng-model="formField.value" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldText.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="text" placeholder="{{formField.placeholder}}" ng-model="formField.value" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldTextArea.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <textarea placeholder="{{formField.placeholder}}" ng-model="formField.value"></textarea></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormFieldWeight.html',
    '<label class="item item-input item-stacked-label"><span class="input-label">{{formField.label}}</span> <input type="number" placeholder="{{formField.placeholder}}" ng-model="formField.value" ng-keypress="input($event)"></label>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsFormHelp.html',
    '<div class="helpText" ng-if="!formData.popupLink && formData.text">{{formData.text}}</div><div class="helpHtml" ng-bind-html="formData.html" ng-if="!formData.popupLink && formData.html"></div><div class="helpPopupLink" ng-if="formData.popupLink">{{formData.popupLink}}</div><div class="helpPopupText" ng-if="formData.popupLink && formData.text">{{formData.text}}</div><div class="helpPopupHtml" ng-bind-html="formData.html" ng-if="formData.popupLink && formData.html"></div>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/directives/tsPrice.html',
    '<strong ng-if="value">{{value | currency: \'AU$ \': 2}}</strong> <strong ng-if="!value && text">{{text}}</strong> <strong ng-if="!value && !text">FREE</strong>');
}]);
