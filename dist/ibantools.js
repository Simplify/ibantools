/*!
 * @license
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
define(["require", "exports"], function (require, exports) {
    /**
     * Validation, extraction and creation of IBAN, BBAN, BIC/SWIFT numbers plus some other helpful stuff
     * @package Documentation
     * @author Saša Jovanić
     * @module ibantools
     * @version 4.3.2
     * @license MPL-2.0
     * @preferred
     */
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.countrySpecs = exports.setCountryBBANValidation = exports.extractBIC = exports.validateBIC = exports.ValidationErrorsBIC = exports.isValidBIC = exports.getCountrySpecifications = exports.friendlyFormatIBAN = exports.electronicFormatIBAN = exports.extractIBAN = exports.composeIBAN = exports.isQRIBAN = exports.isSEPACountry = exports.isValidBBAN = exports.validateIBAN = exports.ValidationErrorsIBAN = exports.isValidIBAN = void 0;
    /**
     * Validate IBAN
     * ```
     * // returns true
     * ibantools.isValidIBAN("NL91ABNA0417164300");
     * ```
     * ```
     * // returns false
     * ibantools.isValidIBAN("NL92ABNA0517164300");
     * ```
     * ```
     * // returns true
     * ibantools.isValidIBAN('CH4431999123000889012');
     * ```
     * ```
     * // returns false
     * ibantools.isValidIBAN('CH4431999123000889012', { allowQRIBAN: false });
     * ```
     */
    function isValidIBAN(iban, validationOptions) {
        if (validationOptions === void 0) { validationOptions = { allowQRIBAN: true }; }
        if (iban === undefined || iban === null)
            return false;
        var reg = new RegExp('^[0-9]{2}$', '');
        var countryCode = iban.slice(0, 2);
        var spec = exports.countrySpecs[countryCode];
        if (spec === undefined || spec.bban_regexp === undefined || spec.bban_regexp === null || spec.chars === undefined)
            return false;
        return (spec.chars === iban.length &&
            reg.test(iban.slice(2, 4)) &&
            isValidBBAN(iban.slice(4), countryCode) &&
            isValidIBANChecksum(iban) &&
            (validationOptions.allowQRIBAN || !isQRIBAN(iban)));
    }
    exports.isValidIBAN = isValidIBAN;
    /**
     * IBAM validation errors
     */
    var ValidationErrorsIBAN;
    (function (ValidationErrorsIBAN) {
        ValidationErrorsIBAN[ValidationErrorsIBAN["NoIBANProvided"] = 0] = "NoIBANProvided";
        ValidationErrorsIBAN[ValidationErrorsIBAN["NoIBANCountry"] = 1] = "NoIBANCountry";
        ValidationErrorsIBAN[ValidationErrorsIBAN["WrongBBANLength"] = 2] = "WrongBBANLength";
        ValidationErrorsIBAN[ValidationErrorsIBAN["WrongBBANFormat"] = 3] = "WrongBBANFormat";
        ValidationErrorsIBAN[ValidationErrorsIBAN["ChecksumNotNumber"] = 4] = "ChecksumNotNumber";
        ValidationErrorsIBAN[ValidationErrorsIBAN["WrongIBANChecksum"] = 5] = "WrongIBANChecksum";
        ValidationErrorsIBAN[ValidationErrorsIBAN["WrongAccountBankBranchChecksum"] = 6] = "WrongAccountBankBranchChecksum";
        ValidationErrorsIBAN[ValidationErrorsIBAN["QRIBANNotAllowed"] = 7] = "QRIBANNotAllowed";
    })(ValidationErrorsIBAN = exports.ValidationErrorsIBAN || (exports.ValidationErrorsIBAN = {}));
    /**
     * validateIBAN
     * ```
     * // returns {errorCodes: [], valid: true}
     * ibantools.validateIBAN("NL91ABNA0417164300");
     * ```
     * ```
     * ```
     * // returns {errorCodes: [], valid: true}
     * ibantools.validateIBAN('CH4431999123000889012');
     * ```
     * ```
     * // returns {errorCodes: [7], valid: false}
     * ibantools.validateIBAN('CH4431999123000889012', { allowQRIBAN: false });
     * ```
     */
    function validateIBAN(iban, validationOptions) {
        if (validationOptions === void 0) { validationOptions = { allowQRIBAN: true }; }
        var result = { errorCodes: [], valid: true };
        if (iban !== undefined && iban !== null && iban !== '') {
            var spec = exports.countrySpecs[iban.slice(0, 2)];
            if (!spec || !(spec.bban_regexp || spec.chars)) {
                result.valid = false;
                result.errorCodes.push(ValidationErrorsIBAN.NoIBANCountry);
                return result;
            }
            if (spec && spec.chars && spec.chars !== iban.length) {
                result.valid = false;
                result.errorCodes.push(ValidationErrorsIBAN.WrongBBANLength);
            }
            if (spec && spec.bban_regexp && !checkFormatBBAN(iban.slice(4), spec.bban_regexp)) {
                result.valid = false;
                result.errorCodes.push(ValidationErrorsIBAN.WrongBBANFormat);
            }
            if (spec && spec.bban_validation_func && !spec.bban_validation_func(iban.slice(4))) {
                result.valid = false;
                result.errorCodes.push(ValidationErrorsIBAN.WrongAccountBankBranchChecksum);
            }
            var reg = new RegExp('^[0-9]{2}$', '');
            if (!reg.test(iban.slice(2, 4))) {
                result.valid = false;
                result.errorCodes.push(ValidationErrorsIBAN.ChecksumNotNumber);
            }
            if (result.errorCodes.indexOf(ValidationErrorsIBAN.WrongBBANFormat) !== -1 || !isValidIBANChecksum(iban)) {
                result.valid = false;
                result.errorCodes.push(ValidationErrorsIBAN.WrongIBANChecksum);
            }
            if (!validationOptions.allowQRIBAN && isQRIBAN(iban)) {
                result.valid = false;
                result.errorCodes.push(ValidationErrorsIBAN.QRIBANNotAllowed);
            }
        }
        else {
            result.valid = false;
            result.errorCodes.push(ValidationErrorsIBAN.NoIBANProvided);
        }
        return result;
    }
    exports.validateIBAN = validateIBAN;
    /**
     * Validate BBAN
     *
     * ```
     * // returns true
     * ibantools.isValidBBAN("ABNA0417164300", "NL");
     * ```
     * ```
     * // returns false
     * ibantools.isValidBBAN("A7NA0517164300", "NL");
     * ```
     */
    function isValidBBAN(bban, countryCode) {
        if (bban === undefined || bban === null || countryCode === undefined || countryCode === null)
            return false;
        var spec = exports.countrySpecs[countryCode];
        if (spec === undefined ||
            spec === null ||
            spec.bban_regexp === undefined ||
            spec.bban_regexp === null ||
            spec.chars === undefined ||
            spec.chars === null)
            return false;
        if (spec.chars - 4 === bban.length && checkFormatBBAN(bban, spec.bban_regexp)) {
            if (spec.bban_validation_func) {
                return spec.bban_validation_func(bban.replace(/[\s.]+/g, ''));
            }
            return true;
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
            var spec = exports.countrySpecs[countryCode];
            if (spec !== undefined) {
                return spec.SEPA ? spec.SEPA : false;
            }
        }
        return false;
    }
    exports.isSEPACountry = isSEPACountry;
    /**
     * Check if IBAN is QR-IBAN
     * ```
     * // returns true
     * ibantools.isQRIBAN("CH4431999123000889012");
     * ```
     * ```
     * // returns false
     * ibantools.isQRIBAN("NL92ABNA0517164300");
     * ```
     */
    function isQRIBAN(iban) {
        if (iban === undefined || iban === null)
            return false;
        var countryCode = iban.slice(0, 2);
        var QRIBANCountries = ['LX', 'CH'];
        if (!QRIBANCountries.includes(countryCode))
            return false;
        var reg = new RegExp('^3[0-1]{1}[0-9]{3}$', '');
        return reg.test(iban.slice(4, 9));
    }
    exports.isQRIBAN = isQRIBAN;
    /**
     * composeIBAN
     *
     * ```
     * // returns NL91ABNA0417164300
     * ibantools.composeIBAN({ countryCode: "NL", bban: "ABNA0417164300" });
     * ```
     */
    function composeIBAN(params) {
        var formated_bban = electronicFormatIBAN(params.bban) || '';
        if (params.countryCode === null || params.countryCode === undefined) {
            return null;
        }
        var spec = exports.countrySpecs[params.countryCode];
        if (formated_bban !== '' &&
            spec !== undefined &&
            spec.chars &&
            spec.chars !== null &&
            spec.chars === formated_bban.length + 4 &&
            spec.bban_regexp &&
            spec.bban_regexp !== null &&
            checkFormatBBAN(formated_bban, spec.bban_regexp)) {
            var checksom = mod9710Iban(params.countryCode + '00' + formated_bban);
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
        var eFormatIBAN = electronicFormatIBAN(iban);
        result.iban = eFormatIBAN || iban;
        if (!!eFormatIBAN && isValidIBAN(eFormatIBAN)) {
            result.bban = eFormatIBAN.slice(4);
            result.countryCode = eFormatIBAN.slice(0, 2);
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
        /* istanbul ignore if */
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
        var countryCode = iban.slice(0, 2);
        var providedChecksum = parseInt(iban.slice(2, 4), 10);
        var bban = iban.slice(4);
        // Wikipedia[validating_iban] says there are a specif way to check if a IBAN is valid but
        // it. It says 'If the remainder is 1, the check digit test is passed and the
        // IBAN might be valid.'. might, MIGHT!
        // We don't want might but want yes or no. Since every BBAN is IBAN from the fifth
        // (slice(4)) we can generate the IBAN from BBAN and country code(two first characters)
        // from in the IBAN.
        // To generate the (generate the iban check digits)[generating-iban-check]
        //   Move the country code to the end
        //   remove the checksum from the begging
        //   Add "00" to the end
        //   modulo 97 on the amount
        //   subtract remainder from 98, (98 - remainder)
        //   Add a leading 0 if the remainder is less then 10 (padStart(2, "0")) (we skip this
        //     since we compare int, not string)
        //
        // [validating_iban][https://en.wikipedia.org/wiki/International_Bank_Account_Number#Validating_the_IBAN]
        // [generating-iban-check][https://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits]
        var validationString = replaceCharaterWithCode("".concat(bban).concat(countryCode, "00"));
        var rest = mod9710(validationString);
        return 98 - rest === providedChecksum;
    }
    /**
     * Iban contain characters and should be converted to intereger by 55 substracted
     * from there ascii value
     *
     * @ignore
     */
    function replaceCharaterWithCode(str) {
        // It is slower but alot more readable
        // https://jsbench.me/ttkzgsekae/1
        return str
            .split('')
            .map(function (c) {
            var code = c.charCodeAt(0);
            return code >= 65 ? (code - 55).toString() : c;
        })
            .join('');
    }
    /**
     * MOD-97-10
     *
     * @ignore
     */
    function mod9710Iban(iban) {
        return mod9710(replaceCharaterWithCode(iban.slice(3) + iban.slice(0, 4)));
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
     *   // Add New value to "pattern" attribute to #iban input text field
     *   $("input#iban").attr("pattern", $(this).val() + "[0-9]{2}" + country.bban_regexp.slice(1).replace("$",""));
     * });
     * ```
     */
    function getCountrySpecifications() {
        var countyMap = {};
        for (var countyCode in exports.countrySpecs) {
            var county = exports.countrySpecs[countyCode];
            countyMap[countyCode] = {
                chars: county.chars || null,
                bban_regexp: county.bban_regexp || null,
                IBANRegistry: county.IBANRegistry || false,
                SEPA: county.SEPA || false,
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
        var spec = exports.countrySpecs[bic.toUpperCase().slice(4, 6)];
        return reg.test(bic) && spec !== undefined;
    }
    exports.isValidBIC = isValidBIC;
    /**
     * BIC validation errors
     */
    var ValidationErrorsBIC;
    (function (ValidationErrorsBIC) {
        ValidationErrorsBIC[ValidationErrorsBIC["NoBICProvided"] = 0] = "NoBICProvided";
        ValidationErrorsBIC[ValidationErrorsBIC["NoBICCountry"] = 1] = "NoBICCountry";
        ValidationErrorsBIC[ValidationErrorsBIC["WrongBICFormat"] = 2] = "WrongBICFormat";
    })(ValidationErrorsBIC = exports.ValidationErrorsBIC || (exports.ValidationErrorsBIC = {}));
    /**
     * validateBIC
     * ```
     * // returns {errorCodes: [], valid: true}
     * ibantools.validateBIC("NEDSZAJJXXX");
     * ```
     */
    function validateBIC(bic) {
        var result = { errorCodes: [], valid: true };
        if (bic !== undefined && bic !== null && bic !== '') {
            var spec = exports.countrySpecs[bic.toUpperCase().slice(4, 6)];
            if (spec === undefined) {
                result.valid = false;
                result.errorCodes.push(ValidationErrorsBIC.NoBICCountry);
            }
            else {
                var reg = new RegExp('^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$', '');
                if (!reg.test(bic)) {
                    result.valid = false;
                    result.errorCodes.push(ValidationErrorsBIC.WrongBICFormat);
                }
            }
        }
        else {
            result.valid = false;
            result.errorCodes.push(ValidationErrorsBIC.NoBICProvided);
        }
        return result;
    }
    exports.validateBIC = validateBIC;
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
            result.branchCode = bic.length > 8 ? bic.slice(8) : null;
            result.valid = true;
        }
        else {
            result.valid = false;
        }
        return result;
    }
    exports.extractBIC = extractBIC;
    /**
     * Used for Norway BBAN check
     *
     * @ignore
     */
    var checkNorwayBBAN = function (bban) {
        var weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        var bbanWithoutSpacesAndPeriods = bban.replace(/[\s.]+/g, '');
        var controlDigit = parseInt(bbanWithoutSpacesAndPeriods.charAt(10), 10);
        var bbanWithoutControlDigit = bbanWithoutSpacesAndPeriods.substring(0, 10);
        var sum = 0;
        for (var index = 0; index < 10; index++) {
            sum += parseInt(bbanWithoutControlDigit.charAt(index), 10) * weights[index];
        }
        var remainder = sum % 11;
        return controlDigit === (remainder === 0 ? 0 : 11 - remainder);
    };
    /**
     * Used for Belgian BBAN check
     *
     * @ignore
     */
    var checkBelgianBBAN = function (bban) {
        var stripped = bban.replace(/[\s.]+/g, '');
        var checkingPart = parseInt(stripped.substring(0, stripped.length - 2), 10);
        var checksum = parseInt(stripped.substring(stripped.length - 2, stripped.length), 10);
        var remainder = checkingPart % 97 === 0 ? 97 : checkingPart % 97;
        return remainder === checksum;
    };
    /**
     * Mod 97/10 calculation
     *
     * @ignore
     */
    var mod9710 = function (validationString) {
        while (validationString.length > 2) {
            // > Any computer programming language or software package that is used to compute D
            // > mod 97 directly must have the ability to handle integers of more than 30 digits.
            // > In practice, this can only be done by software that either supports
            // > arbitrary-precision arithmetic or that can handle 219-bit (unsigned) integers
            // https://en.wikipedia.org/wiki/International_Bank_Account_Number#Modulo_operation_on_IBAN
            var part = validationString.slice(0, 6);
            var partInt = parseInt(part, 10);
            if (isNaN(partInt)) {
                return NaN;
            }
            validationString = (partInt % 97) + validationString.slice(part.length);
        }
        return parseInt(validationString, 10) % 97;
    };
    /**
     * Check BBAN based on Mod97/10 calculation for countries that support it:
     * BA, ME, MK, PT, RS, SI
     *
     * @ignore
     */
    var checkMod9710BBAN = function (bban) {
        var stripped = bban.replace(/[\s.]+/g, '');
        var reminder = mod9710(stripped);
        return reminder === 1;
    };
    /**
     * Used for Poland BBAN check
     *
     * @ignore
     */
    var checkPolandBBAN = function (bban) {
        var weights = [3, 9, 7, 1, 3, 9, 7];
        var controlDigit = parseInt(bban.charAt(7), 10);
        var toCheck = bban.substring(0, 7);
        var sum = 0;
        for (var index = 0; index < 7; index++) {
            sum += parseInt(toCheck.charAt(index), 10) * weights[index];
        }
        var remainder = sum % 10;
        return controlDigit === (remainder === 0 ? 0 : 10 - remainder);
    };
    /**
     * Spain (ES) BBAN check
     *
     * @ignore
     */
    var checkSpainBBAN = function (bban) {
        var weightsBankBranch = [4, 8, 5, 10, 9, 7, 3, 6];
        var weightsAccount = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6];
        var controlBankBranch = parseInt(bban.charAt(8), 10);
        var controlAccount = parseInt(bban.charAt(9), 10);
        var bankBranch = bban.substring(0, 8);
        var account = bban.substring(10, 20);
        var sum = 0;
        for (var index = 0; index < 8; index++) {
            sum += parseInt(bankBranch.charAt(index), 10) * weightsBankBranch[index];
        }
        var remainder = sum % 11;
        if (controlBankBranch !== (remainder === 0 ? 0 : remainder === 1 ? 1 : 11 - remainder)) {
            return false;
        }
        sum = 0;
        for (var index = 0; index < 10; index++) {
            sum += parseInt(account.charAt(index), 10) * weightsAccount[index];
        }
        remainder = sum % 11;
        return controlAccount === (remainder === 0 ? 0 : remainder === 1 ? 1 : 11 - remainder);
    };
    /**
     * Mod 11/10 check
     *
     * @ignore
     */
    var checkMod1110 = function (toCheck, control) {
        var nr = 10;
        for (var index = 0; index < toCheck.length; index++) {
            nr += parseInt(toCheck.charAt(index), 10);
            if (nr % 10 !== 0) {
                nr = nr % 10;
            }
            nr = nr * 2;
            nr = nr % 11;
        }
        return control === (11 - nr === 10 ? 0 : 11 - nr);
    };
    /**
     * Croatian (HR) BBAN check
     *
     * @ignore
     */
    var checkCroatianBBAN = function (bban) {
        var controlBankBranch = parseInt(bban.charAt(6), 10);
        var controlAccount = parseInt(bban.charAt(16), 10);
        var bankBranch = bban.substring(0, 6);
        var account = bban.substring(7, 16);
        return checkMod1110(bankBranch, controlBankBranch) && checkMod1110(account, controlAccount);
    };
    /**
     * Czech (CZ) and Slowak (SK) BBAN check
     *
     * @ignore
     */
    var checkCzechAndSlovakBBAN = function (bban) {
        var weightsPrefix = [10, 5, 8, 4, 2, 1];
        var weightsSuffix = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        var controlPrefix = parseInt(bban.charAt(9), 10);
        var controlSuffix = parseInt(bban.charAt(19), 10);
        var prefix = bban.substring(4, 9);
        var suffix = bban.substring(10, 19);
        var sum = 0;
        for (var index = 0; index < prefix.length; index++) {
            sum += parseInt(prefix.charAt(index), 10) * weightsPrefix[index];
        }
        var remainder = sum % 11;
        if (controlPrefix !== (remainder === 0 ? 0 : remainder === 1 ? 1 : 11 - remainder)) {
            return false;
        }
        sum = 0;
        for (var index = 0; index < suffix.length; index++) {
            sum += parseInt(suffix.charAt(index), 10) * weightsSuffix[index];
        }
        remainder = sum % 11;
        return controlSuffix === (remainder === 0 ? 0 : remainder === 1 ? 1 : 11 - remainder);
    };
    /**
     * Estonian (EE) BBAN check
     *
     * @ignore
     */
    var checkEstonianBBAN = function (bban) {
        var weights = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7];
        var controlDigit = parseInt(bban.charAt(15), 10);
        var toCheck = bban.substring(2, 15);
        var sum = 0;
        for (var index = 0; index < toCheck.length; index++) {
            sum += parseInt(toCheck.charAt(index), 10) * weights[index];
        }
        var remainder = sum % 10;
        return controlDigit === (remainder === 0 ? 0 : 10 - remainder);
    };
    /**
     * Check French (FR) BBAN
     * Also for Monaco (MC)
     *
     * @ignore
     */
    var checkFrenchBBAN = function (bban) {
        var stripped = bban.replace(/[\s.]+/g, '');
        var normalized = Array.from(stripped);
        for (var index = 0; index < stripped.length; index++) {
            var c = normalized[index].charCodeAt(0);
            if (c >= 65) {
                switch (c) {
                    case 65:
                    case 74:
                        normalized[index] = '1';
                        break;
                    case 66:
                    case 75:
                    case 83:
                        normalized[index] = '2';
                        break;
                    case 67:
                    case 76:
                    case 84:
                        normalized[index] = '3';
                        break;
                    case 68:
                    case 77:
                    case 85:
                        normalized[index] = '4';
                        break;
                    case 69:
                    case 78:
                    case 86:
                        normalized[index] = '5';
                        break;
                    case 70:
                    case 79:
                    case 87:
                        normalized[index] = '6';
                        break;
                    case 71:
                    case 80:
                    case 88:
                        normalized[index] = '7';
                        break;
                    case 72:
                    case 81:
                    case 89:
                        normalized[index] = '8';
                        break;
                    case 73:
                    case 82:
                    case 90:
                        normalized[index] = '9';
                        break;
                }
            }
        }
        var remainder = mod9710(normalized.join(''));
        return remainder === 0;
    };
    /**
     * Hungarian (HU) BBAN check
     *
     * @ignore
     */
    var checkHungarianBBAN = function (bban) {
        var weights = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7, 3, 1, 9, 7, 3];
        var controlDigitBankBranch = parseInt(bban.charAt(7), 10);
        var toCheckBankBranch = bban.substring(0, 7);
        var sum = 0;
        for (var index = 0; index < toCheckBankBranch.length; index++) {
            sum += parseInt(toCheckBankBranch.charAt(index), 10) * weights[index];
        }
        var remainder = sum % 10;
        if (controlDigitBankBranch !== (remainder === 0 ? 0 : 10 - remainder)) {
            return false;
        }
        sum = 0;
        if (bban.endsWith('00000000')) {
            var toCheckAccount = bban.substring(8, 15);
            var controlDigitAccount = parseInt(bban.charAt(15), 10);
            for (var index = 0; index < toCheckAccount.length; index++) {
                sum += parseInt(toCheckAccount.charAt(index), 10) * weights[index];
            }
            var remainder_1 = sum % 10;
            return controlDigitAccount === (remainder_1 === 0 ? 0 : 10 - remainder_1);
        }
        else {
            var toCheckAccount = bban.substring(8, 23);
            var controlDigitAccount = parseInt(bban.charAt(23), 10);
            for (var index = 0; index < toCheckAccount.length; index++) {
                sum += parseInt(toCheckAccount.charAt(index), 10) * weights[index];
            }
            var remainder_2 = sum % 10;
            return controlDigitAccount === (remainder_2 === 0 ? 0 : 10 - remainder_2);
        }
    };
    /**
     * Set custom BBAN validation function for country.
     *
     * If `bban_validation_func` already exists for the corresponding country,
     * it will be overwritten.
     */
    var setCountryBBANValidation = function (country, func) {
        if (typeof exports.countrySpecs[country] === 'undefined') {
            return false;
        }
        exports.countrySpecs[country].bban_validation_func = func;
        return true;
    };
    exports.setCountryBBANValidation = setCountryBBANValidation;
    /**
     * Country specifications
     */
    exports.countrySpecs = {
        AD: {
            chars: 24,
            bban_regexp: '^[0-9]{8}[A-Z0-9]{12}$',
            IBANRegistry: true,
            SEPA: true,
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
            bban_validation_func: checkMod9710BBAN,
            IBANRegistry: true,
        },
        BB: {},
        BD: {},
        BE: { chars: 16, bban_regexp: '^[0-9]{12}$', bban_validation_func: checkBelgianBBAN, IBANRegistry: true, SEPA: true },
        BF: {
            chars: 28,
            bban_regexp: '^[A-Z0-9]{2}[0-9]{22}$',
        },
        BG: {
            chars: 22,
            bban_regexp: '^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$',
            IBANRegistry: true,
            SEPA: true,
        },
        BH: {
            chars: 22,
            bban_regexp: '^[A-Z]{4}[A-Z0-9]{14}$',
            IBANRegistry: true,
        },
        BI: {
            chars: 27,
            bban_regexp: '^[0-9]{23}$',
        },
        BJ: {
            chars: 28,
            bban_regexp: '^[A-Z0-9]{2}[0-9]{22}$',
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
        CZ: {
            chars: 24,
            bban_regexp: '^[0-9]{20}$',
            bban_validation_func: checkCzechAndSlovakBBAN,
            IBANRegistry: true,
            SEPA: true,
        },
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
            chars: 26,
            bban_regexp: '^[0-9]{22}$',
        },
        EC: {},
        EE: {
            chars: 20,
            bban_regexp: '^[0-9]{16}$',
            bban_validation_func: checkEstonianBBAN,
            IBANRegistry: true,
            SEPA: true,
        },
        EG: { chars: 29, bban_regexp: '^[0-9]{25}', IBANRegistry: true },
        EH: {},
        ER: {},
        ES: {
            chars: 24,
            bban_validation_func: checkSpainBBAN,
            bban_regexp: '^[0-9]{20}$',
            IBANRegistry: true,
            SEPA: true,
        },
        ET: {},
        FI: {
            chars: 18,
            bban_regexp: '^[0-9]{14}$',
            IBANRegistry: true,
            SEPA: true,
        },
        FJ: {},
        FK: {},
        FM: {},
        FO: { chars: 18, bban_regexp: '^[0-9]{14}$', IBANRegistry: true },
        FR: {
            chars: 27,
            bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$',
            bban_validation_func: checkFrenchBBAN,
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
        GL: { chars: 18, bban_regexp: '^[0-9]{14}$', IBANRegistry: true },
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
        HR: {
            chars: 21,
            bban_regexp: '^[0-9]{17}$',
            bban_validation_func: checkCroatianBBAN,
            IBANRegistry: true,
            SEPA: true,
        },
        HT: {},
        HU: {
            chars: 28,
            bban_regexp: '^[0-9]{24}$',
            bban_validation_func: checkHungarianBBAN,
            IBANRegistry: true,
            SEPA: true,
        },
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
            bban_validation_func: checkFrenchBBAN,
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
            bban_validation_func: checkMod9710BBAN,
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
            bban_validation_func: checkMod9710BBAN,
            IBANRegistry: true,
        },
        ML: {
            chars: 28,
            bban_regexp: '^[A-Z0-9]{2}[0-9]{22}$',
        },
        MM: {},
        MN: {
            chars: 20,
            bban_regexp: '^[0-9]{16}$',
        },
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
        NO: {
            chars: 15,
            bban_regexp: '^[0-9]{11}$',
            bban_validation_func: checkNorwayBBAN,
            IBANRegistry: true,
            SEPA: true,
        },
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
        PL: { chars: 28, bban_validation_func: checkPolandBBAN, bban_regexp: '^[0-9]{24}$', IBANRegistry: true, SEPA: true },
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
        PT: { chars: 25, bban_regexp: '^[0-9]{21}$', bban_validation_func: checkMod9710BBAN, IBANRegistry: true, SEPA: true },
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
            bban_validation_func: checkMod9710BBAN,
            IBANRegistry: true,
        },
        RU: {
            chars: 33,
            bban_regexp: '^[0-9]{14}[A-Z0-9]{15}$',
            IBANRegistry: true,
        },
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
        SD: {
            chars: 18,
            bban_regexp: '^[0-9]{14}$',
            IBANRegistry: true,
        },
        SE: { chars: 24, bban_regexp: '^[0-9]{20}$', IBANRegistry: true, SEPA: true },
        SG: {},
        SH: {},
        SI: {
            chars: 19,
            bban_regexp: '^[0-9]{15}$',
            bban_validation_func: checkMod9710BBAN,
            IBANRegistry: true,
            SEPA: true,
        },
        SJ: {},
        SK: {
            chars: 24,
            bban_regexp: '^[0-9]{20}$',
            bban_validation_func: checkCzechAndSlovakBBAN,
            IBANRegistry: true,
            SEPA: true,
        },
        SL: {},
        SM: {
            chars: 27,
            bban_regexp: '^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$',
            IBANRegistry: true,
            SEPA: true,
        },
        SN: {
            chars: 28,
            bban_regexp: '^[A-Z]{2}[0-9]{22}$',
        },
        SO: {
            chars: 23,
            bban_regexp: '^[0-9]{19}$',
            IBANRegistry: true,
        },
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
