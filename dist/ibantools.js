/*!
 * @license
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
define(["require", "exports"], function (require, exports) {
    /**
     * Validation, extraction and creation of IBAN, BBAN, BIC/SWIFT numbers plus some other helpful stuff
     * @packageDocumentation
     * @author Saša Jovanić
     * @module ibantools
     * @version 3.2.2
     * @license MPL-2.0
     * @preferred
     */
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extractBIC = exports.isValidBIC = exports.getCountrySpecifications = exports.friendlyFormatIBAN = exports.electronicFormatIBAN = exports.extractIBAN = exports.composeIBAN = exports.isSEPACountry = exports.isValidBBAN = exports.isValidIBAN = void 0;
    /**
     * Validate IBAN
     * ```
     * // returns true
     * ibantools.isValidIBAN("NL91ABNA0517164300");
     * ```
     * ```
     * // returns false
     * ibantools.isValidIBAN("NL92ABNA0517164300");
     * ```
     */
    function isValidIBAN(iban) {
        if (iban !== undefined && iban !== null) {
            var reg = new RegExp('^[0-9]{2}$', '');
            var spec = countrySpecs[iban.slice(0, 2)];
            if (spec !== undefined &&
                spec.bban_regexp &&
                spec.bban_regexp !== null &&
                spec.chars &&
                spec.chars === iban.length &&
                reg.test(iban.slice(2, 4)) &&
                checkFormatBBAN(iban.slice(4), spec.bban_regexp) &&
                isValidIBANChecksum(iban)) {
                return true;
            }
        }
        return false;
    }
    exports.isValidIBAN = isValidIBAN;
    /**
     * Validate BBAN
     *
     * ```
     * // returns true
     * ibantools.isValidBBAN("ABNA0517164300", "NL");
     * ```
     * ```
     * // returns false
     * ibantools.isValidBBAN("A7NA0517164300", "NL");
     * ```
     */
    function isValidBBAN(bban, countryCode) {
        if (bban !== undefined && bban !== null && countryCode !== undefined && countryCode !== null) {
            var spec = countrySpecs[countryCode];
            if (spec !== undefined &&
                spec !== null &&
                spec.bban_regexp &&
                spec.bban_regexp !== null &&
                spec.chars &&
                spec.chars !== null &&
                spec.chars - 4 === bban.length &&
                checkFormatBBAN(bban, spec.bban_regexp)) {
                return true;
            }
        }
        return false;
    }
    exports.isValidBBAN = isValidBBAN;
    /**
     * Validate if country code is from a SEPA country
     * ```
     * // returns true
     * ibantools.isSEPACountry("NL");
     * ```
     * ```
     * // returns false
     * ibantools.isSEPACountry("PK");
     * ```
     */
    function isSEPACountry(countryCode) {
        if (countryCode !== undefined && countryCode !== null) {
            var spec = countrySpecs[countryCode];
            if (spec !== undefined) {
                return spec.SEPA ? spec.SEPA : false;
            }
        }
        return false;
    }
    exports.isSEPACountry = isSEPACountry;
    /**
     * composeIBAN
     *
     * ```
     * // returns NL91ABNA0417164300
     * ibantools.composeIBAN("NL", "ABNA0417164300");
     * ```
     */
    function composeIBAN(params) {
        var formated_bban = electronicFormatIBAN(params.bban) || '';
        if (params.countryCode === null || params.countryCode === undefined) {
            return null;
        }
        var spec = countrySpecs[params.countryCode];
        if (formated_bban !== '' &&
            spec !== undefined &&
            spec.chars &&
            spec.chars !== null &&
            spec.chars === formated_bban.length + 4 &&
            spec.bban_regexp &&
            spec.bban_regexp !== null &&
            checkFormatBBAN(formated_bban, spec.bban_regexp)) {
            var checksom = mod9710(params.countryCode + '00' + formated_bban);
            return params.countryCode + ('0' + (98 - checksom)).slice(-2) + formated_bban;
        }
        return null;
    }
    exports.composeIBAN = composeIBAN;
    /**
     * extractIBAN
     * ```
     * // returns {iban: "NL91ABNA0417164300", bban: "ABNA0417164300", countryCode: "NL", valid: true}
     * ibantools.extractIBAN("NL91 ABNA 0417 1643 00");
     * ```
     */
    function extractIBAN(iban) {
        var result = {};
        result.iban = iban;
        if (isValidIBAN(iban)) {
            result.bban = iban.slice(4);
            result.countryCode = iban.slice(0, 2);
            result.valid = true;
        }
        else {
            result.valid = false;
        }
        return result;
    }
    exports.extractIBAN = extractIBAN;
    /**
     * Check BBAN format
     *
     * @ignore
     */
    function checkFormatBBAN(bban, bformat) {
        var reg = new RegExp(bformat, '');
        return reg.test(bban);
    }
    /**
     * Get IBAN in electronic format (no spaces)
     * IBAN validation is not performed.
     * When non-string value for IBAN is provided, returns null.
     * ```
     * // returns "NL91ABNA0417164300"
     * ibantools.electronicFormatIBAN("NL91 ABNA 0417 1643 00");
     * ```
     */
    function electronicFormatIBAN(iban) {
        if (typeof iban !== 'string') {
            return null;
        }
        return iban.replace(/[-\ ]/g, '').toUpperCase();
    }
    exports.electronicFormatIBAN = electronicFormatIBAN;
    /**
     * Get IBAN in friendly format (separated after every 4 characters)
     * IBAN validation is not performed.
     * When non-string value for IBAN is provided, returns null.
     * ```
     * // returns "NL91 ABNA 0417 1643 00"
     * ibantools.friendlyFormatIBAN("NL91ABNA0417164300");
     * ```
     * ```
     * // returns "NL91-ABNA-0417-1643-00"
     * ibantools.friendlyFormatIBAN("NL91ABNA0417164300","-");
     * ```
     */
    function friendlyFormatIBAN(iban, separator) {
        if (typeof iban !== 'string') {
            return null;
        }
        if (separator === undefined || separator === null) {
            separator = ' ';
        }
        var electronic_iban = electronicFormatIBAN(iban);
        if (electronic_iban === null) {
            return null;
        }
        return electronic_iban.replace(/(.{4})(?!$)/g, '$1' + separator);
    }
    exports.friendlyFormatIBAN = friendlyFormatIBAN;
    /**
     * Calculate checksum of IBAN and compares it with checksum provided in IBAN Registry
     *
     * @ignore
     */
    function isValidIBANChecksum(iban) {
        var providedChecksum = parseInt(iban.slice(2, 4), 10);
        var temp = iban.slice(3) + iban.slice(0, 2) + '00';
        var validationString = '';
        for (var n = 1; n < temp.length; n++) {
            var c = temp.charCodeAt(n);
            if (c >= 65) {
                validationString += (c - 55).toString();
            }
            else {
                validationString += temp[n];
            }
        }
        while (validationString.length > 2) {
            var part = validationString.slice(0, 6);
            validationString = (parseInt(part, 10) % 97).toString() + validationString.slice(part.length);
        }
        var rest = parseInt(validationString, 10) % 97;
        return 98 - rest === providedChecksum;
    }
    /**
     * MOD-97-10
     *
     * @ignore
     */
    function mod9710(iban) {
        iban = iban.slice(3) + iban.slice(0, 4);
        var validationString = '';
        for (var n = 1; n < iban.length; n++) {
            var c = iban.charCodeAt(n);
            if (c >= 65) {
                validationString += (c - 55).toString();
            }
            else {
                validationString += iban[n];
            }
        }
        while (validationString.length > 2) {
            var part = validationString.slice(0, 6);
            validationString = (parseInt(part, 10) % 97).toString() + validationString.slice(part.length);
        }
        return parseInt(validationString, 10) % 97;
    }
    /**
     * Returns specifications for all countries, even those who are not
     * members of IBAN registry. `IBANRegistry` field indicates if country
     * is member of not.
     *
     * ```
     * // Validating IBAN form field after user selects his country
     * // <select id="countries">
     * //   ...
     * //   <option value="NL">Netherlands</option>
     * //   ...
     * // </select>
     * $("#countries").select(function() {
     *   // Find country
     *   let country = ibantools.getCountrySpecifications()[$(this).val()];
     *   // Add country code letters to IBAN form field
     *   $("input#iban").value($(this).val());
     *   // Add new value to "pattern" attribute to #iban input text field
     *   $("input#iban").attr("pattern", $(this).val() + "[0-9]{2}" + country.bban_regexp.slice(1).replace("$",""));
     * });
     * ```
     */
    function getCountrySpecifications() {
        var countyMap = {};
        for (var countyCode in countrySpecs) {
            var county = countrySpecs[countyCode];
            countyMap[countyCode] = {
                chars: county.chars ? county.chars : null,
                bban_regexp: county.bban_regexp ? county.bban_regexp : null,
                IBANRegistry: county.IBANRegistry ? county.IBANRegistry : false,
                SEPA: county.SEPA ? county.SEPA : false,
            };
        }
        return countyMap;
    }
    exports.getCountrySpecifications = getCountrySpecifications;
    /**
     * Validate BIC/SWIFT
     *
     * ```
     * // returns true
     * ibantools.isValidBIC("ABNANL2A");
     *
     * // returns true
     * ibantools.isValidBIC("NEDSZAJJXXX");
     *
     * // returns false
     * ibantools.isValidBIC("ABN4NL2A");
     *
     * // returns false
     * ibantools.isValidBIC("ABNA NL 2A");
     * ```
     */
    function isValidBIC(bic) {
        if (!bic) {
            return false;
        }
        var reg = new RegExp('^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$', '');
        var spec = countrySpecs[bic.toUpperCase().slice(4, 6)];
        return reg.test(bic) && spec !== undefined;
    }
    exports.isValidBIC = isValidBIC;
    /**
     * extractBIC
     * ```
     * // returns {bankCode: "ABNA", countryCode: "NL", locationCode: "2A", branchCode: null, testBIC: flase, valid: true}
     * ibantools.extractBIC("ABNANL2A");
     * ```
     */
    function extractBIC(inputBic) {
        var result = {};
        var bic = inputBic.toUpperCase();
        if (isValidBIC(bic)) {
            result.bankCode = bic.slice(0, 4);
            result.countryCode = bic.slice(4, 6);
            result.locationCode = bic.slice(6, 8);
            result.testBIC = result.locationCode[1] === '0' ? true : false;
            result.branchCode = bic.length > 8 ? bic.slice(8) : '619';
            result.valid = true;
        }
        else {
            result.valid = false;
        }
        return result;
    }
    exports.extractBIC = extractBIC;
    /**
     * Country specifications
     * @ignore
     */
    var countrySpecs = {
        AD: {
            chars: 24,
            bban_regexp: '^[0-9]{8}[A-Z0-9]{12}$',
            IBANRegistry: true,
        },
        AE: {
            chars: 23,
            bban_regexp: '^[0-9]{3}[0-9]{16}$',
            IBANRegistry: true,
        },
        AF: {},
        AG: {},
        AI: {},
        AL: {
            chars: 28,
            bban_regexp: '^[0-9]{8}[A-Z0-9]{16}$',
            IBANRegistry: true,
        },
        AM: {},
        AO: {
            chars: 25,
            bban_regexp: '^[0-9]{21}$',
        },
        AQ: {},
        AR: {},
        AS: {},
        AT: { chars: 20, bban_regexp: '^[0-9]{16}$', IBANRegistry: true, SEPA: true },
        AU: {},
        AW: {},
        AX: {
            chars: 18,
            bban_regexp: '^[0-9]{14}$',
            IBANRegistry: true,
        },
        AZ: {
            chars: 28,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{20}$',
            IBANRegistry: true,
        },
        BA: {
            chars: 20,
            bban_regexp: '^[0-9]{16}$',
            IBANRegistry: true,
        },
        BB: {},
        BD: {},
        BE: { chars: 16, bban_regexp: '^[0-9]{12}$', IBANRegistry: true, SEPA: true },
        BF: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        BG: {
            chars: 22,
            bban_regexp: '^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$',
            IBANRegistry: true,
        },
        BH: {
            chars: 22,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{14}$',
            IBANRegistry: true,
        },
        BI: {
            chars: 16,
            bban_regexp: '^[0-9]{12}$',
        },
        BJ: {
            chars: 28,
            bban_regexp: '^[A-Z]{1}[0-9]{23}$',
        },
        BL: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        BM: {},
        BN: {},
        BO: {},
        BQ: {},
        BR: {
            chars: 29,
            bban_regexp: '^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$',
            IBANRegistry: true,
        },
        BS: {},
        BT: {},
        BV: {},
        BW: {},
        BY: {
            chars: 28,
            bban_regexp: '^[A-Z]{4}[0-9]{4}[A-Z0-9]{16}$',
            IBANRegistry: true,
        },
        BZ: {},
        CA: {},
        CC: {},
        CD: {},
        CF: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        CG: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        CH: {
            chars: 21,
            bban_regexp: '^[0-9]{5}[A-Z0-9]{12}$',
            IBANRegistry: true,
            SEPA: true,
        },
        CI: {
            chars: 28,
            bban_regexp: '^[A-Z]{1}[0-9]{23}$',
        },
        CK: {},
        CL: {},
        CM: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        CN: {},
        CO: {},
        CR: {
            chars: 22,
            bban_regexp: '^[0-9]{18}$',
            IBANRegistry: true,
        },
        CU: {},
        CV: { chars: 25, bban_regexp: '^[0-9]{21}$' },
        CW: {},
        CX: {},
        CY: {
            chars: 28,
            bban_regexp: '^[0-9]{8}[A-Z0-9]{16}$',
            IBANRegistry: true,
            SEPA: true,
        },
        CZ: { chars: 24, bban_regexp: '^[0-9]{20}$', IBANRegistry: true, SEPA: true },
        DE: { chars: 22, bban_regexp: '^[0-9]{18}$', IBANRegistry: true, SEPA: true },
        DJ: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        DK: { chars: 18, bban_regexp: '^[0-9]{14}$', IBANRegistry: true, SEPA: true },
        DM: {},
        DO: {
            chars: 28,
            bban_regexp: '^[A-Z]{4}[0-9]{20}$',
            IBANRegistry: true,
        },
        DZ: {
            chars: 24,
            bban_regexp: '^[0-9]{20}$',
        },
        EC: {},
        EE: { chars: 20, bban_regexp: '^[0-9]{16}$', IBANRegistry: true, SEPA: true },
        EG: { chars: 29, bban_regexp: '^[0-9]{25}', IBANRegistry: true },
        EH: {},
        ER: {},
        ES: { chars: 24, bban_regexp: '^[0-9]{20}$', IBANRegistry: true, SEPA: true },
        ET: {},
        FI: { chars: 18, bban_regexp: '^[0-9]{14}$', IBANRegistry: true, SEPA: true },
        FJ: {},
        FK: {},
        FM: {},
        FO: { chars: 18, bban_regexp: '^[0-9]{14}$', IBANRegistry: true, SEPA: true },
        FR: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
            SEPA: true,
        },
        GA: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        GB: {
            chars: 22,
            bban_regexp: '^[A-Z]{4}[0-9]{14}$',
            IBANRegistry: true,
            SEPA: true,
        },
        GD: {},
        GE: {
            chars: 22,
            bban_regexp: '^[A-Z0-9]{2}[0-9]{16}$',
            IBANRegistry: true,
        },
        GF: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        GG: {},
        GH: {},
        GI: {
            chars: 23,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{15}$',
            IBANRegistry: true,
            SEPA: true,
        },
        GL: { chars: 18, bban_regexp: '^[0-9]{14}$', IBANRegistry: true, SEPA: true },
        GM: {},
        GN: {},
        GP: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        GQ: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        GR: {
            chars: 27,
            bban_regexp: '^[0-9]{7}[A-Z0-9]{16}$',
            IBANRegistry: true,
            SEPA: true,
        },
        GS: {},
        GT: {
            chars: 28,
            bban_regexp: '^[A-Z0-9]{24}$',
            IBANRegistry: true,
        },
        GU: {},
        GW: {
            chars: 25,
            bban_regexp: '^[A-Z]{2}[0-9]{19}$',
        },
        GY: {},
        HK: {},
        HM: {},
        HN: {
            chars: 28,
            bban_regexp: '^[A-Z]{4}[0-9]{20}$',
        },
        HR: { chars: 21, bban_regexp: '^[0-9]{17}$', IBANRegistry: true, SEPA: true },
        HT: {},
        HU: { chars: 28, bban_regexp: '^[0-9]{24}$', IBANRegistry: true, SEPA: true },
        ID: {},
        IE: {
            chars: 22,
            bban_regexp: '^[A-Z0-9]{4}[0-9]{14}$',
            IBANRegistry: true,
            SEPA: true,
        },
        IL: {
            chars: 23,
            bban_regexp: '^[0-9]{19}$',
            IBANRegistry: true,
        },
        IM: {},
        IN: {},
        IO: {},
        IQ: {
            chars: 23,
            bban_regexp: '^[A-Z]{4}[0-9]{15}$',
            IBANRegistry: true,
        },
        IR: {
            chars: 26,
            bban_regexp: '^[0-9]{22}$',
        },
        IS: { chars: 26, bban_regexp: '^[0-9]{22}$', IBANRegistry: true, SEPA: true },
        IT: {
            chars: 27,
            bban_regexp: '^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$',
            IBANRegistry: true,
            SEPA: true,
        },
        JE: {},
        JM: {},
        JO: {
            chars: 30,
            bban_regexp: '^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$',
            IBANRegistry: true,
        },
        JP: {},
        KE: {},
        KG: {},
        KH: {},
        KI: {},
        KM: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        KN: {},
        KP: {},
        KR: {},
        KW: {
            chars: 30,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{22}$',
            IBANRegistry: true,
        },
        KY: {},
        KZ: {
            chars: 20,
            bban_regexp: '^[0-9]{3}[A-Z0-9]{13}$',
            IBANRegistry: true,
        },
        LA: {},
        LB: {
            chars: 28,
            bban_regexp: '^[0-9]{4}[A-Z0-9]{20}$',
            IBANRegistry: true,
        },
        LC: {
            chars: 32,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{24}$',
            IBANRegistry: true,
        },
        LI: {
            chars: 21,
            bban_regexp: '^[0-9]{5}[A-Z0-9]{12}$',
            IBANRegistry: true,
            SEPA: true,
        },
        LK: {},
        LR: {},
        LS: {},
        LT: { chars: 20, bban_regexp: '^[0-9]{16}$', IBANRegistry: true, SEPA: true },
        LU: {
            chars: 20,
            bban_regexp: '^[0-9]{3}[A-Z0-9]{13}$',
            IBANRegistry: true,
            SEPA: true,
        },
        LV: {
            chars: 21,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{13}$',
            IBANRegistry: true,
            SEPA: true,
        },
        LY: {
            chars: 25,
            bban_regexp: '^[0-9]{21}$',
            IBANRegistry: true,
        },
        MA: {
            chars: 28,
            bban_regexp: '^[0-9]{24}$',
        },
        MC: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
            SEPA: true,
        },
        MD: {
            chars: 24,
            bban_regexp: '^[A-Z0-9]{2}[A-Z0-9]{18}$',
            IBANRegistry: true,
        },
        ME: {
            chars: 22,
            bban_regexp: '^[0-9]{18}$',
            IBANRegistry: true,
        },
        MF: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        MG: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        MH: {},
        MK: {
            chars: 19,
            bban_regexp: '^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$',
            IBANRegistry: true,
        },
        ML: {
            chars: 28,
            bban_regexp: '^[A-Z]{1}[0-9]{23}$',
        },
        MM: {},
        MN: {},
        MO: {},
        MP: {},
        MQ: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        MR: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
            IBANRegistry: true,
        },
        MS: {},
        MT: {
            chars: 31,
            bban_regexp: '^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$',
            IBANRegistry: true,
            SEPA: true,
        },
        MU: {
            chars: 30,
            bban_regexp: '^[A-Z]{4}[0-9]{19}[A-Z]{3}$',
            IBANRegistry: true,
        },
        MV: {},
        MW: {},
        MX: {},
        MY: {},
        MZ: {
            chars: 25,
            bban_regexp: '^[0-9]{21}$',
        },
        NA: {},
        NC: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        NE: {
            chars: 28,
            bban_regexp: '^[A-Z]{2}[0-9]{22}$',
        },
        NF: {},
        NG: {},
        NI: {
            chars: 32,
            bban_regexp: '^[A-Z]{4}[0-9]{24}$',
        },
        NL: {
            chars: 18,
            bban_regexp: '^[A-Z]{4}[0-9]{10}$',
            IBANRegistry: true,
            SEPA: true,
        },
        NO: { chars: 15, bban_regexp: '^[0-9]{11}$', IBANRegistry: true, SEPA: true },
        NP: {},
        NR: {},
        NU: {},
        NZ: {},
        OM: {},
        PA: {},
        PE: {},
        PF: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        PG: {},
        PH: {},
        PK: {
            chars: 24,
            bban_regexp: '^[A-Z0-9]{4}[0-9]{16}$',
            IBANRegistry: true,
        },
        PL: { chars: 28, bban_regexp: '^[0-9]{24}$', IBANRegistry: true, SEPA: true },
        PM: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        PN: {},
        PR: {},
        PS: {
            chars: 29,
            bban_regexp: '^[A-Z0-9]{4}[0-9]{21}$',
            IBANRegistry: true,
        },
        PT: { chars: 25, bban_regexp: '^[0-9]{21}$', IBANRegistry: true, SEPA: true },
        PW: {},
        PY: {},
        QA: {
            chars: 29,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{21}$',
            IBANRegistry: true,
        },
        RE: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        RO: {
            chars: 24,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{16}$',
            IBANRegistry: true,
            SEPA: true,
        },
        RS: {
            chars: 22,
            bban_regexp: '^[0-9]{18}$',
            IBANRegistry: true,
        },
        RU: {},
        RW: {},
        SA: {
            chars: 24,
            bban_regexp: '^[0-9]{2}[A-Z0-9]{18}$',
            IBANRegistry: true,
        },
        SB: {},
        SC: {
            chars: 31,
            bban_regexp: '^[A-Z]{4}[0-9]{20}[A-Z]{3}$',
            IBANRegistry: true,
        },
        SD: {},
        SE: { chars: 24, bban_regexp: '^[0-9]{20}$', IBANRegistry: true, SEPA: true },
        SG: {},
        SH: {},
        SI: { chars: 19, bban_regexp: '^[0-9]{15}$', IBANRegistry: true, SEPA: true },
        SJ: {},
        SK: { chars: 24, bban_regexp: '^[0-9]{20}$', IBANRegistry: true, SEPA: true },
        SL: {},
        SM: {
            chars: 27,
            bban_regexp: '^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$',
            IBANRegistry: true,
            SEPA: true,
        },
        SN: {
            chars: 28,
            bban_regexp: '^[A-Z]{1}[0-9]{23}$',
        },
        SO: {},
        SR: {},
        SS: {},
        ST: {
            chars: 25,
            bban_regexp: '^[0-9]{21}$',
            IBANRegistry: true,
        },
        SV: {
            chars: 28,
            bban_regexp: '^[A-Z]{4}[0-9]{20}$',
            IBANRegistry: true,
        },
        SX: {},
        SY: {},
        SZ: {},
        TC: {},
        TD: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        TF: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        TG: {
            chars: 28,
            bban_regexp: '^[A-Z]{2}[0-9]{22}$',
        },
        TH: {},
        TJ: {},
        TK: {},
        TL: {
            chars: 23,
            bban_regexp: '^[0-9]{19}$',
            IBANRegistry: true,
        },
        TM: {},
        TN: {
            chars: 24,
            bban_regexp: '^[0-9]{20}$',
            IBANRegistry: true,
        },
        TO: {},
        TR: {
            chars: 26,
            bban_regexp: '^[0-9]{5}[A-Z0-9]{17}$',
            IBANRegistry: true,
        },
        TT: {},
        TV: {},
        TW: {},
        TZ: {},
        UA: {
            chars: 29,
            bban_regexp: '^[0-9]{6}[A-Z0-9]{19}$',
            IBANRegistry: true,
        },
        UG: {},
        UM: {},
        US: {},
        UY: {},
        UZ: {},
        VA: { chars: 22, bban_regexp: '^[0-9]{18}', IBANRegistry: true },
        VC: {},
        VE: {},
        VG: {
            chars: 24,
            bban_regexp: '^[A-Z0-9]{4}[0-9]{16}$',
            IBANRegistry: true,
        },
        VI: {},
        VN: {},
        VU: {},
        WF: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        WS: {},
        XK: {
            chars: 20,
            bban_regexp: '^[0-9]{16}$',
            IBANRegistry: true,
        },
        YE: {},
        YT: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            IBANRegistry: true,
        },
        ZA: {},
        ZM: {},
        ZW: {},
    };
});
