/*!
 * @license
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * @file Validation, extraction and creation of IBAN, BBAN, BIC/SWIFT numbers plus some other helpful stuff
 * @author Saša Jovanić
 * @module ibantools
 * @see module:ibantools
 * @version 2.1.0
 * @license MPL-2.0
 */
"use strict";

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
export function isValidIBAN(iban: string): boolean {
  if (iban !== undefined && iban !== null) {
    const spec = countrySpecs[iban.slice(0, 2)];
    if (spec !== undefined &&
        spec.IBANRegistry &&
        spec.chars === iban.length &&
        checkFormatBBAN(iban.slice(4), spec.bban_regexp) &&
        mod9710(iban) === 1) {
      return true;
    }
  }
  return false;
}

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
export function isValidBBAN(bban: string, countryCode: string): boolean {
  if (bban !== undefined && bban !== null && countryCode !== undefined && countryCode !== null) {
    const spec = countrySpecs[countryCode];
    if (spec !== undefined &&
        spec.chars - 4 === bban.length &&
        checkFormatBBAN(bban, spec.bban_regexp)) {
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
 * ibantools.composeIBAN("NL", "ABNA0417164300");
 * @alias module:ibantools.composeIBAN
 * @param {ComposeIBANParams} Object {bban: string, countryCode: string}
 * @result {string} IBAN IBAN
 */
export function composeIBAN(params: ComposeIBANParms): string {
  const bban: string = electronicFormatIBAN(params.bban);
  const spec = countrySpecs[params.countryCode];
  if (bban !== null &&
      spec !== undefined &&
      spec.chars === (bban.length + 4) &&
      checkFormatBBAN(bban, spec.bban_regexp)) {
    const checksom = mod9710(params.countryCode + "00" + bban);
    return params.countryCode + ("0" + (98 - checksom)).slice(-2) + bban;
  }
  return null;
}

/**
 * Interface for ExtractIBAN result
 */
export interface ExtractIBANResult {
  iban: string;
  bban?: string;
  countryCode?: string;
  countryName?: string;
  valid: boolean;
}

/**
 * extractIBAN
 * @example
 * // returns {iban: "NL91ABNA0417164300", bban: "ABNA0417164300", countryCode: "NL", countryName: "Netherlands", valid: true}
 * ibantools.extractIBAN("NL91 ABNA 0417 1643 00");
 * @alias module:ibantools.extractIBAN
 * @param {string} IBAN IBAN
 * @return {ExtractIBANResult} Object {iban: string, bban: string, countryCode: string, countryName: string, valid: boolean}
 */
export function extractIBAN(iban: string): ExtractIBANResult {
  const result = {} as ExtractIBANResult;
  result.iban = iban;
  if (isValidIBAN(iban)) {
    result.bban = iban.slice(4);
    result.countryCode = iban.slice(0, 2);
    const spec = countrySpecs[result.countryCode];
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
  const reg = new RegExp(bformat, "");
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
export function electronicFormatIBAN(iban: string) {
  if (typeof iban !== "string") { return null; }
  return iban.replace(/[-\ ]/g, "").toUpperCase();
}

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
export function friendlyFormatIBAN(iban: string, separator?: string) {
  if (typeof iban !== "string") { return null; }
  if (typeof separator === "undefined") { separator = " "; }
  return electronicFormatIBAN(iban).replace(/(.{4})(?!$)/g, "$1" + separator);
}

/**
 * MOD-97-10
 * @param {string}
 * @return {number}
 */
function mod9710(iban: string): number {
  iban = iban.slice(3) + iban.slice(0, 4);
  let validationString: string = "";
  for (let n: number = 1; n < iban.length; n++) {
    const c = iban.charCodeAt(n);
    if (c >= 65) {
      validationString += (c - 55).toString();
    } else {
      validationString += iban[n];
    }
  }
  while (validationString.length > 2) {
    const part = validationString.slice(0, 6);
    validationString = (parseInt(part, 10) % 97).toString() + validationString.slice(part.length);
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
 * @return {CountryMap} Object [countryCode: string]CountrySpec -> {chars: :number, bban_regexp: string, name: string, IBANRegistry: boolean}
 */
export function getCountrySpecifications(): CountryMap {
  return countrySpecs;
}

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
export function isValidBIC(bic: string): boolean {
  const reg = new RegExp("^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$", "");
  const spec = countrySpecs[bic.toUpperCase().slice(4, 6)];
  return reg.test(bic) && spec !== undefined;
}

/**
 * Interface for ExtractBIC result
 */
export interface ExtractBICResult {
  bankCode?: string;
  countryCode?: string;
  countryName?: string;
  locationCode?: string;
  branchCode?: string;
  testBIC?: boolean;
  valid: boolean;
}

/**
 * extractBIC
 * @example
 * // returns {bankCode: "ABNA", countryCode: "NL", countryName: "Netherlands", locationCode: "2A", branchCode: null, testBIC: flase, valid: true}
 * ibantools.extractBIC("ABNANL2A");
 * @alias module:ibantools.extractBIC
 * @param {string} BIC BIC
 * @return {ExtractBICResult} Object {bancCode: string, countryCode: string, countryName: string, locationCode: string, branchCode: string, testBIC: boolean, valid: boolean}
 */
export function extractBIC(inputBic: string): ExtractBICResult {
  const result = {} as ExtractBICResult;
  const bic = inputBic.toUpperCase();
  if (isValidBIC(bic)) {
    result.bankCode = bic.slice(0, 4);
    result.countryCode = bic.slice(4, 6);
    const spec = countrySpecs[result.countryCode];
    result.countryName = spec.name;
    result.locationCode = bic.slice(6, 8);
    result.testBIC = (result.locationCode[1] === "0" ? true : false);
    result.branchCode = (bic.length > 8 ? bic.slice(8) : "619");
    result.valid = true;
  } else {
    result.valid = false;
  }
  return result;
}

/**
 * Interface for IBAN Country Specification
 */
export interface CountrySpec {
  chars: number;
  name: string;
  bban_regexp: string;
  IBANRegistry: boolean;
}

/**
 * Interface for Map of Country Specifications
 */
export interface CountryMap {
  [code: string]: CountrySpec;
}

// Country specifications
const countrySpecs: CountryMap = {
  AD: {chars: 24, bban_regexp: "^[0-9]{8}[A-Z0-9]{12}$", name: "Andorra", IBANRegistry: true},
  AE: {chars: 23, bban_regexp: "^[0-9]{3}[0-9]{16}$", name: "United Arab Emirates", IBANRegistry: true},
  AF: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Afganistan"},
  AG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Antigua and Bermuda"},
  AI: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Anguilla"},
  AL: {chars: 28, bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$", name: "Albania", IBANRegistry: true},
  AM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Armenia"},
  AO: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Angola"},
  AQ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Antartica"},
  AR: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Argentina"},
  AS: {chars: null, bban_regexp: null, IBANRegistry: false, name: "American Samoa"},
  AT: {chars: 20, bban_regexp: "^[0-9]{16}$", name: "Austria", IBANRegistry: true},
  AU: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Australia"},
  AW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Aruba"},
  AX: {chars: 18, bban_regexp: "^[0-9]{14}$", name: "Åland Islands", IBANRegistry: true},
  AZ: {chars: 28, bban_regexp: "^[A-Z]{4}[0-9]{20}$", name: "Republic of Azerbaijan", IBANRegistry: true},
  BA: {chars: 20, bban_regexp: "^[0-9]{16}$", name: "Bosnia and Herzegovina", IBANRegistry: true},
  BB: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Barbados"},
  BD: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Bangladesh"},
  BE: {chars: 16, bban_regexp: "^[0-9]{12}$", name: "Belgium", IBANRegistry: true},
  BF: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Burkina Faso"},
  BG: {chars: 22, bban_regexp: "^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$", name: "Bulgaria", IBANRegistry: true},
  BH: {chars: 22, bban_regexp: "^[A-Z]{4}[A-Z0-9]{14}$", name: "Bahrain", IBANRegistry: true},
  BI: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Burundi"},
  BJ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Benin"},
  BL: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Saint Barthelemy", IBANRegistry: true},
  BM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Bermuda"},
  BN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Brunei Darusslam"},
  BO: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Bolivia, Plurinational State of"},
  BQ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Bonaire, Sint Eustatius and Saba"},
  BR: {chars: 29, bban_regexp: "^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$", name: "Brazil", IBANRegistry: true},
  BS: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Bahamas"},
  BT: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Bhutan"},
  BV: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Bouvet Island"},
  BW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Botswana"},
  BY: {chars: 28, bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{16}$", name: "Republic of Belarus", IBANRegistry: true},
  BZ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Belize"},
  CA: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Canada"},
  CC: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Cocos (Keeling) Islands"},
  CD: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Congo, the Democratic Republic of the"},
  CF: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Central African Republic"},
  CG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Congo"},
  CH: {chars: 21, bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$", name: "Switzerland", IBANRegistry: true},
  CI: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Côte d'Ivoire"},
  CK: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Cook Islands"},
  CL: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Chile"},
  CM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Cameroon"},
  CN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "China"},
  CO: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Columbia"},
  CR: {chars: 22, bban_regexp: "^[0-9]{18}$", name: "Costa Rica", IBANRegistry: true},
  CU: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Cuba"},
  CV: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Cabo Verde"},
  CW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Curaçao"},
  CX: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Christmas Island"},
  CY: {chars: 28, bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$", name: "Cyprus", IBANRegistry: true},
  CZ: {chars: 24, bban_regexp: "^[0-9]{20}$", name: "Czech Republic", IBANRegistry: true},
  DE: {chars: 22, bban_regexp: "^[0-9]{18}$", name: "Germany", IBANRegistry: true},
  DJ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Djibouti"},
  DK: {chars: 18, bban_regexp: "^[0-9]{14}$", name: "Denmark", IBANRegistry: true},
  DM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Dominica"},
  DO: {chars: 28, bban_regexp: "^[A-Z]{4}[0-9]{20}$", name: "Dominican Republic", IBANRegistry: true},
  DZ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Algeria"},
  EC: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Ecuador"},
  EE: {chars: 20, bban_regexp: "^[0-9]{16}$", name: "Estonia", IBANRegistry: true},
  EG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Egypt"},
  EH: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Western Sahara"},
  ER: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Eritrea"},
  ES: {chars: 24, bban_regexp: "^[0-9]{20}$", name: "Spain", IBANRegistry: true},
  ET: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Ethiopia"},
  FI: {chars: 18, bban_regexp: "^[0-9]{14}$", name: "Finland", IBANRegistry: true},
  FJ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Fiji"},
  FK: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Falkland Islands (Malvinas)"},
  FM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Micronesia, Federated States of"},
  FO: {chars: 18, bban_regexp: "^[0-9]{14}$", name: "Faroe Islands (Denmark)", IBANRegistry: true},
  FR: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "France", IBANRegistry: true},
  GA: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Gabon"},
  GB: {chars: 22, bban_regexp: "^[A-Z]{4}[0-9]{14}$", name: "United Kingdom", IBANRegistry: true},
  GD: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Grenada"},
  GE: {chars: 22, bban_regexp: "^[A-Z0-9]{2}[0-9]{16}$", name: "Georgia", IBANRegistry: true},
  GF: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "French Guyana", IBANRegistry: true},
  GG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Guernsey"},
  GH: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Ghana"},
  GI: {chars: 23, bban_regexp: "^[A-Z]{4}[A-Z0-9]{15}$", name: "Gibraltar", IBANRegistry: true},
  GL: {chars: 18, bban_regexp: "^[0-9]{14}$", name: "Greenland", IBANRegistry: true},
  GM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Gambia"},
  GN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Guinea"},
  GP: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Guadeloupe", IBANRegistry: true},
  GQ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Equatorial Guinea"},
  GR: {chars: 27, bban_regexp: "^[0-9]{7}[A-Z0-9]{16}$", name: "Greece", IBANRegistry: true},
  GS: {chars: null, bban_regexp: null, IBANRegistry: false, name: "South Georgia and the South Sandwitch Islands"},
  GT: {chars: 28, bban_regexp: "^[A-Z0-9]{24}$", name: "Guatemala", IBANRegistry: true},
  GU: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Guam"},
  GW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Guinea-Bissau"},
  GY: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Guyana"},
  HK: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Hong Kong"},
  HM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Heard Island and McDonald Islands"},
  HN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Honduras"},
  HR: {chars: 21, bban_regexp: "^[0-9]{17}$", name: "Croatia", IBANRegistry: true},
  HT: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Haiti"},
  HU: {chars: 28, bban_regexp: "^[0-9]{24}$", name: "Hungary", IBANRegistry: true},
  ID: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Indonesia"},
  IE: {chars: 22, bban_regexp: "^[A-Z0-9]{4}[0-9]{14}$", name: "Republic of Ireland", IBANRegistry: true},
  IL: {chars: 23, bban_regexp: "^[0-9]{19}$", name: "Israel", IBANRegistry: true},
  IM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Isle of Man"},
  IN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "India"},
  IO: {chars: null, bban_regexp: null, IBANRegistry: false, name: "British Indian Ocean Territory"},
  IQ: {chars: 23, bban_regexp: "^[A-Z]{4}[0-9]{15}$", name: "Iraq", IBANRegistry: true},
  IR: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Iran, Islamic Republic of"},
  IS: {chars: 26, bban_regexp: "^[0-9]{22}$", name: "Iceland", IBANRegistry: true},
  IT: {chars: 27, bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$", name: "Italy", IBANRegistry: true},
  JE: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Jersey"},
  JM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Jamaica"},
  JO: {chars: 30, bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$", name: "Jordan", IBANRegistry: true},
  JP: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Japan"},
  KE: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Kenya"},
  KG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Kyrgyzstan"},
  KH: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Cambodia"},
  KI: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Kiribati"},
  KM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Comoros"},
  KN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Saint Kitts and Nevis"},
  KP: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Korea, Domocratic People's Republic of"},
  KR: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Korea, Republic of"},
  KW: {chars: 30, bban_regexp: "^[A-Z]{4}[A-Z0-9]{22}$", name: "Kuwait", IBANRegistry: true},
  KY: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Cayman Islands"},
  KZ: {chars: 20, bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$", name: "Kazakhstan", IBANRegistry: true},
  LA: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Lao People's Democratic Republic"},
  LB: {chars: 28, bban_regexp: "^[0-9]{4}[A-Z0-9]{20}$", name: "Lebanon", IBANRegistry: true},
  LC: {chars: 32, bban_regexp: "^[A-Z]{4}[A-Z0-9]{24}$", name: "Saint Lucia", IBANRegistry: true},
  LI: {chars: 21, bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$", name: "Liechtenstein", IBANRegistry: true},
  LK: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Sri Lanka"},
  LR: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Liberia"},
  LS: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Lesotho"},
  LT: {chars: 20, bban_regexp: "^[0-9]{16}$", name: "Lithuania", IBANRegistry: true},
  LU: {chars: 20, bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$", name: "Luxembourg", IBANRegistry: true},
  LV: {chars: 21, bban_regexp: "^[A-Z]{4}[A-Z0-9]{13}$", name: "Latvia", IBANRegistry: true},
  LY: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Libya"},
  MA: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Marocco"},
  MC: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Monaco", IBANRegistry: true},
  MD: {chars: 24, bban_regexp: "^[A-Z0-9]{2}[A-Z0-9]{18}$", name: "Moldova", IBANRegistry: true},
  ME: {chars: 22, bban_regexp: "^[0-9]{18}$", name: "Montenegro", IBANRegistry: true},
  MF: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Saint Martin", IBANRegistry: true},
  MG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Madagascar"},
  MH: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Marshall Islands"},
  MK: {chars: 19, bban_regexp: "^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$", name: "Macedonia, the former Yugoslav Republic of", IBANRegistry: true},
  ML: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Mali"},
  MM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Myanman"},
  MN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Mongolia"},
  MO: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Macao"},
  MP: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Northern mariana Islands"},
  MQ: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Martinique", IBANRegistry: true},
  MR: {chars: 27, bban_regexp: "^[0-9]{23}$", name: "Mauritania", IBANRegistry: true},
  MS: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Montserrat"},
  MT: {chars: 31, bban_regexp: "^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$", name: "Malta", IBANRegistry: true},
  MU: {chars: 30, bban_regexp: "^[A-Z]{4}[0-9]{19}[A-Z]{3}$", name: "Mauritius", IBANRegistry: true},
  MV: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Maldives"},
  MW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Malawi"},
  MX: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Mexico"},
  MY: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Malaysia"},
  MZ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Mozambique"},
  NA: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Namibia"},
  NC: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "New Caledonia", IBANRegistry: true},
  NE: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Niger"},
  NF: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Norfolk Island"},
  NG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Nigeria"},
  NI: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Nicaraqua"},
  NL: {chars: 18, bban_regexp: "^[A-Z]{4}[0-9]{10}$", name: "Netherlands", IBANRegistry: true},
  NO: {chars: 15, bban_regexp: "^[0-9]{11}$", name: "Norway", IBANRegistry: true},
  NP: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Nepal"},
  NR: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Nauru"},
  NU: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Niue"},
  NZ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "New Zealand"},
  OM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Oman"},
  PA: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Panama"},
  PE: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Peru"},
  PF: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "French Polynesia", IBANRegistry: true},
  PG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Papua New Guinea"},
  PH: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Philippines"},
  PK: {chars: 24, bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$", name: "Pakistan", IBANRegistry: true},
  PL: {chars: 28, bban_regexp: "^[0-9]{24}$", name: "Poland", IBANRegistry: true},
  PM: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Saint Pierre et Miquelon", IBANRegistry: true},
  PN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Pitcairn"},
  PR: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Puerto Rico"},
  PS: {chars: 29, bban_regexp: "^[A-Z0-9]{4}[0-9]{21}$", name: "Palestine, State of", IBANRegistry: true},
  PT: {chars: 25, bban_regexp: "^[0-9]{21}$", name: "Portugal", IBANRegistry: true},
  PW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Palau"},
  PY: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Paraguay"},
  QA: {chars: 29, bban_regexp: "^[A-Z]{4}[A-Z0-9]{21}$", name: "Qatar", IBANRegistry: true},
  RE: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Reunion", IBANRegistry: true},
  RO: {chars: 24, bban_regexp: "^[A-Z]{4}[A-Z0-9]{16}$", name: "Romania", IBANRegistry: true},
  RS: {chars: 22, bban_regexp: "^[0-9]{18}$", name: "Serbia", IBANRegistry: true},
  RU: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Russian Federation"},
  RW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Rwanda"},
  SA: {chars: 24, bban_regexp: "^[0-9]{2}[A-Z0-9]{18}$", name: "Saudi Arabia", IBANRegistry: true},
  SB: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Solomon Islands"},
  SC: {chars: 31, bban_regexp: "^[[A-Z]{4}[]0-9]{20}[A-Z]{3}$", name: "Seychelles", IBANRegistry: true},
  SD: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Sudan"},
  SE: {chars: 24, bban_regexp: "^[0-9]{20}$", name: "Sweden", IBANRegistry: true},
  SG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Singapore"},
  SH: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Saint Helena, Ascension and Tristan da Cunha"},
  SI: {chars: 19, bban_regexp: "^[0-9]{15}$", name: "Slovenia", IBANRegistry: true},
  SJ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Svalbard and Jan Mayen"},
  SK: {chars: 24, bban_regexp: "^[0-9]{20}$", name: "Slovak Republic", IBANRegistry: true},
  SL: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Siera Leone"},
  SM: {chars: 27, bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$", name: "San Marino", IBANRegistry: true},
  SN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Senegal"},
  SO: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Somalia"},
  SR: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Suriname"},
  SS: {chars: null, bban_regexp: null, IBANRegistry: false, name: "South Sudan"},
  ST: {chars: 25, bban_regexp: "^[0-9]{21}$", name: "Sao Tome And Principe", IBANRegistry: true},
  SV: {chars: 28, bban_regexp: "^[A-Z]{4}[0-9]{20}$", name: "El Salvador", IBANRegistry: true},
  SX: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Sint Maarten (Dutch part)"},
  SY: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Syrian Arab Republic"},
  SZ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Swaziland"},
  TC: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Turks and Caicos Islands"},
  TD: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Chad"},
  TF: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "French Southern Territories", IBANRegistry: true},
  TG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Togo"},
  TH: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Thailand"},
  TJ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Tajikistan"},
  TK: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Tokelau"},
  TL: {chars: 23, bban_regexp: "^[0-9]{19}$", name: "Timor-Leste", IBANRegistry: true},
  TM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Turkmenistan"},
  TN: {chars: 24, bban_regexp: "^[0-9]{20}$", name: "Tunisia", IBANRegistry: true},
  TO: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Tonga"},
  TR: {chars: 26, bban_regexp: "^[0-9]{5}[A-Z0-9]{17}$", name: "Turkey", IBANRegistry: true},
  TT: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Trinidad and Tobago"},
  TV: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Tuvalu"},
  TW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Taiwan, Province of China"},
  TZ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Tanzania, United republic of"},
  UA: {chars: 29, bban_regexp: "^[0-9]{6}[A-Z0-9]{19}$", name: "Ukraine", IBANRegistry: true},
  UG: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Uganda"},
  UM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "United States Minor Outlying Islands"},
  US: {chars: null, bban_regexp: null, IBANRegistry: false, name: "United States of America"},
  UY: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Uruguay"},
  UZ: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Uzbekistan"},
  VA: {chars: 22, bban_regexp: "^[0-9]{18}", IBANRegistry: true, name: "Vatican City State"},
  VC: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Saint Vincent and the Granadines"},
  VE: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Venezuela, Bolivian Republic of"},
  VG: {chars: 24, bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$", name: "Virgin Islands, British", IBANRegistry: true},
  VI: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Virgin Islands, U.S."},
  VN: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Viet Nam"},
  VU: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Vanautu"},
  WF: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Wallis and Futuna", IBANRegistry: true},
  WS: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Samoa"},
  XK: {chars: 20, bban_regexp: "^[0-9]{16}$", name: "Kosovo", IBANRegistry: true},
  YE: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Yemen"},
  YT: {chars: 27, bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$", name: "Mayotte", IBANRegistry: true},
  ZA: {chars: null, bban_regexp: null, IBANRegistry: false, name: "South Africa"},
  ZM: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Zambia"},
  ZW: {chars: null, bban_regexp: null, IBANRegistry: false, name: "Zimbabwe"},
};
