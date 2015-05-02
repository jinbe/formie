'use strict';

describe('Unit: Form', function() {
    var testForm = null;

    beforeEach(function() {
        testForm = new formieModel.Form(testFormData);
    });

    it('checks that it is well constructed', function() {
        var form = {};

        expect(createForm).toThrowError(TypeError, /id/i);
        form.id = 'testForm';

        expect(createForm).toThrowError(TypeError, /title/i);
        form.title = 'Test form';

        expect(createForm).toThrowError(TypeError, /fields/i);
        form.fields = {};
        expect(createForm).toThrowError(TypeError, /fields/i);
        form.fields = [];
        expect(createForm).toThrowError(TypeError, /fields/i);
        form.fields = [{}];

        expect(createForm).toThrowError(TypeError, /id/i);
        form.fields[0].id = 'testGroupField';

        expect(createForm).toThrowError(TypeError, /type/i);
        form.fields[0].type = 'group';

        expect(createForm).toThrowError(TypeError, /question/i);
        form.fields[0].abstract = true;

        expect(createForm).toThrowError(TypeError, /subfields/i);
        form.fields[0].subfields = [{
            id: 'testChoiceGroupField',
            type: 'wrongType',
            abstract: true
        }];

        expect(createForm).toThrowError(TypeError, /type/i);
        form.fields[0].subfields[0].type = 'choiceGroup';

        expect(createForm).toThrowError(TypeError, /choice field required/i);
        form.fields[0].subfields[0].choiceField = {
            id: 'testChoiceField',
            type: 'text',
            label: 'Test choice field'
        };

        expect(createForm).toThrowError(TypeError, /choice field type/i);
        form.fields[0].subfields[0].choiceField.type = 'option';

        expect(createForm).toThrowError(TypeError, /options/i);
        form.fields[0].subfields[0].choiceField.options = ['option1'];
        expect(createForm).toThrowError(TypeError, /options/i);
        form.fields[0].subfields[0].choiceField.options = ['option1', 'option2'];

        expect(createForm).toThrowError(TypeError, /choice subfields/i);
        form.fields[0].subfields[0].choiceSubfields = {};
        expect(createForm).toThrowError(TypeError, /choice subfields/i);
        form.fields[0].subfields[0].choiceSubfields = {
            badOption: []
        };

        expect(createForm).toThrowError(TypeError, /badOption/i);
        form.fields[0].subfields[0].choiceSubfields = {
            option2: []
        };

        expect(createForm).toThrowError(TypeError, /subfields/i);
        form.fields[0].subfields[0].choiceSubfields = {
            option2: [
                {
                    id: 'testSubfield1',
                    type: 'choiceGroup',
                    abstract: false,
                    question: 'Some question',
                    choiceField: {
                        id: 'testYesNo',
                        type: 'yesNo',
                        question: 'Yes or No?'
                    },
                    choiceSubfields: {
                        maybe: [{
                            id: 'nestedNonAbstractGroup',
                            type: 'group',
                            abstract: false,
                            label: 'This cannot be abstract',
                            subfields: [
                                {
                                    id: 'lastField',
                                    type: 'text',
                                    question: 'Write some text'
                                }
                            ]
                        }]
                    }
                },
                {
                    id: 'testSubfield1',
                    type: 'title',
                    label: 'Needs unique id'
                }
            ]
        };

        expect(createForm).toThrowError(TypeError, /invalid subfields choice/i);
        form.fields[0].subfields[0].choiceSubfields.option2[0].choiceSubfields.no = form.fields[0].subfields[0].choiceSubfields.option2[0].choiceSubfields.maybe;
        delete form.fields[0].subfields[0].choiceSubfields.option2[0].choiceSubfields.maybe;

        expect(createForm).toThrowError(TypeError, /inside non-abstract group/i);
        form.fields[0].subfields[0].choiceSubfields.option2[0].choiceSubfields.no[0].abstract = true;

        expect(createForm).toThrowError(TypeError, /duplicate form field id/i);
        form.fields[0].subfields[0].choiceSubfields.option2[1].id = 'testSubfield2';

        expect(createForm).not.toThrow();

        function createForm() {
            new formieModel.Form(form);
        }
    });

    it('can be converted to and parsed from a string', function() {
        var formWithoutValues = new formieModel.Form(JSON.parse(JSON.stringify(testForm)));
        expect(formWithoutValues).toEqual(testForm);

        var idsAndValues = [
            ['medicalSmokeCheck', 'yes'],
            ['medicalAlcoholFrequency', 'Rarely'],
            ['medicalAllergiesCheck', 'no'],
            ['medicalMedicationsCheck', 'yes'],
            ['medicalMedicationsDetails', 'panadol 2/day'],
            ['medicalHistoryDetails', 'Nothing serious'],
            ['medicalSurgeryCheck', 'yes'],
            ['medicalSurgeryDetails', 'knee surgery'],
            ['medicalHeight', 180],
            ['medicalWeight', 75],
            ['dateField', new Date()],
            ['checkField', true],
            ['medicalBloodPressure', {max: 120, min: 80}]
        ];

        for (var i = 0; i < idsAndValues.length; i++) {
            testForm.fieldMap[idsAndValues[i][0]].value = idsAndValues[i][1];
        }

        var formWithValues = new formieModel.Form(JSON.parse(JSON.stringify(testForm)));
        expect(formWithValues).toEqual(testForm);
    });

    it('returns the correct answerable fields', function() {
        var idsAndFields = [
            ['medicalSmokeCheckGroup', ['medicalSmokeCheck']],
            ['medicalSmokeCheck', ['medicalSmokeCheck']],
            ['medicalSmokeDetails', ['medicalSmokeAmount', 'medicalSmokeTime']],
            ['medicalSmokeAmount', ['medicalSmokeAmount']],
            ['medicalAlcoholFrequency', ['medicalAlcoholFrequency']],
            ['medicalHearthCheckGroup', ['medicalHearthCheck']]
        ];

        for (var i = 0; i < idsAndFields.length; i++) {
            expect(testForm.fieldMap[idsAndFields[i][0]].answerableFields()).toEqual(createFieldArray(idsAndFields[i][1]));
        }

        testForm.fieldMap.medicalSmokeCheck.value = 'yes';
        expect(testForm.fieldMap.medicalSmokeCheckGroup.answerableFields()).toEqual(createFieldArray(['medicalSmokeCheck', 'medicalSmokeAmount', 'medicalSmokeTime']));

        function createFieldArray(ids) {
            for (var i = 0; i < ids.length; i++) {
                ids[i] = testForm.fieldMap[ids[i]];
            }

            return ids;
        }
    });

    it('navigates fields', function() {
        var idsAndValues = [
            ['medicalSmokeCheck', 'yes'],
            ['medicalSmokeDetails', {medicalSmokeAmount: '5', medicalSmokeTime: '10 years'}],
            ['medicalAlcoholFrequency', 'Rarely'],
            ['medicalHearthCheckGroup', {medicalHearthCheck: 'no'}],
            ['medicalAllergiesCheck', 'no'],
            ['medicalMedicationsCheck', 'yes'],
            ['medicalMedicationsDetails', 'panadol 2/day'],
            ['medicalHistoryCheckGroup', {medicalHistoryCheck: 'yes', medicalHistoryDetails: 'Nothing serious'}],
            ['medicalSurgeryCheck', 'yes'],
            ['medicalSurgeryDetails', 'knee surgery'],
            ['medicalHeight', 180],
            ['medicalWeight', 75],
            ['dateField', new Date()],
            ['checkField', true],
            ['medicalBloodPressure', {max: 120, min: 80}]
        ];

        for (var fi = 0; fi < idsAndValues.length; fi++) {
            expect(testForm.currentField.id).toBe(idsAndValues[fi][0]);

            if (testForm.currentField.type === 'group') {
                for (var subfieldId in idsAndValues[fi][1]) {
                    testForm.fieldMap[subfieldId].value = idsAndValues[fi][1][subfieldId];
                }
            }
            else {
                testForm.currentField.value = idsAndValues[fi][1];
            }

            testForm.nextField();
        }

        expect(testForm.currentField).toBe(null);
        testForm.prevField();

        for (var bi = idsAndValues.length - 1; bi >= 0; bi--) {
            expect(testForm.currentField.id).toBe(idsAndValues[bi][0]);
            testForm.prevField();
        }

        expect(testForm.currentField).toBe(null);
    });

    it('validates fields', function() {
        var idsAndValues = [
            ['medicalSmokeCheck', 'yes'],
            ['medicalSmokeAmount', null],
            ['medicalSmokeTime', '10 years'],
            ['medicalAlcoholFrequency', 'Rarely'],
            ['medicalHearthCheck', 'no'],
            ['medicalAllergiesCheck', 'no'],
            ['medicalMedicationsCheck', 'yes'],
            ['medicalMedicationsDetails', 'panadol 2/day'],
            ['medicalHistoryCheck', 'yes'],
            ['medicalHistoryDetails', null],
            ['medicalSurgeryCheck', 'no'],
            ['medicalHeight', '180'],
            ['medicalWeight', '75'],
            ['dateField', new Date()],
            ['checkField', false],
            ['medicalBloodPressure', {max: 120, min: 80}]
        ];

        expect(testForm.valid()).toBeFalsy('in form');

        expect(testForm.fieldMap.medicalSmokeCheckGroup.valid()).toBeFalsy('in medicalSmokeCheckGroup');
        expect(testForm.fieldMap.medicalSmokeDetails.valid()).toBeFalsy('in medicalSmokeDetails');
        expect(testForm.fieldMap.medicalMedicationsCheckGroup.valid()).toBeFalsy('in medicalMedicationsCheckGroup');
        expect(testForm.fieldMap.medicalHistoryCheckGroup.valid()).toBeFalsy('in medicalHistoryCheckGroup');

        expect(testForm.fieldMap.medicalHeight.valid()).toBeFalsy('in medicalHeight');
        expect(testForm.fieldMap.medicalWeight.valid()).toBeTruthy('in medicalWeight');
        expect(testForm.fieldMap.dateField.valid()).toBeFalsy('in dateField');
        expect(testForm.fieldMap.checkField.valid()).toBeFalsy('in checkField');

        for (var fieldId in testForm.fieldMap) {
            var field = testForm.fieldMap[fieldId];
            if (!field.isGroup()) {
                var required = (field.validation && field.validation.required);
                expect(field.valid()).toBe(!required, 'in ' + field.id);
            }
        }

        for (var i = 0; i < idsAndValues.length; i++) {
            testForm.fieldMap[idsAndValues[i][0]].value = idsAndValues[i][1];
        }

        expect(testForm.valid()).toBeFalsy('in form');

        expect(testForm.fieldMap.medicalSmokeCheckGroup.valid()).toBeFalsy('in medicalSmokeCheckGroup');
        expect(testForm.fieldMap.medicalSmokeDetails.valid()).toBeFalsy('in medicalSmokeDetails');
        expect(testForm.fieldMap.medicalMedicationsCheckGroup.valid()).toBeTruthy('in medicalMedicationsCheckGroup');
        expect(testForm.fieldMap.medicalHistoryCheckGroup.valid()).toBeFalsy('in medicalHistoryCheckGroup');

        expect(testForm.fieldMap.medicalHeight.valid()).toBeTruthy('in medicalHeight');
        expect(testForm.fieldMap.medicalWeight.valid()).toBeTruthy('in medicalWeight');
        expect(testForm.fieldMap.dateField.valid()).toBeTruthy('in dateField');
        expect(testForm.fieldMap.checkField.valid()).toBeFalsy('in checkField');

        testForm.fieldMap.medicalSmokeAmount.value = '5 per day';
        testForm.fieldMap.medicalHistoryDetails.value = 'Nothing serious';
        testForm.fieldMap.checkField.value = true;

        expect(testForm.valid()).toBeTruthy('in form');

        expect(testForm.fieldMap.medicalSmokeCheckGroup.valid()).toBeTruthy('in medicalSmokeCheckGroup');
        expect(testForm.fieldMap.medicalSmokeDetails.valid()).toBeTruthy('in medicalSmokeDetails');
        expect(testForm.fieldMap.medicalHistoryCheckGroup.valid()).toBeTruthy('in medicalHistoryCheckGroup');

        expect(testForm.fieldMap.checkField.valid()).toBeTruthy('in checkField');
    });
});
