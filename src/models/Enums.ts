'use strict';

module formie {
    /**
     * @tsdoc model.enum
     * @name FormFieldType
     *
     * @description
     * Enumerates all the possible field types.
     */
    export var FormFieldType = {
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
}
