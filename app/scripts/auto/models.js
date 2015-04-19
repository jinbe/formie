'use strict';

/**
 * @tsdoc model.enum
 * @name FormFieldType
 *
 * @description
 * Enumerates all the possible field types.
 */
var FormFieldType = {
    /**
     * @name FormFieldType.group
     *
     * @description
     * A field group
     */
    group: {
        name: 'group'
    },
    /**
     * @name FormFieldType.choiceGroup
     *
     * @description
     * A conditional field group
     */
    choiceGroup: {
        name: 'choiceGroup'
    },
    /**
     * @name FormFieldType.address
     *
     * @description
     * Address input
     */
    address: {
        name: 'address',
        format: 'string'
    },
    /**
     * @name FormFieldType.bloodPressure
     *
     * @description
     * Blood pressure input
     */
    bloodPressure: {
        name: 'bloodPressure',
        format: 'custom'
    },
    /**
     * @name FormFieldType.check
     *
     * @description
     * Checkbox input
     */
    check: {
        name: 'check',
        format: 'boolean'
    },
    /**
     * @name FormFieldType.date
     *
     * @description
     * Date picker
     */
    date: {
        name: 'date',
        format: 'date'
    },
    /**
     * @name FormFieldType.doctor
     *
     * @description
     * Doctor input
     */
    doctor: {
        name: 'doctor',
        format: 'string'
    },
    /**
     * @name FormFieldType.email
     *
     * @description
     * Email input
     */
    email: {
        name: 'email',
        format: 'string'
    },
    /**
     * @name FormFieldType.gender
     *
     * @description
     * Gender selector
     */
    gender: {
        name: 'gender',
        format: 'discrete',
        options: [
            'male',
            'female'
        ]
    },
    /**
     * @name FormFieldType.height
     *
     * @description
     * Height input
     */
    height: {
        name: 'height',
        format: 'number'
    },
    /**
     * @name FormFieldType.month
     *
     * @description
     * Month picker
     */
    month: {
        name: 'month',
        format: 'date'
    },
    /**
     * @name FormFieldType.option
     *
     * @description
     * Option selector
     */
    option: {
        name: 'option',
        format: 'discrete'
    },
    /**
     * @name FormFieldType.password
     *
     * @description
     * Password input
     */
    password: {
        name: 'password',
        format: 'string'
    },
    /**
     * @name FormFieldType.phone
     *
     * @description
     * Phone input
     */
    phone: {
        name: 'phone',
        format: 'string'
    },
    /**
     * @name FormFieldType.text
     *
     * @description
     * Text input
     */
    text: {
        name: 'text',
        format: 'string'
    },
    /**
     * @name FormFieldType.textArea
     *
     * @description
     * Text area input
     */
    textArea: {
        name: 'textArea',
        format: 'string'
    },
    /**
     * @name FormFieldType.title
     *
     * @description
     * Title selector
     */
    title: {
        name: 'title',
        format: 'discrete',
        options: [
            'Mr',
            'Mrs',
            'Ms',
            'Miss',
            'Dr',
            'Prof'
        ]
    },
    /**
     * @name FormFieldType.weight
     *
     * @description
     * Weight input
     */
    weight: {
        name: 'weight',
        format: 'number'
    },
    /**
     * @name FormFieldType.yesNo
     *
     * @description
     * Yes/No selector
     */
    yesNo: {
        name: 'yesNo',
        format: 'discrete',
        options: [
            'yes',
            'no'
        ]
    }
};
/// <reference path="Enums.ts" />
/// <reference path="Interfaces.ts" />
/// <reference path="Form.ts" />
/**
 * @tsdoc model.class
 * @name FormField
 *
 * @description
 * Model for a form field.
 *
 * @property {string} id The field id.
 * @property {string} type Field type (options described in FormFieldType).
 * @property {string} question Field question or instructions.
 * @property {string} label Field label.
 * @property {string} placeholder Field placeholder.
 * @property {string[]} options array of options Field options (specific to type 'option').
 * @property {ValidationData} validation Validation rules.
 * @property {HelpData} help Help options.
 * @property {boolean} abstract If the group field is abstract (specific to types 'group' and 'choiceGroup').
 * @property {FormField[]} subfields Array of subfields (specific to type 'group').
 * @property {FormField} choiceField The field whose answer is linked to the choiceSubfields (specific to type 'choiceGroup').
 * @property {Object.<string, FormField[]>} choiceSubfields A map containing the subfields for each choice (specific to type 'choiceGroup').
 */
var FormField = (function () {
    function FormField(parentId, formFieldData, form) {
        this.checkData(formFieldData);
        if (formFieldData.id && (formFieldData.id in form.fieldMap)) {
            throw new TypeError('Duplicate form field id (' + formFieldData.id + ')');
        }
        this.id = (formFieldData.id || this.guid());
        this.type = formFieldData.type;
        this.question = (formFieldData.question || formFieldData.label);
        this.label = (formFieldData.label || formFieldData.question);
        this.placeholder = (formFieldData.placeholder || formFieldData.label || formFieldData.question);
        this.options = this.getOptions(formFieldData);
        this.validation = formFieldData.validation;
        this.help = formFieldData.help;
        this.value = null;
        this.abstract = formFieldData.abstract;
        if (formFieldData.subfields) {
            this.subfields = [];
            for (var si = 0; si < formFieldData.subfields.length; si++) {
                this.subfields.push(new FormField(this.id, formFieldData.subfields[si], form));
            }
        }
        if (formFieldData.choiceField) {
            this.choiceField = new FormField(this.id, formFieldData.choiceField, form);
        }
        if (formFieldData.choiceSubfields) {
            this.choiceSubfields = {};
            for (var option in formFieldData.choiceSubfields) {
                this.choiceSubfields[option] = [];
                var choiceSubfields = formFieldData.choiceSubfields[option];
                for (var ci = 0; ci < choiceSubfields.length; ci++) {
                    this.choiceSubfields[option].push(new FormField(this.id, choiceSubfields[ci], form));
                }
            }
        }
        this.parentId = parentId;
        this.setValue(formFieldData.value);
        form.fieldMap[this.id] = this;
    }
    FormField.prototype.isGroup = function (formFieldData) {
        var fieldType = (formFieldData ? formFieldData.type : this.type);
        return (fieldType === FormFieldType.group.name || fieldType === FormFieldType.choiceGroup.name);
    };
    FormField.prototype.isDiscrete = function (formFieldData) {
        var fieldType = (formFieldData ? formFieldData.type : this.type);
        return (FormFieldType[fieldType].format === 'discrete');
    };
    FormField.prototype.answerableFields = function () {
        var fields = [];
        if (!this.isGroup()) {
            fields.push(this);
        }
        if (this.type === FormFieldType.group.name) {
            for (var si = 0; si < this.subfields.length; si++) {
                fields = fields.concat(this.subfields[si].answerableFields());
            }
        }
        if (this.type === FormFieldType.choiceGroup.name) {
            fields = fields.concat(this.choiceField.answerableFields());
            var choice = this.choiceField.value;
            if (choice in this.choiceSubfields) {
                var subfields = this.choiceSubfields[choice];
                for (var ci = 0; ci < subfields.length; ci++) {
                    fields = fields.concat(subfields[ci].answerableFields());
                }
            }
        }
        return fields;
    };
    FormField.prototype.firstSubfield = function () {
        if (this.isGroup() && this.abstract) {
            if (this.type === FormFieldType.group.name) {
                return this.subfields[0].firstSubfield();
            }
            return this.choiceField.firstSubfield();
        }
        return this;
    };
    FormField.prototype.lastSubfield = function () {
        if (this.isGroup() && this.abstract) {
            var subfields = (this.type === FormFieldType.group.name ? this.subfields : this.choiceSubfields[this.choiceField.value]);
            if (subfields) {
                return subfields[subfields.length - 1].lastSubfield();
            }
            return this.choiceField.lastSubfield();
        }
        return this;
    };
    FormField.prototype.valid = function () {
        if (this.isGroup()) {
            var subfields = (this.type === FormFieldType.group.name ? this.subfields : this.choiceSubfields[this.choiceField.value]);
            if (subfields) {
                for (var i = 0; i < subfields.length; i++) {
                    if (!subfields[i].valid()) {
                        return false;
                    }
                }
            }
            return (this.type === FormFieldType.group.name ? true : this.choiceField.valid());
        }
        return this.checkValue();
    };
    FormField.prototype.checkData = function (formFieldData, checkAbstract) {
        if (!this.isGroup(formFieldData) && !formFieldData.id) {
            throw new TypeError('Form field id required for ' + this.toDebugString(formFieldData));
        }
        if (!(formFieldData.type in FormFieldType)) {
            throw new TypeError('Invalid form field type (' + formFieldData.type + ') for ' + this.toDebugString(formFieldData));
        }
        if ((!this.isGroup(formFieldData) || (formFieldData.type === FormFieldType.group.name && !formFieldData.abstract)) && !formFieldData.question && !formFieldData.label) {
            throw new TypeError('Form field question or label required for ' + this.toDebugString(formFieldData));
        }
        if (formFieldData.type === FormFieldType.option.name && (!Array.isArray(formFieldData.options) || formFieldData.options.length < 2)) {
            throw new TypeError('Form field options required (at least 2) for ' + this.toDebugString(formFieldData));
        }
        if (this.isGroup(formFieldData) && checkAbstract && !formFieldData.abstract) {
            throw new TypeError('Groups inside non-abstract group have to be abstract ' + this.toDebugString(formFieldData));
        }
        if (formFieldData.type === FormFieldType.group.name) {
            if (!Array.isArray(formFieldData.subfields) || formFieldData.subfields.length === 0) {
                throw new TypeError('Subfields required for group field ' + this.toDebugString(formFieldData));
            }
            for (var si = 0; si < formFieldData.subfields.length; si++) {
                this.checkData(formFieldData.subfields[si], (checkAbstract || !formFieldData.abstract));
            }
        }
        if (formFieldData.type === FormFieldType.choiceGroup.name) {
            if (!formFieldData.choiceField) {
                throw new TypeError('Choice field required for choice group field ' + this.toDebugString(formFieldData));
            }
            this.checkData(formFieldData.choiceField, (checkAbstract || !formFieldData.abstract));
            if (!this.isDiscrete(formFieldData.choiceField)) {
                throw new TypeError('Invalid choice field type (' + formFieldData.choiceField.type + ') for ' + this.toDebugString(formFieldData.choiceField));
            }
            if (!formFieldData.choiceSubfields || Object.keys(formFieldData.choiceSubfields).length === 0) {
                throw new TypeError('Form field choice subfields required for ' + this.toDebugString(formFieldData));
            }
            for (var choice in formFieldData.choiceSubfields) {
                var options = this.getOptions(formFieldData.choiceField);
                if (options.indexOf(choice) === -1) {
                    throw new TypeError('Invalid subfields choice (' + choice + ') for ' + this.toDebugString(formFieldData));
                }
                var subfields = formFieldData.choiceSubfields[choice];
                if (!Array.isArray(subfields) || subfields.length === 0) {
                    throw new TypeError('Subfields required for subfields choice (' + choice + ') in ' + this.toDebugString(formFieldData));
                }
                for (var ci = 0; ci < subfields.length; ci++) {
                    this.checkData(subfields[ci], (checkAbstract || !formFieldData.abstract));
                }
            }
        }
    };
    FormField.prototype.setValue = function (value) {
        var format = FormFieldType[this.type].format;
        if (format) {
            if (format === 'date') {
                this.value = (value ? new Date(value) : null);
            }
            else {
                this.value = value;
            }
        }
    };
    FormField.prototype.checkValue = function () {
        var required = (this.validation && this.validation.required);
        var format = FormFieldType[this.type].format;
        var missing = (typeof this.value === 'undefined' || this.value === null);
        if (!missing) {
            if (format === 'string' && this.value.trim().length === 0) {
                missing = true;
            }
            if (format === 'boolean' && !this.value) {
                missing = true;
            }
        }
        if (missing) {
            return !required;
        }
        return true;
    };
    FormField.prototype.getOptions = function (formFieldData) {
        if (!formFieldData.options) {
            return FormFieldType[formFieldData.type].options;
        }
        return formFieldData.options;
    };
    FormField.prototype.toDebugString = function (formFieldData) {
        var fieldData = (formFieldData || this);
        return (fieldData.id || fieldData.label || fieldData.question || JSON.stringify(fieldData));
    };
    FormField.prototype.guid = function () {
        var now = Date.now();
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (now + Math.random() * 16) % 16 | 0; // jshint ignore:line
            now = Math.floor(now / 16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16); // jshint ignore:line
        });
        return guid;
    };
    return FormField;
})();
/// <reference path="Interfaces.ts" />
/// <reference path="FormField.ts" />
/**
 * @tsdoc model.class
 * @name Form
 *
 * @description
 * Model for a form.
 */
var Form = (function () {
    function Form(formData) {
        this.checkData(formData);
        this.id = formData.id;
        this.title = formData.title;
        this.fields = formData.fields;
        this.help = formData.help;
        this.fields = [];
        this.fieldMap = {};
        for (var i = 0; i < formData.fields.length; i++) {
            this.fields.push(new FormField(null, formData.fields[i], this));
        }
        this.currentField = null;
        this.nextField();
    }
    Form.prototype.hasPrevField = function (includeNonAnswerable) {
        return (this.currentField !== this.fields[0].firstSubfield());
    };
    Form.prototype.hasNextField = function (includeNonAnswerable) {
        return (this.currentField !== this.fields[this.fields.length - 1].lastSubfield());
    };
    Form.prototype.prevField = function (includeNonAnswerable) {
        this.currentField = this.getPrevField(this.currentField);
        if (!includeNonAnswerable) {
            while (this.currentField && this.currentField.abstract) {
                this.currentField = this.getPrevField(this.currentField);
            }
        }
    };
    Form.prototype.nextField = function (includeNonAnswerable) {
        this.currentField = this.getNextField(this.currentField);
        if (!includeNonAnswerable) {
            while (this.currentField && this.currentField.abstract) {
                this.currentField = this.getNextField(this.currentField);
            }
        }
    };
    Form.prototype.valid = function () {
        for (var i = 0; i < this.fields.length; i++) {
            if (!this.fields[i].valid()) {
                return false;
            }
        }
        return true;
    };
    Form.prototype.checkData = function (formData) {
        if (!formData.id) {
            throw new TypeError('Form id required for ' + this.toDebugString(formData));
        }
        if (!formData.title) {
            throw new TypeError('Form title required for ' + this.toDebugString(formData));
        }
        if (!Array.isArray(formData.fields) || formData.fields.length === 0) {
            throw new TypeError('Form fields required for ' + this.toDebugString(formData));
        }
    };
    Form.prototype.toDebugString = function (formData) {
        var data = (formData || this);
        return (data.id || data.title || JSON.stringify(data));
    };
    Form.prototype.getPrevField = function (currentField) {
        if (!currentField) {
            return this.fields[this.fields.length - 1].lastSubfield();
        }
        if (currentField.parentId) {
            var parentField = this.fieldMap[currentField.parentId];
            if (parentField.type === FormFieldType.group.name && parentField.abstract) {
                var si = parentField.subfields.indexOf(currentField);
                if (si > 0) {
                    return parentField.subfields[si - 1].lastSubfield();
                }
            }
            if (parentField.type === FormFieldType.choiceGroup.name && parentField.abstract) {
                var subfields = parentField.choiceSubfields[parentField.choiceField.value];
                if (subfields) {
                    var ci = subfields.indexOf(currentField);
                    if (ci === 0) {
                        return parentField.choiceField.lastSubfield();
                    }
                    else if (ci > 0) {
                        return subfields[ci - 1].lastSubfield();
                    }
                }
            }
            return parentField;
        }
        var fieldIndex = this.fields.indexOf(currentField);
        if (fieldIndex > 0) {
            return this.fields[fieldIndex - 1].lastSubfield();
        }
        return null;
    };
    Form.prototype.getNextField = function (currentField, skipNested) {
        if (!currentField) {
            return this.fields[0];
        }
        if (!skipNested && currentField.type === FormFieldType.group.name && currentField.abstract) {
            return currentField.subfields[0];
        }
        if (!skipNested && currentField.type === FormFieldType.choiceGroup.name && currentField.abstract) {
            return currentField.choiceField;
        }
        if (currentField.parentId) {
            var parentField = this.fieldMap[currentField.parentId];
            if (parentField.type === FormFieldType.group.name && parentField.abstract) {
                var si = parentField.subfields.indexOf(currentField);
                if (si < parentField.subfields.length - 1) {
                    return parentField.subfields[si + 1];
                }
            }
            if (parentField.type === FormFieldType.choiceGroup.name && parentField.abstract) {
                var subfields = parentField.choiceSubfields[parentField.choiceField.value];
                if (subfields) {
                    if (parentField.choiceField === currentField) {
                        return subfields[0];
                    }
                    var ci = subfields.indexOf(currentField);
                    if (ci < subfields.length - 1) {
                        return subfields[ci + 1];
                    }
                }
            }
            return this.getNextField(parentField, true);
        }
        var fieldIndex = this.fields.indexOf(currentField);
        if (fieldIndex < this.fields.length - 1) {
            return this.fields[fieldIndex + 1];
        }
        return null;
    };
    return Form;
})();
