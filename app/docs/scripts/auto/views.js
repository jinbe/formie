'use strict';

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/doc.html',
    '<ts-doclet-menu></ts-doclet-menu><div ui-view=""></div>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/tsDoclet.html',
    '<ts-doclet-class data="data" ng-if="data.doclet.tsdoc !== \'model.enum\'"></ts-doclet-class><ts-doclet-enum data="data" ng-if="data.doclet.tsdoc === \'model.enum\'"></ts-doclet-enum>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/tsDocletClass.html',
    '<div class="header"><div class="name">{{data.doclet.longname}}</div><div class="description" ng-bind-html="data.doclet.description | trustedHtml"></div></div><div class="properties members"><div class="title">Properties</div><div class="member property" ng-repeat="property in data.doclet.properties"><div class="name">{{property.name}}</div><div class="type">({{property.type.names[0]}})</div><div class="description" ng-bind-html="property.description | trustedHtml"></div></div></div>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/tsDocletEnum.html',
    '<div class="header"><div class="name">{{data.doclet.longname}}</div><div class="description" ng-bind-html="data.doclet.description | trustedHtml"></div></div><div class="members"><div class="title">Options</div><div class="member" ng-repeat="member in data.subdoclets.member"><div class="name">{{member.doclet.name}}</div><div class="description" ng-bind-html="member.doclet.description | trustedHtml"></div></div></div>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/tsDocletMenu.html',
    '<div class="menuIcon"><button class="cmn-toggle-switch cmn-toggle-switch__htx" ng-class="{active: visible}" ng-click="visible = !visible"><span>toggle menu</span></button></div><div class="menuContainer" ng-show="visible"><div class="guide"><a ui-sref="docs.guide">Guide</a></div><div class="menuSection" ng-repeat="(sectionName, section) in menu"><div class="sectionName">{{sectionName}}</div><div class="menuItem" ng-repeat="menuItem in section"><div class="itemName"><a ui-sref="docs.doclet({docletId: menuItem})">{{menuItem}}</a></div></div></div></div>');
}]);

angular.module('dodDocs').run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/auto/guide.html',
    '<div class="markdown"><h1 id="guide">Guide</h1><ol><li>Create a form<ul><li>Write a form using json</li><li>Add groups and fields to the form</li><li>Set validation rules to the fields</li><li>Add help messages to the fields</li></ul></li><li>Add the form data to your views<ul><li>Create a directive</li><li>Set the form data</li><li>Configure the directive options</li></ul></li></ol><h2 id="create-a-form">Create a form</h2><p>A <a href="#/docs/doclet/Form">Form</a> requires three properties, id (string), title (string) and fields (an array of form fields):</p><pre><code class="lang-js">{\n' +
    '  &quot;id&quot;: &quot;formId&quot;,\n' +
    '  &quot;title&quot;: &quot;Form Title&quot;,\n' +
    '  &quot;fields&quot;: []\n' +
    '}\n' +
    '</code></pre><p>Next, add some form fields to the fields array.</p><p>A <a href="#/docs/doclet/FormField">FormField</a> consists of three basic properties, id (string), type (string) and label (string):</p><pre><code class="lang-js">{\n' +
    '  &quot;id&quot;: &quot;formId&quot;,\n' +
    '  &quot;title&quot;: &quot;Form Title&quot;,\n' +
    '  &quot;fields&quot;: [\n' +
    '    {\n' +
    '      &quot;id&quot;: &quot;textFieldId&quot;,\n' +
    '      &quot;type&quot;: &quot;text&quot;,\n' +
    '      &quot;label&quot;: &quot;Write some text&quot;\n' +
    '    }\n' +
    '  ]\n' +
    '}\n' +
    '</code></pre><p>The enumeration <a href="#/docs/doclet/FormFieldType">FormFieldType</a> describes all the accepted field types, including two group types and many input types.</p><p>The group types are &#39;group&#39; and &#39;choiceGroup&#39;.</p><h2 id="add-the-form-data-to-your-views">Add the form data to your views</h2><p>This step is pretty simple, just declare a <a href="#/docs/doclet/tsForm">tsForm</a> directive in your view and set the &#39;form&#39; parameter with the form data.</p><pre><code class="lang-html">&lt;ts-form form=&quot;form&quot;&gt;&lt;/ts-form&gt;\n' +
    '</code></pre></div>');
}]);
