/// <reference path="Interfaces.ts" />
/// <reference path="Form.ts" />

'use strict';

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
class FormField {
    // field input data
    id: string;
    type: string;
    question: string;
    label: string;
    placeholder: string;
    options: any[];
    validation: ValidationData;
    help: HelpData;

    // group input data
    abstract: boolean;
    subfields: FormField[];
    choiceField: FormField;
    choiceSubfields: {[option: string]: FormField[]};

    // generated data
    parentId: string;

    // value data
    value: any;

    constructor(parentId: string, formFieldData: FormField, form: Form) {
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

    isGroup(formFieldData?: FormField): boolean {
        var fieldType = (formFieldData ? formFieldData.type : this.type);
        return (fieldType === FormFieldType.group.name || fieldType === FormFieldType.choiceGroup.name);
    }

    isDiscrete(formFieldData?: FormField): boolean {
        var fieldType = (formFieldData ? formFieldData.type : this.type);
        return (FormFieldType[fieldType].format === 'discrete');
    }

    answerableFields(): FormField[] {
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
    }

    firstSubfield(): FormField {
        if (this.isGroup() && this.abstract) {
            if (this.type === FormFieldType.group.name) {
                return this.subfields[0].firstSubfield();
            }

            return this.choiceField.firstSubfield();
        }

        return this;
    }

    lastSubfield(): FormField {
        if (this.isGroup() && this.abstract) {
            var subfields = (this.type === FormFieldType.group.name ? this.subfields : this.choiceSubfields[this.choiceField.value]);
            if (subfields) {
                return subfields[subfields.length - 1].lastSubfield();
            }

            return this.choiceField.lastSubfield();
        }

        return this;
    }

    valid(): boolean {
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
    }

    private checkData(formFieldData: FormField, checkAbstract?: boolean) {
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
    }

    private setValue(value) {
        var format = FormFieldType[this.type].format;
        if (format) {
            if (format === 'date') {
                this.value = (value ? new Date(value) : null);
            }
            else {
                this.value = value;
            }
        }
    }

    private checkValue(): boolean {
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
    }

    private getOptions(formFieldData: FormField): any[] {
        if (!formFieldData.options) {
            return FormFieldType[formFieldData.type].options;
        }

        return formFieldData.options;
    }

    private toDebugString(formFieldData?: FormField): string {
        var fieldData = (formFieldData || this);
        return (fieldData.id || fieldData.label || fieldData.question || JSON.stringify(fieldData));
    }

    private guid(): string {
        var now = Date.now();
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (now + Math.random() * 16) % 16 | 0; // jshint ignore:line
            now = Math.floor(now / 16);

            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16); // jshint ignore:line
        });

        return guid;
    }
}
