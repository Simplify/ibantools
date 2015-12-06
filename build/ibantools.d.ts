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
 * // returns false
 * ibantools.isValidIBAN('NL92 ABNA 0517 1643 00');
 * @alias module:ibantools.isValidIBAN
 * @param {string} IBAN IBAN
 * @return {boolean} valid
 */
export declare function isValidIBAN(iban: string): boolean;
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
 * @param {string} IBAN
 * @result {ExtractIBANResult} Object {bban: string, countryCode: string, countryName: string, valid: boolean}
 */
export declare function extractIBAN(iban: string): ExtractIBANResult;
/**
 * Get IBAN in electronic format (no spaces)
 * IBAN validation is not performed.
 * @example
 * // returns 'NL91ABNA0417164300'
 * ibantools.electronicFormatIBAN('NL91 ABNA 0417 1643 00');
 * @alias module:ibantools.electronicFormatIBAN
 * @param {string} IBAN
 * @return {string} IBAN
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
 * @param {string} IBAN
 * @param {string} separator Not required. Default separator is space ' '
 * @return {string} IBAN or null if IBAN is not valid
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
 *   $('input#iban').attr('pattern', $(this).val() + '[0-9]{2}' + country.bban_regexp.slice(1).slice(-1));
 * });
 * @alias module:ibantools.getCountrySpecifications
 * @return {CountryMap} Object [countryCode: string]CountrySpec -> {chars: :number, bban_regexp: string, name: string}
 */
export declare function getCountrySpecifications(): CountryMap;
