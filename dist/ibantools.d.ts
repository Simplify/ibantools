/*!
 * @license
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/**
 * Interface for IBAN Country Specification
 */
export interface CountrySpec {
    chars: number;
    name: string;
    bban_regexp: string;
}
/**
 * Interface for Map of country specifications
 */
export interface CountryMap {
    [code: string]: CountrySpec;
}
/**
 * Validate IBAN
 * @example
 * // returns true
 * ibantools.isValidIBAN('NL91 ABNA 0517 1643 00');
 * @example
 * // returns true
 * ibantools.isValidIBAN('NL91-ABNA-0517-1643-00');
 * @example
 * // returns false
 * ibantools.isValidIBAN('NL92 ABNA 0517 1643 00');
 * @alias module:ibantools.isValidIBAN
 * @param {string} IBAN IBAN
 * @return {boolean} valid
 */
export declare function isValidIBAN(iban: string): boolean;
/**
 * Validate BBAN
 * @example
 * // returns true
 * ibantools.isValidBBAN('ABNA 0517 1643 00', 'NL');
 * @example
 * // returns true
 * ibantools.isValidBBAN('ABNA0517164300', 'NL');
 * @example
 * // returns false
 * ibantools.isValidBBAN('A7NA 0517 1643 00', 'NL');
 * @alias module:ibantools.isValidBBAN
 * @param {string} BBAN BBAN
 * @param {string} countryCode Country code
 * @return {boolean} valid
 */
export declare function isValidBBAN(bban: string, countryCode: string): boolean;
/**
 * Interface for ComposeIBAN parameteres
 */
export interface ComposeIBANParms {
    countryCode?: string;
    bban?: string;
}
/**
 * composeIBAN
 * @example
 * // returns NL91ABNA0417164300
 * ibantools.composeIBAN('NL', 'ABNA0417164300');
 * @alias module:ibantools.composeIBAN
 * @param {ComposeIBANParams} Object {bban: string, countryCode: string}
 * @result {string} IBAN IBAN
 */
export declare function composeIBAN(params: ComposeIBANParms): string;
/**
 * Interface for ExtractIBAN result
 */
export interface ExtractIBANResult {
    bban?: string;
    countryCode?: string;
    countryName?: string;
    valid: boolean;
}
/**
 * extractIBAN
 * @example
 * // returns {bban: 'ABNA0417164300', countryCode: 'NL', countryName: 'Netherlands', valid: true}
 * ibantools.extractIBAN('NL91ABNA0417164300');
 * @alias module:ibantools.extractIBAN
 * @param {string} IBAN IBAN
 * @return {ExtractIBANResult} Object {bban: string, countryCode: string, countryName: string, valid: boolean}
 */
export declare function extractIBAN(iban: string): ExtractIBANResult;
/**
 * Get IBAN in electronic format (no spaces)
 * IBAN validation is not performed.
 * @example
 * // returns 'NL91ABNA0417164300'
 * ibantools.electronicFormatIBAN('NL91 ABNA 0417 1643 00');
 * @alias module:ibantools.electronicFormatIBAN
 * @param {string} IBAN IBAN
 * @return {string} IBAN Electronic formated IBAN
 */
export declare function electonicFormatIBAN(iban: string): string;
/**
 * Get IBAN in friendly format (separated after every 4 characters)
 * IBAN validation is not performed.
 * @example
 * // returns 'NL91 ABNA 0417 1643 00'
 * ibantools.electronicFormatIBAN('NL91ABNA0417164300');
 * @example
 * // returns 'NL91-ABNA-0417-1643-00'
 * ibantools.electronicFormatIBAN('NL91ABNA0417164300','-');
 * @alias module:ibantools.friendlyFormatIBAN
 * @param {string} IBAN IBAN
 * @param {string} separator Not required. Default separator is space ' '
 * @return {string} IBAN Friendly formated IBAN
 */
export declare function friendlyFormatIBAN(iban: string, separator?: string): string;
/**
 * getCountrySpecifications
 * @example
 * // Validating IBAN form field after user selects his country
 * // <select id="countries">
 * //   ...
 * //   <option value="NL">Netherlands</option>
 * //   ...
 * // </select>
 * $('#countries').select(function() {
 *   // Find country
 *   let country = ibantools.getCountrySpecifications()[$(this).val()];
 *   // Add country code letters to IBAN form field
 *   $('input#iban').value($(this).val());
 *   // Add new value to 'pattern' attribute to #iban input text field
 *   $('input#iban').attr('pattern', $(this).val() + '[0-9]{2}' + country.bban_regexp.slice(1).replace('$',''));
 * });
 * @alias module:ibantools.getCountrySpecifications
 * @return {CountryMap} Object [countryCode: string]CountrySpec -> {chars: :number, bban_regexp: string, name: string}
 */
export declare function getCountrySpecifications(): CountryMap;
/**
 * Validate BIC/SWIFT
 * @example
 * // returns true
 * ibantools.isValidBIC('ABNANL2A');
 * @example
 * // returns true
 * ibantools.isValidBIC('NEDSZAJJXXX');
 * @example
 * // returns false
 * ibantools.isValidBIC('ABN4NL2A');
 * @example
 * // returns false
 * ibantools.isValidBIC('ABNA NL 2A');
 * @alias module:ibantools.isValidBIC
 * @param {string} BIC BIC
 * @return {boolean} valid
 */
export declare function isValidBIC(bic: string): boolean;
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
 * @example
 * // returns {bankCode: 'ABNA', countryCode: 'NL', locationCode: '2A', branchCode: null, testBIC: flase, valid: true}
 * ibantools.extractBIC('ABNANL2A');
 * @alias module:ibantools.extractBIC
 * @param {string} BIC BIC
 * @return {ExtractBICResult} Object {bancCode: string, countryCode: string, locationCode: string, branchCode: string, testBIC: boolean, valid: boolean}
 */
export declare function extractBIC(bic: string): ExtractBICResult;
