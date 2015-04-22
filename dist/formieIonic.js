"use strict";
angular.module("formieIonic", ["ionic"]), angular.module("formieIonic").directive("tsPrice", [function() {
    var e = {
        restrict: "E",
        scope: {value: "=", text: "="},
        template: '<strong ng-if=value>{{value | currency: \'AU$ \': 2}}</strong> <strong ng-if="!value && text">{{text}}</strong> <strong ng-if="!value && !text">FREE</strong>'
    };
    return e.link = function() {
    }, e
}]), angular.module("formieIonic").directive("tsForm", ["$state", function(e) {
    var i = {
        restrict: "E",
        scope: {form: "=", showOverview: "=", submitState: "="},
        template: '<h3 class=formHeader ng-show="showOverview && !form.currentField">{{form.title}} <a href=# class=editForm ng-click=form.nextField()>Edit</a></h3><div class=formBody><div class=overviewSection></div><div class=helpSection ng-if=form.help>Form help:<ts-form-help help-data=form.help></ts-form-help></div><div class=wizardSection><ts-form-field form=form form-field=form.currentField ng-show=form.currentField></ts-form-field></div></div><div class=formFooter></div>'
    };
    return i.link = function(i) {
        i.form.currentField || i.form.nextField(), i.submitState && i.$watch("form.currentField", function(t) {
            t || e.go(i.submitState)
        })
    }, i
}]), angular.module("formieIonic").directive("tsFormField", [function() {
    var e = {
        restrict: "E",
        scope: {form: "=", formField: "="},
        template: '<div class=fieldHeader>{{formField.question || formField.choiceField.question}}</div><div class=fieldBody><div class="list list-inset"><ts-form-field-input ng-repeat="field in formField.answerableFields()" class=item-text-wrap form-field=field></ts-form-field-input></div></div><div class=fieldFooter ng-if=formField.help><ts-form-help help-data=formField.help></ts-form-help></div>'
    };
    return e.controller = function(e) {
        this.onComplete = function() {
            e.formField.valid() && e.form.nextField()
        }
    }, e.link = function() {
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldInput", [function() {
    var e = {
        restrict: "E",
        scope: {formField: "="},
        template: "<div ng-switch=formField.type><ts-form-field-address form-field=formField ng-if=\"formField.type === 'address'\"></ts-form-field-address><ts-form-field-blood-pressure form-field=formField ng-if=\"formField.type === 'bloodPressure'\"></ts-form-field-blood-pressure><ts-form-field-check form-field=formField ng-if=\"formField.type === 'check'\"></ts-form-field-check><ts-form-field-date form-field=formField ng-if=\"formField.type === 'date'\"></ts-form-field-date><ts-form-field-doctor form-field=formField ng-if=\"formField.type === 'doctor'\"></ts-form-field-doctor><ts-form-field-email form-field=formField ng-if=\"formField.type === 'email'\"></ts-form-field-email><ts-form-field-height form-field=formField ng-if=\"formField.type === 'height'\"></ts-form-field-height><ts-form-field-month form-field=formField ng-if=\"formField.type === 'month'\"></ts-form-field-month><ts-form-field-password form-field=formField ng-if=\"formField.type === 'password'\"></ts-form-field-password><ts-form-field-phone form-field=formField ng-if=\"formField.type === 'phone'\"></ts-form-field-phone><ts-form-field-text form-field=formField ng-if=\"formField.type === 'text'\"></ts-form-field-text><ts-form-field-text-area form-field=formField ng-if=\"formField.type === 'textArea'\"></ts-form-field-text-area><ts-form-field-weight form-field=formField ng-if=\"formField.type === 'weight'\"></ts-form-field-weight><ts-form-field-discrete form-field=formField ng-if=formField.isDiscrete()></ts-form-field-discrete></div>"
    };
    return e.link = function() {
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldAddress", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=text placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldBloodPressure", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input"><input type=number ng-model=formField.value.max ng-keypress=input($event)> <strong>/</strong> <input type=number ng-model=formField.value.min ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldCheck", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: "<ion-checkbox ng-model=formField.value ng-change=complete()>{{formField.label || formField.question}}</ion-checkbox>"
    };
    return e.link = function(e, i, t, r) {
        e.complete = function() {
            r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldDate", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=date placeholder={{formField.placeholder}} ng-model=formField.value></label>'
    };
    return e.link = function() {
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldDiscrete", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<div class=button-bar ng-if="formField.options.length === 2"><a class=button ng-repeat="option in formField.options" ng-class="{\'button-calm\': formField.value === option}" ng-click=complete(option)><i class=ion-man ng-if="option === \'male\'"></i> <i class=ion-woman ng-if="option === \'female\'"></i> {{option}}</a></div><ion-radio ng-repeat="option in formField.options" ng-model=formField.value ng-value=option ng-click=complete() ng-if="formField.options.length !== 2">{{option}}</ion-radio>'
    };
    return e.link = function(e, i, t, r) {
        e.complete = function(i) {
            i && (e.formField.value = i), r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldDoctor", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=text placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldEmail", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=email placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldHeight", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=number placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldMonth", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=month placeholder={{formField.placeholder}} ng-model=formField.value></label>'
    };
    return e.link = function() {
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldPassword", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=password placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldPhone", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=tel placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldText", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=text placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldTextArea", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <textarea placeholder={{formField.placeholder}} ng-model=formField.value></textarea></label>'
    };
    return e.link = function() {
    }, e
}]), angular.module("formieIonic").directive("tsFormFieldWeight", [function() {
    var e = {
        require: "^tsFormField",
        restrict: "E",
        scope: {formField: "="},
        template: '<label class="item item-input item-stacked-label"><span class=input-label>{{formField.label}}</span> <input type=number placeholder={{formField.placeholder}} ng-model=formField.value ng-keypress=input($event)></label>'
    };
    return e.link = function(e, i, t, r) {
        e.input = function(e) {
            13 === e.keyCode && r.onComplete()
        }
    }, e
}]), angular.module("formieIonic").directive("tsFormHelp", [function() {
    var e = {
        restrict: "E",
        scope: {helpData: "="},
        template: '<div class=helpText ng-if="!formData.popupLink && formData.text">{{formData.text}}</div><div class=helpHtml ng-bind-html=formData.html ng-if="!formData.popupLink && formData.html"></div><div class=helpPopupLink ng-if=formData.popupLink>{{formData.popupLink}}</div><div class=helpPopupText ng-if="formData.popupLink && formData.text">{{formData.text}}</div><div class=helpPopupHtml ng-bind-html=formData.html ng-if="formData.popupLink && formData.html"></div>'
    };
    return e.link = function() {
    }, e
}]);
var FormFieldType = {
    group: {name: "group"},
    choiceGroup: {name: "choiceGroup"},
    address: {name: "address", format: "string"},
    bloodPressure: {name: "bloodPressure", format: "custom"},
    check: {name: "check", format: "boolean"},
    date: {name: "date", format: "date"},
    doctor: {name: "doctor", format: "string"},
    email: {name: "email", format: "string"},
    gender: {name: "gender", format: "discrete", options: ["male", "female"]},
    height: {name: "height", format: "number"},
    month: {name: "month", format: "date"},
    option: {name: "option", format: "discrete"},
    password: {name: "password", format: "string"},
    phone: {name: "phone", format: "string"},
    text: {name: "text", format: "string"},
    textArea: {name: "textArea", format: "string"},
    title: {name: "title", format: "discrete", options: ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof"]},
    weight: {name: "weight", format: "number"},
    yesNo: {name: "yesNo", format: "discrete", options: ["yes", "no"]}
}, FormField = function() {
    function e(i, t, r) {
        if (this.checkData(t), t.id && t.id in r.fieldMap)throw new TypeError("Duplicate form field id (" + t.id + ")");
        if (this.id = t.id || this.guid(), this.type = t.type, this.question = t.question || t.label, this.label = t.label || t.question, this.placeholder = t.placeholder || t.label || t.question, this.options = this.getOptions(t), this.validation = t.validation, this.help = t.help, this.value = null, this["abstract"] = t["abstract"], t.subfields) {
            this.subfields = [];
            for (var o = 0; o < t.subfields.length; o++)this.subfields.push(new e(this.id, t.subfields[o], r))
        }
        if (t.choiceField && (this.choiceField = new e(this.id, t.choiceField, r)), t.choiceSubfields) {
            this.choiceSubfields = {};
            for (var l in t.choiceSubfields) {
                this.choiceSubfields[l] = [];
                for (var n = t.choiceSubfields[l], s = 0; s < n.length; s++)this.choiceSubfields[l].push(new e(this.id, n[s], r))
            }
        }
        this.parentId = i, this.setValue(t.value), r.fieldMap[this.id] = this
    }

    return e.prototype.isGroup = function(e) {
        var i = e ? e.type : this.type;
        return i === FormFieldType.group.name || i === FormFieldType.choiceGroup.name
    }, e.prototype.isDiscrete = function(e) {
        var i = e ? e.type : this.type;
        return "discrete" === FormFieldType[i].format
    }, e.prototype.answerableFields = function() {
        var e = [];
        if (this.isGroup() || e.push(this), this.type === FormFieldType.group.name)for (var i = 0; i < this.subfields.length; i++)e = e.concat(this.subfields[i].answerableFields());
        if (this.type === FormFieldType.choiceGroup.name) {
            e = e.concat(this.choiceField.answerableFields());
            var t = this.choiceField.value;
            if (t in this.choiceSubfields)for (var r = this.choiceSubfields[t], o = 0; o < r.length; o++)e = e.concat(r[o].answerableFields())
        }
        return e
    }, e.prototype.firstSubfield = function() {
        return this.isGroup() && this["abstract"] ? this.type === FormFieldType.group.name ? this.subfields[0].firstSubfield() : this.choiceField.firstSubfield() : this
    }, e.prototype.lastSubfield = function() {
        if (this.isGroup() && this["abstract"]) {
            var e = this.type === FormFieldType.group.name ? this.subfields : this.choiceSubfields[this.choiceField.value];
            return e ? e[e.length - 1].lastSubfield() : this.choiceField.lastSubfield()
        }
        return this
    }, e.prototype.valid = function() {
        if (this.isGroup()) {
            var e = this.type === FormFieldType.group.name ? this.subfields : this.choiceSubfields[this.choiceField.value];
            if (e)for (var i = 0; i < e.length; i++)if (!e[i].valid())return !1;
            return this.type === FormFieldType.group.name ? !0 : this.choiceField.valid()
        }
        return this.checkValue()
    }, e.prototype.checkData = function(e, i) {
        if (!this.isGroup(e) && !e.id)throw new TypeError("Form field id required for " + this.toDebugString(e));
        if (!(e.type in FormFieldType))throw new TypeError("Invalid form field type (" + e.type + ") for " + this.toDebugString(e));
        if (!(this.isGroup(e) && (e.type !== FormFieldType.group.name || e["abstract"]) || e.question || e.label))throw new TypeError("Form field question or label required for " + this.toDebugString(e));
        if (e.type === FormFieldType.option.name && (!Array.isArray(e.options) || e.options.length < 2))throw new TypeError("Form field options required (at least 2) for " + this.toDebugString(e));
        if (this.isGroup(e) && i && !e["abstract"])throw new TypeError("Groups inside non-abstract group have to be abstract " + this.toDebugString(e));
        if (e.type === FormFieldType.group.name) {
            if (!Array.isArray(e.subfields) || 0 === e.subfields.length)throw new TypeError("Subfields required for group field " + this.toDebugString(e));
            for (var t = 0; t < e.subfields.length; t++)this.checkData(e.subfields[t], i || !e["abstract"])
        }
        if (e.type === FormFieldType.choiceGroup.name) {
            if (!e.choiceField)throw new TypeError("Choice field required for choice group field " + this.toDebugString(e));
            if (this.checkData(e.choiceField, i || !e["abstract"]), !this.isDiscrete(e.choiceField))throw new TypeError("Invalid choice field type (" + e.choiceField.type + ") for " + this.toDebugString(e.choiceField));
            if (!e.choiceSubfields || 0 === Object.keys(e.choiceSubfields).length)throw new TypeError("Form field choice subfields required for " + this.toDebugString(e));
            for (var r in e.choiceSubfields) {
                var o = this.getOptions(e.choiceField);
                if (-1 === o.indexOf(r))throw new TypeError("Invalid subfields choice (" + r + ") for " + this.toDebugString(e));
                var l = e.choiceSubfields[r];
                if (!Array.isArray(l) || 0 === l.length)throw new TypeError("Subfields required for subfields choice (" + r + ") in " + this.toDebugString(e));
                for (var n = 0; n < l.length; n++)this.checkData(l[n], i || !e["abstract"])
            }
        }
    }, e.prototype.setValue = function(e) {
        var i = FormFieldType[this.type].format;
        i && (this.value = "date" === i ? e ? new Date(e) : null : e)
    }, e.prototype.checkValue = function() {
        var e = this.validation && this.validation.required, i = FormFieldType[this.type].format, t = "undefined" == typeof this.value || null === this.value;
        return t || ("string" === i && 0 === this.value.trim().length && (t = !0), "boolean" !== i || this.value || (t = !0)), t ? !e : !0
    }, e.prototype.getOptions = function(e) {
        return e.options ? e.options : FormFieldType[e.type].options
    }, e.prototype.toDebugString = function(e) {
        var i = e || this;
        return i.id || i.label || i.question || JSON.stringify(i)
    }, e.prototype.guid = function() {
        var e = Date.now(), i = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(i) {
            var t = (e + 16 * Math.random()) % 16 | 0;
            return e = Math.floor(e / 16), ("x" === i ? t : 7 & t | 8).toString(16)
        });
        return i
    }, e
}(), Form = function() {
    function e(e) {
        this.checkData(e), this.id = e.id, this.title = e.title, this.fields = e.fields, this.help = e.help, this.fields = [], this.fieldMap = {};
        for (var i = 0; i < e.fields.length; i++)this.fields.push(new FormField(null, e.fields[i], this));
        this.currentField = null, this.nextField()
    }

    return e.prototype.hasPrevField = function(e) {
        return this.currentField !== this.fields[0].firstSubfield()
    }, e.prototype.hasNextField = function(e) {
        return this.currentField !== this.fields[this.fields.length - 1].lastSubfield()
    }, e.prototype.prevField = function(e) {
        if (this.currentField = this.getPrevField(this.currentField), !e)for (; this.currentField && this.currentField["abstract"];)this.currentField = this.getPrevField(this.currentField)
    }, e.prototype.nextField = function(e) {
        if (this.currentField = this.getNextField(this.currentField), !e)for (; this.currentField && this.currentField["abstract"];)this.currentField = this.getNextField(this.currentField)
    }, e.prototype.valid = function() {
        for (var e = 0; e < this.fields.length; e++)if (!this.fields[e].valid())return !1;
        return !0
    }, e.prototype.checkData = function(e) {
        if (!e.id)throw new TypeError("Form id required for " + this.toDebugString(e));
        if (!e.title)throw new TypeError("Form title required for " + this.toDebugString(e));
        if (!Array.isArray(e.fields) || 0 === e.fields.length)throw new TypeError("Form fields required for " + this.toDebugString(e))
    }, e.prototype.toDebugString = function(e) {
        var i = e || this;
        return i.id || i.title || JSON.stringify(i)
    }, e.prototype.getPrevField = function(e) {
        if (!e)return this.fields[this.fields.length - 1].lastSubfield();
        if (e.parentId) {
            var i = this.fieldMap[e.parentId];
            if (i.type === FormFieldType.group.name && i["abstract"]) {
                var t = i.subfields.indexOf(e);
                if (t > 0)return i.subfields[t - 1].lastSubfield()
            }
            if (i.type === FormFieldType.choiceGroup.name && i["abstract"]) {
                var r = i.choiceSubfields[i.choiceField.value];
                if (r) {
                    var o = r.indexOf(e);
                    if (0 === o)return i.choiceField.lastSubfield();
                    if (o > 0)return r[o - 1].lastSubfield()
                }
            }
            return i
        }
        var l = this.fields.indexOf(e);
        return l > 0 ? this.fields[l - 1].lastSubfield() : null
    }, e.prototype.getNextField = function(e, i) {
        if (!e)return this.fields[0];
        if (!i && e.type === FormFieldType.group.name && e["abstract"])return e.subfields[0];
        if (!i && e.type === FormFieldType.choiceGroup.name && e["abstract"])return e.choiceField;
        if (e.parentId) {
            var t = this.fieldMap[e.parentId];
            if (t.type === FormFieldType.group.name && t["abstract"]) {
                var r = t.subfields.indexOf(e);
                if (r < t.subfields.length - 1)return t.subfields[r + 1]
            }
            if (t.type === FormFieldType.choiceGroup.name && t["abstract"]) {
                var o = t.choiceSubfields[t.choiceField.value];
                if (o) {
                    if (t.choiceField === e)return o[0];
                    var l = o.indexOf(e);
                    if (l < o.length - 1)return o[l + 1]
                }
            }
            return this.getNextField(t, !0)
        }
        var n = this.fields.indexOf(e);
        return n < this.fields.length - 1 ? this.fields[n + 1] : null
    }, e
}();
angular.module("formieIonic").directive("tsErrorMessage", [function() {
    var e = {
        restrict: "E",
        scope: {message: "="},
        template: '<strong><i class="icon ion-alert"></i> {{message}}</strong>'
    };
    return e.link = function() {
    }, e
}]);