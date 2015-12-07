/*!
 * @license
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * @file Validation of IBAN numbers and generation of IBAN's plus some other helpful stuff
 * @author Saša Jovanić
 * @module ibantools
 * @see module:ibantools
 * @version 1.0.1
 * @license MPL-2.0
 */
"use strict";

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

// Country specifications
let countrySpecs: CountryMap = {};

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
export function isValidIBAN(iban: string): boolean {
  if (iban !== undefined && iban !== null) {
    let tmpIban: string = electonicFormatIBAN(iban);
    let spec = countrySpecs[tmpIban.slice(0,2)];
    if (spec !== undefined &&
        spec.chars === tmpIban.length &&
        checkFormatBBAN(tmpIban.slice(4), spec.bban_regexp) &&
        mod9710(tmpIban) === 1) {
      return true;
    }
  }
  return false;
}

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
export function isValidBBAN(bban: string, countryCode: string): boolean {
  if (bban !== undefined && bban !== null &&
			countryCode !== undefined && countryCode !== null) {
    const tmpBban: string = electonicFormatIBAN(bban);
    const spec = countrySpecs[countryCode];
    if (spec !== undefined &&
        spec.chars - 4 === tmpBban.length &&
        checkFormatBBAN(tmpBban, spec.bban_regexp)) {
      return true;
    }
  }
  return false;
}

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
export function composeIBAN(params: ComposeIBANParms): string {
  let bban: string = electonicFormatIBAN(params.bban);
  let spec = countrySpecs[params.countryCode];
  if (bban !== null &&
			spec !== undefined &&
      spec.chars === (bban.length + 4) &&
      checkFormatBBAN(bban, spec.bban_regexp)) {
    let checksom = mod9710(params.countryCode + '00' + bban);
    return params.countryCode + ('0' + (98 - checksom)).slice(-2) + bban;
  }
  return null;
}

/**
 * Interface for ExtractIBAN result
 */
export interface ExtractIBANResult {
  bban?:        string;
  countryCode?: string;
  countryName?: string;
  valid:        boolean;
}

/**
 * extractIBAN
 * @example
 * // returns {bban: 'ABNA0417164300', countryCode: 'NL', countryName: 'Netherlands', valid: true}
 * ibantools.extractIBAN('NL91ABNA0417164300');
 * @alias module:ibantools.extractIBAN
 * @param {string} IBAN IBAN
 * @result {ExtractIBANResult} Object {bban: string, countryCode: string, countryName: string, valid: boolean}
 */
export function extractIBAN(iban: string): ExtractIBANResult {
  let result = <ExtractIBANResult>{};
  iban = electonicFormatIBAN(iban);
  if(isValidIBAN(iban)) {
    result.bban = iban.slice(4);
    result.countryCode = iban.slice(0,2);
    let spec = countrySpecs[result.countryCode];
    result.countryName = spec.name;
    result.valid = true;
  } else {
    result.valid = false;
  }
  return result;
}

/**
 * Check BBAN format
 * @param {string} BBAN
 * @param {string} Regexp BBAN validation regexp
 * @return {boolean} valid
 */
function checkFormatBBAN(bban: string, bformat: string): boolean {
  let reg = new RegExp(bformat, '');
  return reg.test(bban);
}

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
export function electonicFormatIBAN(iban: string) {
	if (iban === undefined || iban === null) {
		return null;
	}
  return iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

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
export function friendlyFormatIBAN(iban: string, separator?: string) {
  if (typeof separator === 'undefined') { separator = ' '; }
  return electonicFormatIBAN(iban).replace(/(.{4})(?!$)/g, "$1" + separator);
}

/**
 * MOD-97-10
 * @param {string}
 * @return {number}
 */
function mod9710(iban: string): number {
  iban = iban.slice(3) + iban.slice(0,4);
  let validationString: string = '';
  for (var n:number =1; n < iban.length; n++) {
    let c = iban.charCodeAt(n);
    if (c >= 65) {
      validationString += (c - 55).toString();
    } else {
      validationString += iban[n];
    }
  }
  while(validationString.length > 2) {
    let part = validationString.slice(0,6);
    validationString = (parseInt(part, 10) % 97).toString() + validationString.slice(part.length);
  }
  return parseInt(validationString, 10) % 97;
}

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
export function getCountrySpecifications(): CountryMap {
  return countrySpecs;
}

/**
 * Fill map of IBAN country specifications
 */
countrySpecs['AL'] = {chars: 28, bban_regexp: '^[0-9]{8}[A-Z0-9]{16}$', name: 'Albania'};
countrySpecs['AD'] = {chars: 24, bban_regexp: '^[0-9]{8}[A-Z0-9]{12}$', name: 'Andorra'};
countrySpecs['AT'] = {chars: 20, bban_regexp: '^[0-9]{16}$', name: 'Austria'};
countrySpecs['AZ'] = {chars: 28, bban_regexp: '^[A-Z0-9]{4}[0-9]{20}$', name: 'Azerbaijan'};
countrySpecs['BH'] = {chars: 22, bban_regexp: '^[A-Z]{4}[A-Z0-9]{14}$', name: 'Bahrain'};
countrySpecs['BE'] = {chars: 16, bban_regexp: '^[0-9]{12}$', name: 'Belgium'};
countrySpecs['BA'] = {chars: 20, bban_regexp: '^[0-9]{16}$', name: 'Bosnia and Herzegovina'};
countrySpecs['BR'] = {chars: 29, bban_regexp: '^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$', name: 'Brazil'};
countrySpecs['BG'] = {chars: 22, bban_regexp: '^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$', name: 'Bulgaria'};
countrySpecs['CR'] = {chars: 21, bban_regexp: '^[0-9]{17}$', name: 'Costa Rica'};
countrySpecs['HR'] = {chars: 21, bban_regexp: '^[0-9]{17}$', name: 'Croatia'};
countrySpecs['CY'] = {chars: 28, bban_regexp: '^[0-9]{8}[A-Z0-9]{16}$', name: 'Cyprus'};
countrySpecs['CZ'] = {chars: 24, bban_regexp: '^[0-9]{20}$', name: 'Czech Republic'};
countrySpecs['DK'] = {chars: 18, bban_regexp: '^[0-9]{14}$', name: 'Denmark'};
countrySpecs['DO'] = {chars: 28, bban_regexp: '^[A-Z]{4}[0-9]{20}$', name: 'Dominican Republic'};
countrySpecs['TL'] = {chars: 23, bban_regexp: '^[0-9]{19}$', name: 'East Timor'};
countrySpecs['EE'] = {chars: 20, bban_regexp: '^[0-9]{16}$', name: 'Estonia'};
countrySpecs['FO'] = {chars: 18, bban_regexp: '^[0-9]{14}$', name: 'Faroe Islands'};
countrySpecs['FI'] = {chars: 18, bban_regexp: '^[0-9]{14}$', name: 'Finland'};
countrySpecs['FR'] = {chars: 27, bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$', name: 'France'};
countrySpecs['GE'] = {chars: 22, bban_regexp: '^[A-Z0-9]{2}[0-9]{16}$', name: 'Georgia (country)'};
countrySpecs['DE'] = {chars: 22, bban_regexp: '^[0-9]{18}$', name: 'Germany'};
countrySpecs['GI'] = {chars: 23, bban_regexp: '^[A-Z]{4}[A-Z0-9]{15}$', name: 'Gibraltar'};
countrySpecs['GR'] = {chars: 27, bban_regexp: '^[0-9]{7}[A-Z0-9]{16}$', name: 'Greece'};
countrySpecs['GL'] = {chars: 18, bban_regexp: '^[0-9]{14}$', name: 'Greenland'};
countrySpecs['GT'] = {chars: 28, bban_regexp: '^[A-Z0-9]{4}[A-Z0-9]{20}$', name: 'Guatemala'};
countrySpecs['HU'] = {chars: 28, bban_regexp: '^[0-9]{24}$', name: 'Hungary'};
countrySpecs['IS'] = {chars: 26, bban_regexp: '^[0-9]{22}$', name: 'Iceland'};
countrySpecs['IE'] = {chars: 22, bban_regexp: '^[A-Z0-9]{4}[0-9]{14}$', name: 'Republic of Ireland'};
countrySpecs['IL'] = {chars: 23, bban_regexp: '^[0-9]{19}$', name: 'Israel'};
countrySpecs['IT'] = {chars: 27, bban_regexp: '^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$', name: 'Italy'};
countrySpecs['JO'] = {chars: 30, bban_regexp: '^[A-Z]{4}[0-9]{22}$', name: 'Jordan'};
countrySpecs['KZ'] = {chars: 20, bban_regexp: '^[0-9]{3}[A-Z0-9]{13}$', name: 'Kazakhstan'};
countrySpecs['XK'] = {chars: 20, bban_regexp: '^[0-9]{4}[0-9]{10}[0-9]{2}$', name: 'Kosovo'};
countrySpecs['KW'] = {chars: 30, bban_regexp: '^[A-Z]{4}[A-Z0-9]{22}$', name: 'Kuwait'};
countrySpecs['LV'] = {chars: 21, bban_regexp: '^[A-Z]{4}[A-Z0-9]{13}$', name: 'Latvia'};
countrySpecs['LB'] = {chars: 28, bban_regexp: '^[0-9]{4}[A-Z0-9]{20}$', name: 'Lebanon'};
countrySpecs['LI'] = {chars: 21, bban_regexp: '^[0-9]{5}[A-Z0-9]{12}$', name: 'Liechtenstein'};
countrySpecs['LT'] = {chars: 20, bban_regexp: '^[0-9]{16}$', name: 'Lithuania'};
countrySpecs['LU'] = {chars: 20, bban_regexp: '^[0-9]{3}[A-Z0-9]{13}$', name: 'Luxembourg'};
countrySpecs['MK'] = {chars: 19, bban_regexp: '^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$', name: 'Republic of Macedonia'};
countrySpecs['MT'] = {chars: 31, bban_regexp: '^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$', name: 'Malta'};
countrySpecs['MR'] = {chars: 27, bban_regexp: '^[0-9]{23}$', name: 'Mauritania'};
countrySpecs['MU'] = {chars: 30, bban_regexp: '^[A-Z]{4}[0-9]{19}[A-Z]{3}$', name: 'Mauritius'};
countrySpecs['MC'] = {chars: 27, bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$', name: 'Monaco'};
countrySpecs['MD'] = {chars: 24, bban_regexp: '^[A-Z0-9]{2}[A-Z0-9]{18}$', name: 'Moldova'};
countrySpecs['ME'] = {chars: 22, bban_regexp: '^[0-9]{18}$', name: 'Montenegro'};
countrySpecs['NL'] = {chars: 18, bban_regexp: '^[A-Z]{4}[0-9]{10}$', name: 'Netherlands'};
countrySpecs['NO'] = {chars: 15, bban_regexp: '^[0-9]{11}$', name: 'Norway'};
countrySpecs['PK'] = {chars: 24, bban_regexp: '^[A-Z0-9]{4}[0-9]{16}$', name: 'Pakistan'};
countrySpecs['PS'] = {chars: 29, bban_regexp: '^[A-Z0-9]{4}[0-9]{21}$', name: 'Palestinian territories'};
countrySpecs['PL'] = {chars: 28, bban_regexp: '^[0-9]{24}$', name: 'Poland'};
countrySpecs['PT'] = {chars: 25, bban_regexp: '^[0-9]{21}$', name: 'Portugal'};
countrySpecs['QA'] = {chars: 29, bban_regexp: '^[A-Z]{4}[A-Z0-9]{21}$', name: 'Qatar'};
countrySpecs['RO'] = {chars: 24, bban_regexp: '^[A-Z]{4}[A-Z0-9]{16}$', name: 'Romania'};
countrySpecs['SM'] = {chars: 27, bban_regexp: '^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$', name: 'San Marino'};
countrySpecs['SA'] = {chars: 24, bban_regexp: '^[0-9]{2}[A-Z0-9]{18}$', name: 'Saudi Arabia'};
countrySpecs['RS'] = {chars: 22, bban_regexp: '^[0-9]{18}$', name: 'Serbia'};
countrySpecs['SK'] = {chars: 24, bban_regexp: '^[0-9]{20}$', name: 'Slovakia'};
countrySpecs['SI'] = {chars: 19, bban_regexp: '^[0-9]{15}$', name: 'Slovenia'};
countrySpecs['ES'] = {chars: 24, bban_regexp: '^[0-9]{20}$', name: 'Spain'};
countrySpecs['SE'] = {chars: 24, bban_regexp: '^[0-9]{20}$', name: 'Sweden'};
countrySpecs['CH'] = {chars: 21, bban_regexp: '^[0-9]{5}[A-Z0-9]{12}$', name: 'Switzerland'};
countrySpecs['TN'] = {chars: 24, bban_regexp: '^[0-9]{20}$', name: 'Tunisia'};
countrySpecs['TR'] = {chars: 26, bban_regexp: '^[0-9]{5}[A-Z0-9]{17}$', name: 'Turkey'};
countrySpecs['AE'] = {chars: 23, bban_regexp: '^[0-9]{3}[0-9]{16}$', name: 'United Arab Emirates'};
countrySpecs['GB'] = {chars: 22, bban_regexp: '^[A-Z]{4}[0-9]{14}$', name: 'United Kingdom'};
countrySpecs['VG'] = {chars: 24, bban_regexp: '^[A-Z0-9]{4}[0-9]{16}$', name: 'British Virgin Islands'};
