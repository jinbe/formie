/// <reference path="Enums.ts" />

'use strict';

module formieModel {
    /**
     * @tsdoc model.interface
     * @name ValidationData
     *
     * @description
     * Validation rules for a form field.
     *
     * @property {boolean} required If the field is required.
     * @property {string} naCheck A checkbox is shown with this message to ignore validation (eg. I don't know my blood pressure).
     * @property {string} confirm The id of the field to match (eg. the id of another field with the password to confirm).
     */
    export interface ValidationData {
        required: boolean;
        naCheck: string;
        confirm: string;
    }

    /**
     * @tsdoc model.interface
     * @name HelpData
     *
     * @description
     * Help options for a form field.
     *
     * @property {string} popupLink Text show in the link to open a help popup (if not provided the help message is shown in place).
     * @property {string} text Help message to display (as text).
     * @property {string} html Help message to display (as html).
     */
    export interface HelpData {
        popupLink?: string;
        text?: string;
        html?: string;
    }
}
