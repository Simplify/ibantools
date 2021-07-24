/*!
 * @license
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
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
v */
export declare function isValidIBAN(iban: string): boolean;
/**
 * IBAM validation errors
 */
export declare enum ValidationErrorsIBAN {
    NoIBANProvided = 0,
    NoIBANCountry = 1,
    WrongBBANLength = 2,
    WrongBBANFormat = 3,
    ChecksumNotNumber = 4,
    WrongIBANChecksum = 5
}
/**
 * Interface for ValidateIBAN result
 */
export interface ValidateIBANResult {
    errorCodes: ValidationErrorsIBAN[];
    valid: boolean;
}
/**
 * validateIBAN
 * ```
 * // returns {errorCodes: [], valid: true}
 * ibantools.validateIBAN("NL91 ABNA 0417 1643 00");
 * ```
 */
export declare function validateIBAN(iban?: string): ValidateIBANResult;
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
export declare function isValidBBAN(bban?: string, countryCode?: string): boolean;
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
export declare function isSEPACountry(countryCode: string): boolean;
/**
 * Interface for ComposeIBAN parameteres
 */
export interface ComposeIBANParams {
    countryCode?: string;
    bban?: string;
}
/**
 * composeIBAN
 *
 * ```
 * // returns NL91ABNA0417164300
 * ibantools.composeIBAN({ countryCode: "NL", bban: "ABNA0417164300" });
 * ```
 */
export declare function composeIBAN(params: ComposeIBANParams): string | null;
/**
 * Interface for ExtractIBAN result
 */
export interface ExtractIBANResult {
    iban: string;
    bban?: string;
    countryCode?: string;
    valid: boolean;
}
/**
 * extractIBAN
 * ```
 * // returns {iban: "NL91ABNA0417164300", bban: "ABNA0417164300", countryCode: "NL", valid: true}
 * ibantools.extractIBAN("NL91 ABNA 0417 1643 00");
 * ```
 */
export declare function extractIBAN(iban: string): ExtractIBANResult;
/**
 * Get IBAN in electronic format (no spaces)
 * IBAN validation is not performed.
 * When non-string value for IBAN is provided, returns null.
 * ```
 * // returns "NL91ABNA0417164300"
 * ibantools.electronicFormatIBAN("NL91 ABNA 0417 1643 00");
 * ```
 */
export declare function electronicFormatIBAN(iban?: string): string | null;
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
export declare function friendlyFormatIBAN(iban?: string, separator?: string): string | null;
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
export declare function getCountrySpecifications(): CountryMap;
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
export declare function isValidBIC(bic: string): boolean;
/**
 * BIC validation errors
 */
export declare enum ValidationErrorsBIC {
    NoBICProvided = 0,
    NoBICCountry = 1,
    WrongBICFormat = 2
}
/**
 * Interface for ValidateBIC result
 */
export interface ValidateBICResult {
    errorCodes: ValidationErrorsBIC[];
    valid: boolean;
}
/**
 * validateBIC
 * ```
 * // returns {errorCodes: [], valid: true}
 * ibantools.validateBIC("NEDSZAJJXXX");
 * ```
 */
export declare function validateBIC(bic?: string): ValidateBICResult;
/**
 * Interface for ExtractBIC result
 */
export interface ExtractBICResult {
    bankCode?: string;
    countryCode?: string;
    locationCode?: string;
    branchCode?: string;
    testBIC?: boolean;
    valid: boolean;
}
/**
 * extractBIC
 * ```
 * // returns {bankCode: "ABNA", countryCode: "NL", locationCode: "2A", branchCode: null, testBIC: flase, valid: true}
 * ibantools.extractBIC("ABNANL2A");
 * ```
 */
export declare function extractBIC(inputBic: string): ExtractBICResult;
/**
 * Interface for IBAN Country Specification
 */
export interface CountrySpec {
    chars: number | null;
    bban_regexp: string | null;
    IBANRegistry: boolean;
    SEPA: boolean;
}
/**
 * Interface for Map of Country Specifications
 */
export interface CountryMap {
    [code: string]: CountrySpec;
}
/**
 * Interface for IBAN Country Specification
 */
interface CountrySpecInternal {
    chars?: number;
    bban_regexp?: string;
    IBANRegistry?: boolean;
    SEPA?: boolean;
}
/**
 * Interface for Map of Country Specifications
 */
interface CountryMapInternal {
    [code: string]: CountrySpecInternal;
}
/**
 * Country specifications
 */
export declare const countrySpecs: CountryMapInternal;
export {};
