"use strict";angular.module("formieIonic",["ionic"]),angular.module("formieIonic").directive("tsPrice",[function(){var e={restrict:"E",scope:{value:"=",text:"="},template:'<strong ng-if=value>{{value | currency: \'AU$ \': 2}}</strong> <strong ng-if="!value && text">{{text}}</strong> <strong ng-if="!value && !text">FREE</strong>'};return e.link=function(){},e}]),angular.module("formieIonic").directive("tsForm",["$state",function(e){var i={restrict:"E",scope:{form:"=",showOverview:"=",submitState:"="},template:'<h3 class=formHeader ng-show="showOverview && !form.currentField">{{form.title}} <a href=# class=editForm ng-click=form.nextField()>Edit</a></h3><div class=formBody><div class=overviewSection></div><div class=helpSection ng-if=form.help>Form help:<ts-form-help help-data=form.help></ts-form-help></div><div class=wizardSection><ts-form-field form=form form-field=form.currentField ng-show=form.currentField></ts-form-field></div></div><div class=formFooter></div>'};return i.link=function(i){i.form.currentField||i.form.nextField(),i.submitState&&i.$watch("form.currentField",function(t){t||e.go(i.submitState)})},i}]),angular.module("formieIonic").directive("tsFormField",[function(){var e={restrict:"E",scope:{form:"=",formField:"="},template:'<div class=fieldHeader>{{formField.question || formField.choiceField.question}}</div><div class=fieldBody><div class="list list-inset"><ts-form-field-input ng-repeat="field in formField.answerableFields()" class=item-text-wrap form-field=field></ts-form-field-input></div></div><div class=fieldFooter ng-if=formField.help><ts-form-help help-data=formField.help></ts-form-help></div>'};return e.controller=["$scope",function(e){this.onComplete=function(){e.formField.valid()&&e.form.nextField()}}],e.link=function(){},e}]),angular.module("formieIonic").directive("tsFormFieldInput",[function(){var e={restrict:"E",scope:{formField:"="},template:"<div ng-switch=formField.type><ts-form-field-address form-field=formField ng-if=\"formField.type === 'address'\"></ts-form-field-address><ts-form-field-blood-pressure form-field=formField ng-if=\"formField.type === 'bloodPressure'\"></ts-form-field-blood-pressure><ts-form-field-check form-field=formField ng-if=\"formField.type === 'check'\"></ts-form-field-check><ts-form-field-date form-field=formField ng-if=\"formField.type === 'date'\"></ts-form-field-date><ts-form-field-doctor form-field=formField ng-if=\"formField.type === 'doctor'\"></ts-form-field-doctor><ts-form-field-email form-field=formField ng-if=\"formField.type === 'email'\"></ts-form-field-email><ts-form-field-height form-field=formField ng-if=\"formField.type === 'height'\"></ts-form-field-height><ts-form-field-month form-field=formField ng-if=\"formField.type === 'month'\"></ts-form-field-month><ts-form-field-password form-field=formField ng-if=\"formField.type === 'password'\"></ts-form-field-password><ts-form-field-phone form-field=formField ng-if=\"formField.type === 'phone'\"></ts-form-field-phone><ts-form-field-text form-field=formField ng-if=\"formField.type === 'text'\"></ts-form-field-text><ts-form-field-text-area form-field=formField ng-if=\"formField.type === 'textArea'\"></ts-form-field-text-area><ts-form-field-weight form-field=formField ng-if=\"formField.type === 'weight'\"></ts-form-field-weight><ts-form-field-discrete form-field=formField ng-if=formField.isDiscrete()></ts-form-field-discrete></div>"};return e.link=function(){},e}]),angular.module("formieIonic").directive("tsFormFieldAddress",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=text placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldBloodPressure",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input"><input type=number ng-model=formField.value.max ng-keypress=input($event)> <strong>/</strong> <input type=number ng-model=formField.value.min ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldCheck",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:"<ion-checkbox ng-model=formField.value ng-change=complete()>{{formField.label || formField.question}}</ion-checkbox>"};return e.link=function(e,i,t,r){e.complete=function(){r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldDate",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=date placeholder={{formField.placeholder}} ng-model=formField.value></label>'};return e.link=function(){},e}]),angular.module("formieIonic").directive("tsFormFieldDiscrete",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<div class=button-bar ng-if="formField.options.length === 2"><a class=button ng-repeat="option in formField.options" ng-class="{\'button-calm\': formField.value === option}" ng-click=complete(option)><i class=ion-man ng-if="option === \'male\'"></i> <i class=ion-woman ng-if="option === \'female\'"></i> {{option}}</a></div><ion-radio ng-repeat="option in formField.options" ng-model=formField.value ng-value=option ng-click=complete() ng-if="formField.options.length !== 2">{{option}}</ion-radio>'};return e.link=function(e,i,t,r){e.complete=function(i){i&&(e.formField.value=i),r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldDoctor",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=text placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldEmail",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=email placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldHeight",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=number placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldMonth",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=month placeholder={{formField.placeholder}} ng-model=formField.value></label>'};return e.link=function(){},e}]),angular.module("formieIonic").directive("tsFormFieldPassword",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=password placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldPhone",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=tel placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldText",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=text placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormFieldTextArea",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <textarea placeholder={{formField.placeholder}} ng-model=formField.value></textarea></label>'};return e.link=function(){},e}]),angular.module("formieIonic").directive("tsFormFieldWeight",[function(){var e={require:"^tsFormField",restrict:"E",scope:{formField:"="},template:'<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=number placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'};return e.link=function(e,i,t,r){e.input=function(e){13===e.keyCode&&r.onComplete()}},e}]),angular.module("formieIonic").directive("tsFormHelp",[function(){var e={restrict:"E",scope:{helpData:"="},template:'<div class=helpText ng-if="!formData.popupLink && formData.text">{{formData.text}}</div><div class=helpHtml ng-bind-html=formData.html ng-if="!formData.popupLink && formData.html"></div><div class=helpPopupLink ng-if=formData.popupLink>{{formData.popupLink}}</div><div class=helpPopupText ng-if="formData.popupLink && formData.text">{{formData.text}}</div><div class=helpPopupHtml ng-bind-html=formData.html ng-if="formData.popupLink && formData.html"></div>'};return e.link=function(){},e}]),angular.module("formieIonic").directive("tsErrorMessage",[function(){var e={restrict:"E",scope:{message:"="},template:'<strong><i class="icon ion-alert"></i> {{message}}</strong>'};return e.link=function(){},e}]);var formieModel;!function(e){e.FormFieldType={group:{name:"group"},choiceGroup:{name:"choiceGroup"},address:{name:"address",format:"string"},bloodPressure:{name:"bloodPressure",format:"custom"},check:{name:"check",format:"boolean"},date:{name:"date",format:"date"},doctor:{name:"doctor",format:"string"},email:{name:"email",format:"string"},gender:{name:"gender",format:"discrete",options:["male","female"]},height:{name:"height",format:"number"},month:{name:"month",format:"date"},option:{name:"option",format:"discrete"},password:{name:"password",format:"string"},phone:{name:"phone",format:"string"},text:{name:"text",format:"string"},textArea:{name:"textArea",format:"string"},title:{name:"title",format:"discrete",options:["Mr","Mrs","Ms","Miss","Dr","Prof"]},weight:{name:"weight",format:"number"},yesNo:{name:"yesNo",format:"discrete",options:["yes","no"]}}}(formieModel||(formieModel={}));var formieModel;!function(e){var i=function(){function i(e,t,r){if(this.checkData(t),t.id&&t.id in r.fieldMap)throw new TypeError("Duplicate form field id ("+t.id+")");if(this.id=t.id||this.guid(),this.type=t.type,this.question=t.question||t.label,this.label=t.label||t.question,this.placeholder=t.placeholder||t.label||t.question,this.options=this.getOptions(t),this.validation=t.validation,this.help=t.help,this.value=null,this["abstract"]=t["abstract"],t.subfields){this.subfields=[];for(var o=0;o<t.subfields.length;o++)this.subfields.push(new i(this.id,t.subfields[o],r))}if(t.choiceField&&(this.choiceField=new i(this.id,t.choiceField,r)),t.choiceSubfields){this.choiceSubfields={};for(var l in t.choiceSubfields){this.choiceSubfields[l]=[];for(var n=t.choiceSubfields[l],s=0;s<n.length;s++)this.choiceSubfields[l].push(new i(this.id,n[s],r))}}this.parentId=e,this.setValue(t.value),r.fieldMap[this.id]=this}return i.prototype.isGroup=function(i){var t=i?i.type:this.type;return t===e.FormFieldType.group.name||t===e.FormFieldType.choiceGroup.name},i.prototype.isDiscrete=function(i){var t=i?i.type:this.type;return"discrete"===e.FormFieldType[t].format},i.prototype.answerableFields=function(){var i=[];if(this.isGroup()||i.push(this),this.type===e.FormFieldType.group.name)for(var t=0;t<this.subfields.length;t++)i=i.concat(this.subfields[t].answerableFields());if(this.type===e.FormFieldType.choiceGroup.name){i=i.concat(this.choiceField.answerableFields());var r=this.choiceField.value;if(r in this.choiceSubfields)for(var o=this.choiceSubfields[r],l=0;l<o.length;l++)i=i.concat(o[l].answerableFields())}return i},i.prototype.firstSubfield=function(){return this.isGroup()&&this["abstract"]?this.type===e.FormFieldType.group.name?this.subfields[0].firstSubfield():this.choiceField.firstSubfield():this},i.prototype.lastSubfield=function(){if(this.isGroup()&&this["abstract"]){var i=this.type===e.FormFieldType.group.name?this.subfields:this.choiceSubfields[this.choiceField.value];return i?i[i.length-1].lastSubfield():this.choiceField.lastSubfield()}return this},i.prototype.valid=function(){if(this.isGroup()){var i=this.type===e.FormFieldType.group.name?this.subfields:this.choiceSubfields[this.choiceField.value];if(i)for(var t=0;t<i.length;t++)if(!i[t].valid())return!1;return this.type===e.FormFieldType.group.name?!0:this.choiceField.valid()}return this.checkValue()},i.prototype.checkData=function(i,t){if(!this.isGroup(i)&&!i.id)throw new TypeError("Form field id required for "+this.toDebugString(i));if(!(i.type in e.FormFieldType))throw new TypeError("Invalid form field type ("+i.type+") for "+this.toDebugString(i));if(!(this.isGroup(i)&&(i.type!==e.FormFieldType.group.name||i["abstract"])||i.question||i.label))throw new TypeError("Form field question or label required for "+this.toDebugString(i));if(i.type===e.FormFieldType.option.name&&(!Array.isArray(i.options)||i.options.length<2))throw new TypeError("Form field options required (at least 2) for "+this.toDebugString(i));if(this.isGroup(i)&&t&&!i["abstract"])throw new TypeError("Groups inside non-abstract group have to be abstract "+this.toDebugString(i));if(i.type===e.FormFieldType.group.name){if(!Array.isArray(i.subfields)||0===i.subfields.length)throw new TypeError("Subfields required for group field "+this.toDebugString(i));for(var r=0;r<i.subfields.length;r++)this.checkData(i.subfields[r],t||!i["abstract"])}if(i.type===e.FormFieldType.choiceGroup.name){if(!i.choiceField)throw new TypeError("Choice field required for choice group field "+this.toDebugString(i));if(this.checkData(i.choiceField,t||!i["abstract"]),!this.isDiscrete(i.choiceField))throw new TypeError("Invalid choice field type ("+i.choiceField.type+") for "+this.toDebugString(i.choiceField));if(!i.choiceSubfields||0===Object.keys(i.choiceSubfields).length)throw new TypeError("Form field choice subfields required for "+this.toDebugString(i));for(var o in i.choiceSubfields){var l=this.getOptions(i.choiceField);if(-1===l.indexOf(o))throw new TypeError("Invalid subfields choice ("+o+") for "+this.toDebugString(i));var n=i.choiceSubfields[o];if(!Array.isArray(n)||0===n.length)throw new TypeError("Subfields required for subfields choice ("+o+") in "+this.toDebugString(i));for(var s=0;s<n.length;s++)this.checkData(n[s],t||!i["abstract"])}}},i.prototype.setValue=function(i){var t=e.FormFieldType[this.type].format;t&&(this.value="date"===t?i?new Date(i):null:i)},i.prototype.checkValue=function(){var i=this.validation&&this.validation.required,t=e.FormFieldType[this.type].format,r="undefined"==typeof this.value||null===this.value;return r||("string"===t&&0===this.value.trim().length&&(r=!0),"boolean"!==t||this.value||(r=!0)),r?!i:!0},i.prototype.getOptions=function(i){return i.options?i.options:e.FormFieldType[i.type].options},i.prototype.toDebugString=function(e){var i=e||this;return i.id||i.label||i.question||JSON.stringify(i)},i.prototype.guid=function(){var e=Date.now(),i="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){var t=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===i?t:7&t|8).toString(16)});return i},i}();e.FormField=i}(formieModel||(formieModel={}));var formieModel;!function(e){var i=function(){function i(i){this.checkData(i),this.id=i.id,this.title=i.title,this.fields=i.fields,this.help=i.help,this.fields=[],this.fieldMap={};for(var t=0;t<i.fields.length;t++)this.fields.push(new e.FormField(null,i.fields[t],this));this.currentField=null,this.nextField()}return i.prototype.hasPrevField=function(e){return this.currentField!==this.fields[0].firstSubfield()},i.prototype.hasNextField=function(e){return this.currentField!==this.fields[this.fields.length-1].lastSubfield()},i.prototype.prevField=function(e){if(this.currentField=this.getPrevField(this.currentField),!e)for(;this.currentField&&this.currentField["abstract"];)this.currentField=this.getPrevField(this.currentField)},i.prototype.nextField=function(e){if(this.currentField=this.getNextField(this.currentField),!e)for(;this.currentField&&this.currentField["abstract"];)this.currentField=this.getNextField(this.currentField)},i.prototype.valid=function(){for(var e=0;e<this.fields.length;e++)if(!this.fields[e].valid())return!1;return!0},i.prototype.checkData=function(e){if(!e.id)throw new TypeError("Form id required for "+this.toDebugString(e));if(!e.title)throw new TypeError("Form title required for "+this.toDebugString(e));if(!Array.isArray(e.fields)||0===e.fields.length)throw new TypeError("Form fields required for "+this.toDebugString(e))},i.prototype.toDebugString=function(e){var i=e||this;return i.id||i.title||JSON.stringify(i)},i.prototype.getPrevField=function(i){if(!i)return this.fields[this.fields.length-1].lastSubfield();if(i.parentId){var t=this.fieldMap[i.parentId];if(t.type===e.FormFieldType.group.name&&t["abstract"]){var r=t.subfields.indexOf(i);if(r>0)return t.subfields[r-1].lastSubfield()}if(t.type===e.FormFieldType.choiceGroup.name&&t["abstract"]){var o=t.choiceSubfields[t.choiceField.value];if(o){var l=o.indexOf(i);if(0===l)return t.choiceField.lastSubfield();if(l>0)return o[l-1].lastSubfield()}}return t}var n=this.fields.indexOf(i);return n>0?this.fields[n-1].lastSubfield():null},i.prototype.getNextField=function(i,t){if(!i)return this.fields[0];if(!t&&i.type===e.FormFieldType.group.name&&i["abstract"])return i.subfields[0];if(!t&&i.type===e.FormFieldType.choiceGroup.name&&i["abstract"])return i.choiceField;if(i.parentId){var r=this.fieldMap[i.parentId];if(r.type===e.FormFieldType.group.name&&r["abstract"]){var o=r.subfields.indexOf(i);if(o<r.subfields.length-1)return r.subfields[o+1]}if(r.type===e.FormFieldType.choiceGroup.name&&r["abstract"]){var l=r.choiceSubfields[r.choiceField.value];if(l){if(r.choiceField===i)return l[0];var n=l.indexOf(i);if(n<l.length-1)return l[n+1]}}return this.getNextField(r,!0)}var s=this.fields.indexOf(i);return s<this.fields.length-1?this.fields[s+1]:null},i}();e.Form=i}(formieModel||(formieModel={}));