/*!
 * @license
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
define(["require", "exports"], function (require, exports) {
    /**
     * @file Validation, extraction and creation of IBAN, BBAN, BIC/SWIFT numbers plus some other helpful stuff
     * @author Saša Jovanić
     * @module ibantools
     * @see module:ibantools
     * @version 3.2.0
     * @license MPL-2.0
     */
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extractBIC = exports.isValidBIC = exports.getCountrySpecifications = exports.friendlyFormatIBAN = exports.electronicFormatIBAN = exports.extractIBAN = exports.composeIBAN = exports.isSEPACountry = exports.isValidBBAN = exports.isValidIBAN = void 0;
    /**
     * Validate IBAN
     * @example
     * // returns true
     * ibantools.isValidIBAN("NL91ABNA0517164300");
     * @example
     * // returns false
     * ibantools.isValidIBAN("NL92ABNA0517164300");
     * @alias module:ibantools.isValidIBAN
     * @param {string} IBAN IBAN
     * @return {boolean} valid
     */
    function isValidIBAN(iban) {
        if (iban !== undefined && iban !== null) {
            var reg = new RegExp("^[0-9]{2}$", "");
            var spec = countrySpecs[iban.slice(0, 2)];
            if (spec !== undefined &&
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
     * @example
     * // returns true
     * ibantools.isValidBBAN("ABNA0517164300", "NL");
     * @example
     * // returns false
     * ibantools.isValidBBAN("A7NA0517164300", "NL");
     * @alias module:ibantools.isValidBBAN
     * @param {string} BBAN BBAN
     * @param {string} countryCode Country code
     * @return {boolean} valid
     */
    function isValidBBAN(bban, countryCode) {
        if (bban !== undefined &&
            bban !== null &&
            countryCode !== undefined &&
            countryCode !== null) {
            var spec = countrySpecs[countryCode];
            if (spec !== undefined &&
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
     * @example
     * // returns true
     * ibantools.isSEPACountry("NL");
     * @example
     * // returns false
     * ibantools.isSEPACountry("PK");
     * @alias module:ibantools.isSEPACountry
     * @param {string} countryCode Country code
     * @return {boolean} valid
     */
    function isSEPACountry(countryCode) {
        if (countryCode !== undefined && countryCode !== null) {
            var spec = countrySpecs[countryCode];
            if (spec !== undefined) {
                return spec.SEPA;
            }
        }
        return false;
    }
    exports.isSEPACountry = isSEPACountry;
    /**
     * composeIBAN
     * @example
     * // returns NL91ABNA0417164300
     * ibantools.composeIBAN("NL", "ABNA0417164300");
     * @alias module:ibantools.composeIBAN
     * @param {ComposeIBANParams} Object {bban: string, countryCode: string}
     * @result {string} IBAN IBAN
     */
    function composeIBAN(params) {
        var bban = electronicFormatIBAN(params.bban);
        var spec = countrySpecs[params.countryCode];
        if (bban !== null &&
            spec !== undefined &&
            spec.chars === bban.length + 4 &&
            checkFormatBBAN(bban, spec.bban_regexp)) {
            var checksom = mod9710(params.countryCode + "00" + bban);
            return params.countryCode + ("0" + (98 - checksom)).slice(-2) + bban;
        }
        return null;
    }
    exports.composeIBAN = composeIBAN;
    /**
     * extractIBAN
     * @example
     * // returns {iban: "NL91ABNA0417164300", bban: "ABNA0417164300", countryCode: "NL", valid: true}
     * ibantools.extractIBAN("NL91 ABNA 0417 1643 00");
     * @alias module:ibantools.extractIBAN
     * @param {string} IBAN IBAN
     * @return {ExtractIBANResult} Object {iban: string, bban: string, countryCode: string, valid: boolean}
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
     * @param {string} BBAN
     * @param {string} Regexp BBAN validation regexp
     * @return {boolean} valid
     */
    function checkFormatBBAN(bban, bformat) {
        var reg = new RegExp(bformat, "");
        return reg.test(bban);
    }
    /**
     * Get IBAN in electronic format (no spaces)
     * IBAN validation is not performed.
     * When non-string value for IBAN is provided, returns null.
     * @example
     * // returns "NL91ABNA0417164300"
     * ibantools.electronicFormatIBAN("NL91 ABNA 0417 1643 00");
     * @alias module:ibantools.electronicFormatIBAN
     * @param {string} IBAN IBAN
     * @return {string} IBAN Electronic formated IBAN
     */
    function electronicFormatIBAN(iban) {
        if (typeof iban !== "string") {
            return null;
        }
        return iban.replace(/[-\ ]/g, "").toUpperCase();
    }
    exports.electronicFormatIBAN = electronicFormatIBAN;
    /**
     * Get IBAN in friendly format (separated after every 4 characters)
     * IBAN validation is not performed.
     * When non-string value for IBAN is provided, returns null.
     * @example
     * // returns "NL91 ABNA 0417 1643 00"
     * ibantools.friendlyFormatIBAN("NL91ABNA0417164300");
     * @example
     * // returns "NL91-ABNA-0417-1643-00"
     * ibantools.friendlyFormatIBAN("NL91ABNA0417164300","-");
     * @alias module:ibantools.friendlyFormatIBAN
     * @param {string} IBAN IBAN
     * @param {string} separator Not required. Default separator is space " "
     * @return {string} IBAN Friendly formated IBAN
     */
    function friendlyFormatIBAN(iban, separator) {
        if (typeof iban !== "string") {
            return null;
        }
        if (typeof separator === "undefined") {
            separator = " ";
        }
        return electronicFormatIBAN(iban).replace(/(.{4})(?!$)/g, "$1" + separator);
    }
    exports.friendlyFormatIBAN = friendlyFormatIBAN;
    /**
     * Calculate checksum of IBAN and compares it with checksum provided in IBANregistry
     * @param {string} IBAN
     * @return {boolean}
     */
    function isValidIBANChecksum(iban) {
        var providedChecksum = parseInt(iban.slice(2, 4), 10);
        var temp = iban.slice(3) + iban.slice(0, 2) + "00";
        var validationString = "";
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
            validationString =
                (parseInt(part, 10) % 97).toString() +
                    validationString.slice(part.length);
        }
        var rest = parseInt(validationString, 10) % 97;
        return 98 - rest === providedChecksum;
    }
    /**
     * MOD-97-10
     * @param {string}
     * @return {number}
     */
    function mod9710(iban) {
        iban = iban.slice(3) + iban.slice(0, 4);
        var validationString = "";
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
            validationString =
                (parseInt(part, 10) % 97).toString() +
                    validationString.slice(part.length);
        }
        return parseInt(validationString, 10) % 97;
    }
    /**
     * getCountrySpecifications
     * Returns specifications for all countries, even those who are not
     * members of IBAN registry. `IBANRegistry` field indicates if country
     * is member of not.
     * @example
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
     * @alias module:ibantools.getCountrySpecifications
     * @return {CountryMap} Object [countryCode: string]CountrySpec -> {chars: :number, bban_regexp: string, IBANRegistry: boolean, SEPA: boolean}
     */
    function getCountrySpecifications() {
        return countrySpecs;
    }
    exports.getCountrySpecifications = getCountrySpecifications;
    /**
     * Validate BIC/SWIFT
     * @example
     * // returns true
     * ibantools.isValidBIC("ABNANL2A");
     * @example
     * // returns true
     * ibantools.isValidBIC("NEDSZAJJXXX");
     * @example
     * // returns false
     * ibantools.isValidBIC("ABN4NL2A");
     * @example
     * // returns false
     * ibantools.isValidBIC("ABNA NL 2A");
     * @alias module:ibantools.isValidBIC
     * @param {string} BIC BIC
     * @return {boolean} valid
     */
    function isValidBIC(bic) {
        if (!bic) {
            return false;
        }
        var reg = new RegExp("^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$", "");
        var spec = countrySpecs[bic.toUpperCase().slice(4, 6)];
        return reg.test(bic) && spec !== undefined;
    }
    exports.isValidBIC = isValidBIC;
    /**
     * extractBIC
     * @example
     * // returns {bankCode: "ABNA", countryCode: "NL", locationCode: "2A", branchCode: null, testBIC: flase, valid: true}
     * ibantools.extractBIC("ABNANL2A");
     * @alias module:ibantools.extractBIC
     * @param {string} BIC BIC
     * @return {ExtractBICResult} Object {bancCode: string, countryCode: string, locationCode: string, branchCode: string, testBIC: boolean, valid: boolean}
     */
    function extractBIC(inputBic) {
        var result = {};
        var bic = inputBic.toUpperCase();
        if (isValidBIC(bic)) {
            result.bankCode = bic.slice(0, 4);
            result.countryCode = bic.slice(4, 6);
            result.locationCode = bic.slice(6, 8);
            result.testBIC = result.locationCode[1] === "0" ? true : false;
            result.branchCode = bic.length > 8 ? bic.slice(8) : "619";
            result.valid = true;
        }
        else {
            result.valid = false;
        }
        return result;
    }
    exports.extractBIC = extractBIC;
    // Country specifications
    var countrySpecs = {
        AD: {
            chars: 24,
            bban_regexp: "^[0-9]{8}[A-Z0-9]{12}$",
            IBANRegistry: true,
            SEPA: false
        },
        AE: {
            chars: 23,
            bban_regexp: "^[0-9]{3}[0-9]{16}$",
            IBANRegistry: true,
            SEPA: false
        },
        AF: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AG: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AI: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AL: {
            chars: 28,
            bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$",
            IBANRegistry: true,
            SEPA: false
        },
        AM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AO: {
            chars: 25,
            bban_regexp: "^[0-9]{21}$",
            IBANRegistry: false,
            SEPA: false
        },
        AQ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AR: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AS: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AT: { chars: 20, bban_regexp: "^[0-9]{16}$", IBANRegistry: true, SEPA: true },
        AU: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AW: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        AX: {
            chars: 18,
            bban_regexp: "^[0-9]{14}$",
            IBANRegistry: true,
            SEPA: false
        },
        AZ: {
            chars: 28,
            bban_regexp: "^[A-Z]{4}[0-9]{20}$",
            IBANRegistry: true,
            SEPA: false
        },
        BA: {
            chars: 20,
            bban_regexp: "^[0-9]{16}$",
            IBANRegistry: true,
            SEPA: false
        },
        BB: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BD: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BE: { chars: 16, bban_regexp: "^[0-9]{12}$", IBANRegistry: true, SEPA: true },
        BF: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        BG: {
            chars: 22,
            bban_regexp: "^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$",
            IBANRegistry: true,
            SEPA: true
        },
        BH: {
            chars: 22,
            bban_regexp: "^[A-Z]{4}[A-Z0-9]{14}$",
            IBANRegistry: true,
            SEPA: false
        },
        BI: {
            chars: 16,
            bban_regexp: "^[0-9]{12}$",
            IBANRegistry: false,
            SEPA: false
        },
        BJ: {
            chars: 28,
            bban_regexp: "^[A-Z]{1}[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        BL: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        BM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BN: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BO: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BQ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BR: {
            chars: 29,
            bban_regexp: "^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$",
            IBANRegistry: true,
            SEPA: false
        },
        BS: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BT: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BV: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BW: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        BY: {
            chars: 28,
            bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{16}$",
            IBANRegistry: true,
            SEPA: false
        },
        BZ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CA: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CC: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CD: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CF: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        CG: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        CH: {
            chars: 21,
            bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$",
            IBANRegistry: true,
            SEPA: true
        },
        CI: {
            chars: 28,
            bban_regexp: "^[A-Z]{1}[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        CK: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CL: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CM: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        CN: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CO: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CR: {
            chars: 22,
            bban_regexp: "^[0-9]{18}$",
            IBANRegistry: true,
            SEPA: false
        },
        CU: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CV: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CW: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CX: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        CY: {
            chars: 28,
            bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$",
            IBANRegistry: true,
            SEPA: true
        },
        CZ: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true, SEPA: true },
        DE: { chars: 22, bban_regexp: "^[0-9]{18}$", IBANRegistry: true, SEPA: true },
        DJ: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        DK: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true, SEPA: true },
        DM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        DO: {
            chars: 28,
            bban_regexp: "^[A-Z]{4}[0-9]{20}$",
            IBANRegistry: true,
            SEPA: false
        },
        DZ: {
            chars: 24,
            bban_regexp: "^[0-9]{20}$",
            IBANRegistry: false,
            SEPA: false
        },
        EC: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        EE: { chars: 20, bban_regexp: "^[0-9]{16}$", IBANRegistry: true, SEPA: true },
        EG: { chars: 29, bban_regexp: "^[0-9]{25}", IBANRegistry: true, SEPA: false },
        EH: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        ER: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        ES: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true, SEPA: true },
        ET: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        FI: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true, SEPA: true },
        FJ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        FK: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        FM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        FO: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true, SEPA: true },
        FR: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: true
        },
        GA: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        GB: {
            chars: 22,
            bban_regexp: "^[A-Z]{4}[0-9]{14}$",
            IBANRegistry: true,
            SEPA: true
        },
        GD: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        GE: {
            chars: 22,
            bban_regexp: "^[A-Z0-9]{2}[0-9]{16}$",
            IBANRegistry: true,
            SEPA: false
        },
        GF: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        GG: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        GH: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        GI: {
            chars: 23,
            bban_regexp: "^[A-Z]{4}[A-Z0-9]{15}$",
            IBANRegistry: true,
            SEPA: true
        },
        GL: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true, SEPA: true },
        GM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        GN: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        GP: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        GQ: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        GR: {
            chars: 27,
            bban_regexp: "^[0-9]{7}[A-Z0-9]{16}$",
            IBANRegistry: true,
            SEPA: true
        },
        GS: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        GT: {
            chars: 28,
            bban_regexp: "^[A-Z0-9]{24}$",
            IBANRegistry: true,
            SEPA: false
        },
        GU: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        GW: {
            chars: 25,
            bban_regexp: "^[A-Z]{2}[0-9]{19}$",
            IBANRegistry: false,
            SEPA: false
        },
        GY: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        HK: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        HM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        HN: {
            chars: 28,
            bban_regexp: "^[A-Z]{4}[0-9]{20}$",
            IBANRegistry: false,
            SEPA: false
        },
        HR: { chars: 21, bban_regexp: "^[0-9]{17}$", IBANRegistry: true, SEPA: true },
        HT: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        HU: { chars: 28, bban_regexp: "^[0-9]{24}$", IBANRegistry: true, SEPA: true },
        ID: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        IE: {
            chars: 22,
            bban_regexp: "^[A-Z0-9]{4}[0-9]{14}$",
            IBANRegistry: true,
            SEPA: true
        },
        IL: {
            chars: 23,
            bban_regexp: "^[0-9]{19}$",
            IBANRegistry: true,
            SEPA: false
        },
        IM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        IN: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        IO: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        IQ: {
            chars: 23,
            bban_regexp: "^[A-Z]{4}[0-9]{15}$",
            IBANRegistry: true,
            SEPA: false
        },
        IR: {
            chars: 26,
            bban_regexp: "^[0-9]{22}$",
            IBANRegistry: false,
            SEPA: false
        },
        IS: { chars: 26, bban_regexp: "^[0-9]{22}$", IBANRegistry: true, SEPA: true },
        IT: {
            chars: 27,
            bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",
            IBANRegistry: true,
            SEPA: true
        },
        JE: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        JM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        JO: {
            chars: 30,
            bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$",
            IBANRegistry: true,
            SEPA: false
        },
        JP: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KE: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KG: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KH: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KI: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KM: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        KN: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KP: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KR: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KW: {
            chars: 30,
            bban_regexp: "^[A-Z]{4}[A-Z0-9]{22}$",
            IBANRegistry: true,
            SEPA: false
        },
        KY: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        KZ: {
            chars: 20,
            bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$",
            IBANRegistry: true,
            SEPA: false
        },
        LA: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        LB: {
            chars: 28,
            bban_regexp: "^[0-9]{4}[A-Z0-9]{20}$",
            IBANRegistry: true,
            SEPA: false
        },
        LC: {
            chars: 32,
            bban_regexp: "^[A-Z]{4}[A-Z0-9]{24}$",
            IBANRegistry: true,
            SEPA: false
        },
        LI: {
            chars: 21,
            bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$",
            IBANRegistry: true,
            SEPA: true
        },
        LK: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        LR: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        LS: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        LT: { chars: 20, bban_regexp: "^[0-9]{16}$", IBANRegistry: true, SEPA: true },
        LU: {
            chars: 20,
            bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$",
            IBANRegistry: true,
            SEPA: true
        },
        LV: {
            chars: 21,
            bban_regexp: "^[A-Z]{4}[A-Z0-9]{13}$",
            IBANRegistry: true,
            SEPA: true
        },
        LY: {
            chars: 25,
            bban_regexp: "^[0-9]{21}$",
            IBANRegistry: true,
            SEPA: false
        },
        MA: {
            chars: 28,
            bban_regexp: "^[0-9]{24}$",
            IBANRegistry: false,
            SEPA: false
        },
        MC: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: true
        },
        MD: {
            chars: 24,
            bban_regexp: "^[A-Z0-9]{2}[A-Z0-9]{18}$",
            IBANRegistry: true,
            SEPA: false
        },
        ME: {
            chars: 22,
            bban_regexp: "^[0-9]{18}$",
            IBANRegistry: true,
            SEPA: false
        },
        MF: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        MG: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        MH: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MK: {
            chars: 19,
            bban_regexp: "^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        ML: {
            chars: 28,
            bban_regexp: "^[A-Z]{1}[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        MM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MN: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MO: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MP: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MQ: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        MR: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: true,
            SEPA: false
        },
        MS: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MT: {
            chars: 31,
            bban_regexp: "^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$",
            IBANRegistry: true,
            SEPA: true
        },
        MU: {
            chars: 30,
            bban_regexp: "^[A-Z]{4}[0-9]{19}[A-Z]{3}$",
            IBANRegistry: true,
            SEPA: false
        },
        MV: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MW: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MX: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MY: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        MZ: {
            chars: 25,
            bban_regexp: "^[0-9]{21}$",
            IBANRegistry: false,
            SEPA: false
        },
        NA: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        NC: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        NE: {
            chars: 28,
            bban_regexp: "^[A-Z]{2}[0-9]{22}$",
            IBANRegistry: false,
            SEPA: false
        },
        NF: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        NG: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        NI: {
            chars: 32,
            bban_regexp: "^[A-Z]{4}[0-9]{24}$",
            IBANRegistry: false,
            SEPA: false
        },
        NL: {
            chars: 18,
            bban_regexp: "^[A-Z]{4}[0-9]{10}$",
            IBANRegistry: true,
            SEPA: true
        },
        NO: { chars: 15, bban_regexp: "^[0-9]{11}$", IBANRegistry: true, SEPA: true },
        NP: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        NR: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        NU: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        NZ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        OM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        PA: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        PE: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        PF: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        PG: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        PH: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        PK: {
            chars: 24,
            bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$",
            IBANRegistry: true,
            SEPA: false
        },
        PL: { chars: 28, bban_regexp: "^[0-9]{24}$", IBANRegistry: true, SEPA: true },
        PM: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        PN: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        PR: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        PS: {
            chars: 29,
            bban_regexp: "^[A-Z0-9]{4}[0-9]{21}$",
            IBANRegistry: true,
            SEPA: false
        },
        PT: { chars: 25, bban_regexp: "^[0-9]{21}$", IBANRegistry: true, SEPA: true },
        PW: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        PY: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        QA: {
            chars: 29,
            bban_regexp: "^[A-Z]{4}[A-Z0-9]{21}$",
            IBANRegistry: true,
            SEPA: false
        },
        RE: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        RO: {
            chars: 24,
            bban_regexp: "^[A-Z]{4}[A-Z0-9]{16}$",
            IBANRegistry: true,
            SEPA: true
        },
        RS: {
            chars: 22,
            bban_regexp: "^[0-9]{18}$",
            IBANRegistry: true,
            SEPA: false
        },
        RU: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        RW: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SA: {
            chars: 24,
            bban_regexp: "^[0-9]{2}[A-Z0-9]{18}$",
            IBANRegistry: true,
            SEPA: false
        },
        SB: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SC: {
            chars: 31,
            bban_regexp: "^[A-Z]{4}[0-9]{20}[A-Z]{3}$",
            IBANRegistry: true,
            SEPA: false
        },
        SD: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SE: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true, SEPA: true },
        SG: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SH: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SI: { chars: 19, bban_regexp: "^[0-9]{15}$", IBANRegistry: true, SEPA: true },
        SJ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SK: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true, SEPA: true },
        SL: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SM: {
            chars: 27,
            bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",
            IBANRegistry: true,
            SEPA: true
        },
        SN: {
            chars: 28,
            bban_regexp: "^[A-Z]{1}[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        SO: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SR: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SS: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        ST: {
            chars: 25,
            bban_regexp: "^[0-9]{21}$",
            IBANRegistry: true,
            SEPA: false
        },
        SV: {
            chars: 28,
            bban_regexp: "^[A-Z]{4}[0-9]{20}$",
            IBANRegistry: true,
            SEPA: false
        },
        SX: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SY: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        SZ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TC: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TD: {
            chars: 27,
            bban_regexp: "^[0-9]{23}$",
            IBANRegistry: false,
            SEPA: false
        },
        TF: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        TG: {
            chars: 28,
            bban_regexp: "^[A-Z]{2}[0-9]{22}$",
            IBANRegistry: false,
            SEPA: false
        },
        TH: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TJ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TK: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TL: {
            chars: 23,
            bban_regexp: "^[0-9]{19}$",
            IBANRegistry: true,
            SEPA: false
        },
        TM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TN: {
            chars: 24,
            bban_regexp: "^[0-9]{20}$",
            IBANRegistry: true,
            SEPA: false
        },
        TO: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TR: {
            chars: 26,
            bban_regexp: "^[0-9]{5}[A-Z0-9]{17}$",
            IBANRegistry: true,
            SEPA: false
        },
        TT: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TV: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TW: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        TZ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        UA: {
            chars: 29,
            bban_regexp: "^[0-9]{6}[A-Z0-9]{19}$",
            IBANRegistry: true,
            SEPA: false
        },
        UG: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        UM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        US: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        UY: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        UZ: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        VA: { chars: 22, bban_regexp: "^[0-9]{18}", IBANRegistry: true, SEPA: false },
        VC: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        VE: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        VG: {
            chars: 24,
            bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$",
            IBANRegistry: true,
            SEPA: false
        },
        VI: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        VN: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        VU: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        WF: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        WS: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        XK: {
            chars: 20,
            bban_regexp: "^[0-9]{16}$",
            IBANRegistry: true,
            SEPA: false
        },
        YE: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        YT: {
            chars: 27,
            bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
            IBANRegistry: true,
            SEPA: false
        },
        ZA: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        ZM: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false },
        ZW: { chars: null, bban_regexp: null, IBANRegistry: false, SEPA: false }
    };
});
