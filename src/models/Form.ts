/// <reference path="Interfaces.ts" />
/// <reference path="FormField.ts" />

'use strict';

/**
 * @tsdoc model.class
 * @name Form
 *
 * @description
 * Model for a form.
 */
class Form {
    // data
    id: string;
    title: string;
    fields: FormField[];
    help: HelpData;

    // indexing
    fieldMap: {[fieldId: string]: FormField};

    // state
    currentField: FormField;

    constructor(formData: Form) {
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

    hasPrevField(includeNonAnswerable?: boolean) {
        return (this.currentField !== this.fields[0].firstSubfield());
    }

    hasNextField(includeNonAnswerable?: boolean) {
        return (this.currentField !== this.fields[this.fields.length - 1].lastSubfield());
    }

    prevField(includeNonAnswerable?: boolean) {
        this.currentField = this.getPrevField(this.currentField);

        if (!includeNonAnswerable) {
            while (this.currentField && this.currentField.abstract) {
                this.currentField = this.getPrevField(this.currentField);
            }
        }
    }

    nextField(includeNonAnswerable?: boolean) {
        this.currentField = this.getNextField(this.currentField);

        if (!includeNonAnswerable) {
            while (this.currentField && this.currentField.abstract) {
                this.currentField = this.getNextField(this.currentField);
            }
        }
    }

    valid(): boolean {
        for (var i = 0; i < this.fields.length; i++) {
            if (!this.fields[i].valid()) {
                return false;
            }
        }

        return true;
    }

    private checkData(formData: Form) {
        if (!formData.id) {
            throw new TypeError('Form id required for ' + this.toDebugString(formData));
        }

        if (!formData.title) {
            throw new TypeError('Form title required for ' + this.toDebugString(formData));
        }

        if (!Array.isArray(formData.fields) || formData.fields.length === 0) {
            throw new TypeError('Form fields required for ' + this.toDebugString(formData));
        }
    }

    private toDebugString(formData?: Form): string {
        var data = (formData || this);
        return (data.id || data.title || JSON.stringify(data));
    }

    private getPrevField(currentField: FormField) {
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
    }

    private getNextField(currentField: FormField, skipNested?: boolean) {
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
    }
}
