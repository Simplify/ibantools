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
 * @version 3.0.0
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
    const reg = new RegExp("^[0-9]{2}$", "");
    const spec = countrySpecs[iban.slice(0, 2)];
    if (
      spec !== undefined &&
      spec.chars === iban.length &&
      reg.test(iban.slice(2, 4)) &&
      checkFormatBBAN(iban.slice(4), spec.bban_regexp) &&
      isValidIBANChecksum(iban)
    ) {
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
  if (
    bban !== undefined &&
    bban !== null &&
    countryCode !== undefined &&
    countryCode !== null
  ) {
    const spec = countrySpecs[countryCode];
    if (
      spec !== undefined &&
      spec.chars - 4 === bban.length &&
      checkFormatBBAN(bban, spec.bban_regexp)
    ) {
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
  if (
    bban !== null &&
    spec !== undefined &&
    spec.chars === bban.length + 4 &&
    checkFormatBBAN(bban, spec.bban_regexp)
  ) {
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
  valid: boolean;
}

/**
 * extractIBAN
 * @example
 * // returns {iban: "NL91ABNA0417164300", bban: "ABNA0417164300", countryCode: "NL", valid: true}
 * ibantools.extractIBAN("NL91 ABNA 0417 1643 00");
 * @alias module:ibantools.extractIBAN
 * @param {string} IBAN IBAN
 * @return {ExtractIBANResult} Object {iban: string, bban: string, countryCode: string, valid: boolean}
 */
export function extractIBAN(iban: string): ExtractIBANResult {
  const result = {} as ExtractIBANResult;
  result.iban = iban;
  if (isValidIBAN(iban)) {
    result.bban = iban.slice(4);
    result.countryCode = iban.slice(0, 2);
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
  if (typeof iban !== "string") {
    return null;
  }
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
  if (typeof iban !== "string") {
    return null;
  }
  if (typeof separator === "undefined") {
    separator = " ";
  }
  return electronicFormatIBAN(iban).replace(/(.{4})(?!$)/g, "$1" + separator);
}

/**
 * Calculate checksum of IBAN and compares it with checksum provided in IBANregistry
 * @param {string} IBAN
 * @return {boolean}
 */
function isValidIBANChecksum(iban: string): boolean {
  const providedChecksum: number = parseInt(iban.slice(2, 4), 10);
  let temp: string = iban.slice(3) + iban.slice(0, 2) + "00";
  let validationString: string = "";
  for (let n: number = 1; n < temp.length; n++) {
    const c = temp.charCodeAt(n);
    if (c >= 65) {
      validationString += (c - 55).toString();
    } else {
      validationString += temp[n];
    }
  }
  while (validationString.length > 2) {
    const part: string = validationString.slice(0, 6);
    validationString =
      (parseInt(part, 10) % 97).toString() +
      validationString.slice(part.length);
  }
  const rest: number = parseInt(validationString, 10) % 97;
  return 98 - rest === providedChecksum;
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
 * @return {CountryMap} Object [countryCode: string]CountrySpec -> {chars: :number, bban_regexp: string, IBANRegistry: boolean}
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
  locationCode?: string;
  branchCode?: string;
  testBIC?: boolean;
  valid: boolean;
}

/**
 * extractBIC
 * @example
 * // returns {bankCode: "ABNA", countryCode: "NL", locationCode: "2A", branchCode: null, testBIC: flase, valid: true}
 * ibantools.extractBIC("ABNANL2A");
 * @alias module:ibantools.extractBIC
 * @param {string} BIC BIC
 * @return {ExtractBICResult} Object {bancCode: string, countryCode: string, locationCode: string, branchCode: string, testBIC: boolean, valid: boolean}
 */
export function extractBIC(inputBic: string): ExtractBICResult {
  const result = {} as ExtractBICResult;
  const bic = inputBic.toUpperCase();
  if (isValidBIC(bic)) {
    result.bankCode = bic.slice(0, 4);
    result.countryCode = bic.slice(4, 6);
    result.locationCode = bic.slice(6, 8);
    result.testBIC = result.locationCode[1] === "0" ? true : false;
    result.branchCode = bic.length > 8 ? bic.slice(8) : "619";
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
  bban_regexp: string;
  IBANRegistry: boolean; // Is country part of official IBAN registry
}

/**
 * Interface for Map of Country Specifications
 */
export interface CountryMap {
  [code: string]: CountrySpec;
}

// Country specifications
const countrySpecs: CountryMap = {
  AD: { chars: 24, bban_regexp: "^[0-9]{8}[A-Z0-9]{12}$", IBANRegistry: true },
  AE: { chars: 23, bban_regexp: "^[0-9]{3}[0-9]{16}$", IBANRegistry: true },
  AF: { chars: null, bban_regexp: null, IBANRegistry: false },
  AG: { chars: null, bban_regexp: null, IBANRegistry: false },
  AI: { chars: null, bban_regexp: null, IBANRegistry: false },
  AL: { chars: 28, bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$", IBANRegistry: true },
  AM: { chars: null, bban_regexp: null, IBANRegistry: false },
  AO: { chars: 25, bban_regexp: "^[0-9]{21}$", IBANRegistry: false },
  AQ: { chars: null, bban_regexp: null, IBANRegistry: false },
  AR: { chars: null, bban_regexp: null, IBANRegistry: false },
  AS: { chars: null, bban_regexp: null, IBANRegistry: false },
  AT: { chars: 20, bban_regexp: "^[0-9]{16}$", IBANRegistry: true },
  AU: { chars: null, bban_regexp: null, IBANRegistry: false },
  AW: { chars: null, bban_regexp: null, IBANRegistry: false },
  AX: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true },
  AZ: { chars: 28, bban_regexp: "^[A-Z]{4}[0-9]{20}$", IBANRegistry: true },
  BA: { chars: 20, bban_regexp: "^[0-9]{16}$", IBANRegistry: true },
  BB: { chars: null, bban_regexp: null, IBANRegistry: false },
  BD: { chars: null, bban_regexp: null, IBANRegistry: false },
  BE: { chars: 16, bban_regexp: "^[0-9]{12}$", IBANRegistry: true },
  BF: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  BG: {
    chars: 22,
    bban_regexp: "^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$",
    IBANRegistry: true
  },
  BH: { chars: 22, bban_regexp: "^[A-Z]{4}[A-Z0-9]{14}$", IBANRegistry: true },
  BI: { chars: 16, bban_regexp: "^[0-9]{12}$", IBANRegistry: false },
  BJ: { chars: 28, bban_regexp: "^[A-Z]{1}[0-9]{23}$", IBANRegistry: false },
  BL: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  BM: { chars: null, bban_regexp: null, IBANRegistry: false },
  BN: { chars: null, bban_regexp: null, IBANRegistry: false },
  BO: { chars: null, bban_regexp: null, IBANRegistry: false },
  BQ: { chars: null, bban_regexp: null, IBANRegistry: false },
  BR: {
    chars: 29,
    bban_regexp: "^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$",
    IBANRegistry: true
  },
  BS: { chars: null, bban_regexp: null, IBANRegistry: false },
  BT: { chars: null, bban_regexp: null, IBANRegistry: false },
  BV: { chars: null, bban_regexp: null, IBANRegistry: false },
  BW: { chars: null, bban_regexp: null, IBANRegistry: false },
  BY: {
    chars: 28,
    bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{16}$",
    IBANRegistry: true
  },
  BZ: { chars: null, bban_regexp: null, IBANRegistry: false },
  CA: { chars: null, bban_regexp: null, IBANRegistry: false },
  CC: { chars: null, bban_regexp: null, IBANRegistry: false },
  CD: { chars: null, bban_regexp: null, IBANRegistry: false },
  CF: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  CG: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  CH: { chars: 21, bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$", IBANRegistry: true },
  CI: { chars: 28, bban_regexp: "^[A-Z]{1}[0-9]{23}$", IBANRegistry: false },
  CK: { chars: null, bban_regexp: null, IBANRegistry: false },
  CL: { chars: null, bban_regexp: null, IBANRegistry: false },
  CM: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  CN: { chars: null, bban_regexp: null, IBANRegistry: false },
  CO: { chars: null, bban_regexp: null, IBANRegistry: false },
  CR: { chars: 22, bban_regexp: "^[0-9]{18}$", IBANRegistry: true },
  CU: { chars: null, bban_regexp: null, IBANRegistry: false },
  CV: { chars: null, bban_regexp: null, IBANRegistry: false },
  CW: { chars: null, bban_regexp: null, IBANRegistry: false },
  CX: { chars: null, bban_regexp: null, IBANRegistry: false },
  CY: { chars: 28, bban_regexp: "^[0-9]{8}[A-Z0-9]{16}$", IBANRegistry: true },
  CZ: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true },
  DE: { chars: 22, bban_regexp: "^[0-9]{18}$", IBANRegistry: true },
  DJ: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  DK: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true },
  DM: { chars: null, bban_regexp: null, IBANRegistry: false },
  DO: { chars: 28, bban_regexp: "^[A-Z]{4}[0-9]{20}$", IBANRegistry: true },
  DZ: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: false },
  EC: { chars: null, bban_regexp: null, IBANRegistry: false },
  EE: { chars: 20, bban_regexp: "^[0-9]{16}$", IBANRegistry: true },
  EG: { chars: 29, bban_regexp: "^[0-9]{25}", IBANRegistry: true },
  EH: { chars: null, bban_regexp: null, IBANRegistry: false },
  ER: { chars: null, bban_regexp: null, IBANRegistry: false },
  ES: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true },
  ET: { chars: null, bban_regexp: null, IBANRegistry: false },
  FI: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true },
  FJ: { chars: null, bban_regexp: null, IBANRegistry: false },
  FK: { chars: null, bban_regexp: null, IBANRegistry: false },
  FM: { chars: null, bban_regexp: null, IBANRegistry: false },
  FO: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true },
  FR: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  GA: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  GB: { chars: 22, bban_regexp: "^[A-Z]{4}[0-9]{14}$", IBANRegistry: true },
  GD: { chars: null, bban_regexp: null, IBANRegistry: false },
  GE: { chars: 22, bban_regexp: "^[A-Z0-9]{2}[0-9]{16}$", IBANRegistry: true },
  GF: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  GG: { chars: null, bban_regexp: null, IBANRegistry: false },
  GH: { chars: null, bban_regexp: null, IBANRegistry: false },
  GI: { chars: 23, bban_regexp: "^[A-Z]{4}[A-Z0-9]{15}$", IBANRegistry: true },
  GL: { chars: 18, bban_regexp: "^[0-9]{14}$", IBANRegistry: true },
  GM: { chars: null, bban_regexp: null, IBANRegistry: false },
  GN: { chars: null, bban_regexp: null, IBANRegistry: false },
  GP: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  GQ: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  GR: { chars: 27, bban_regexp: "^[0-9]{7}[A-Z0-9]{16}$", IBANRegistry: true },
  GS: { chars: null, bban_regexp: null, IBANRegistry: false },
  GT: { chars: 28, bban_regexp: "^[A-Z0-9]{24}$", IBANRegistry: true },
  GU: { chars: null, bban_regexp: null, IBANRegistry: false },
  GW: { chars: 25, bban_regexp: "^[A-Z]{2}[0-9]{19}$", IBANRegistry: false },
  GY: { chars: null, bban_regexp: null, IBANRegistry: false },
  HK: { chars: null, bban_regexp: null, IBANRegistry: false },
  HM: { chars: null, bban_regexp: null, IBANRegistry: false },
  HN: { chars: 28, bban_regexp: "^[A-Z]{4}[0-9]{20}$", IBANRegistry: false },
  HR: { chars: 21, bban_regexp: "^[0-9]{17}$", IBANRegistry: true },
  HT: { chars: null, bban_regexp: null, IBANRegistry: false },
  HU: { chars: 28, bban_regexp: "^[0-9]{24}$", IBANRegistry: true },
  ID: { chars: null, bban_regexp: null, IBANRegistry: false },
  IE: { chars: 22, bban_regexp: "^[A-Z0-9]{4}[0-9]{14}$", IBANRegistry: true },
  IL: { chars: 23, bban_regexp: "^[0-9]{19}$", IBANRegistry: true },
  IM: { chars: null, bban_regexp: null, IBANRegistry: false },
  IN: { chars: null, bban_regexp: null, IBANRegistry: false },
  IO: { chars: null, bban_regexp: null, IBANRegistry: false },
  IQ: { chars: 23, bban_regexp: "^[A-Z]{4}[0-9]{15}$", IBANRegistry: true },
  IR: { chars: 26, bban_regexp: "^[0-9]{22}$", IBANRegistry: false },
  IS: { chars: 26, bban_regexp: "^[0-9]{22}$", IBANRegistry: true },
  IT: {
    chars: 27,
    bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",
    IBANRegistry: true
  },
  JE: { chars: null, bban_regexp: null, IBANRegistry: false },
  JM: { chars: null, bban_regexp: null, IBANRegistry: false },
  JO: {
    chars: 30,
    bban_regexp: "^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$",
    IBANRegistry: true
  },
  JP: { chars: null, bban_regexp: null, IBANRegistry: false },
  KE: { chars: null, bban_regexp: null, IBANRegistry: false },
  KG: { chars: null, bban_regexp: null, IBANRegistry: false },
  KH: { chars: null, bban_regexp: null, IBANRegistry: false },
  KI: { chars: null, bban_regexp: null, IBANRegistry: false },
  KM: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  KN: { chars: null, bban_regexp: null, IBANRegistry: false },
  KP: { chars: null, bban_regexp: null, IBANRegistry: false },
  KR: { chars: null, bban_regexp: null, IBANRegistry: false },
  KW: { chars: 30, bban_regexp: "^[A-Z]{4}[A-Z0-9]{22}$", IBANRegistry: true },
  KY: { chars: null, bban_regexp: null, IBANRegistry: false },
  KZ: { chars: 20, bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$", IBANRegistry: true },
  LA: { chars: null, bban_regexp: null, IBANRegistry: false },
  LB: { chars: 28, bban_regexp: "^[0-9]{4}[A-Z0-9]{20}$", IBANRegistry: true },
  LC: { chars: 32, bban_regexp: "^[A-Z]{4}[A-Z0-9]{24}$", IBANRegistry: true },
  LI: { chars: 21, bban_regexp: "^[0-9]{5}[A-Z0-9]{12}$", IBANRegistry: true },
  LK: { chars: null, bban_regexp: null, IBANRegistry: false },
  LR: { chars: null, bban_regexp: null, IBANRegistry: false },
  LS: { chars: null, bban_regexp: null, IBANRegistry: false },
  LT: { chars: 20, bban_regexp: "^[0-9]{16}$", IBANRegistry: true },
  LU: { chars: 20, bban_regexp: "^[0-9]{3}[A-Z0-9]{13}$", IBANRegistry: true },
  LV: { chars: 21, bban_regexp: "^[A-Z]{4}[A-Z0-9]{13}$", IBANRegistry: true },
  LY: { chars: null, bban_regexp: null, IBANRegistry: false },
  MA: { chars: 28, bban_regexp: "^[0-9]{24}$", IBANRegistry: false },
  MC: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  MD: {
    chars: 24,
    bban_regexp: "^[A-Z0-9]{2}[A-Z0-9]{18}$",
    IBANRegistry: true
  },
  ME: { chars: 22, bban_regexp: "^[0-9]{18}$", IBANRegistry: true },
  MF: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  MG: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  MH: { chars: null, bban_regexp: null, IBANRegistry: false },
  MK: {
    chars: 19,
    bban_regexp: "^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$",
    IBANRegistry: true
  },
  ML: { chars: 28, bban_regexp: "^[A-Z]{1}[0-9]{23}$", IBANRegistry: false },
  MM: { chars: null, bban_regexp: null, IBANRegistry: false },
  MN: { chars: null, bban_regexp: null, IBANRegistry: false },
  MO: { chars: null, bban_regexp: null, IBANRegistry: false },
  MP: { chars: null, bban_regexp: null, IBANRegistry: false },
  MQ: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  MR: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: true },
  MS: { chars: null, bban_regexp: null, IBANRegistry: false },
  MT: {
    chars: 31,
    bban_regexp: "^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$",
    IBANRegistry: true
  },
  MU: {
    chars: 30,
    bban_regexp: "^[A-Z]{4}[0-9]{19}[A-Z]{3}$",
    IBANRegistry: true
  },
  MV: { chars: null, bban_regexp: null, IBANRegistry: false },
  MW: { chars: null, bban_regexp: null, IBANRegistry: false },
  MX: { chars: null, bban_regexp: null, IBANRegistry: false },
  MY: { chars: null, bban_regexp: null, IBANRegistry: false },
  MZ: { chars: 25, bban_regexp: "^[0-9]{21}$", IBANRegistry: false },
  NA: { chars: null, bban_regexp: null, IBANRegistry: false },
  NC: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  NE: { chars: 28, bban_regexp: "^[A-Z]{2}[0-9]{22}$", IBANRegistry: false },
  NF: { chars: null, bban_regexp: null, IBANRegistry: false },
  NG: { chars: null, bban_regexp: null, IBANRegistry: false },
  NI: { chars: 32, bban_regexp: "^[A-Z]{4}[0-9]{24}$", IBANRegistry: false },
  NL: { chars: 18, bban_regexp: "^[A-Z]{4}[0-9]{10}$", IBANRegistry: true },
  NO: { chars: 15, bban_regexp: "^[0-9]{11}$", IBANRegistry: true },
  NP: { chars: null, bban_regexp: null, IBANRegistry: false },
  NR: { chars: null, bban_regexp: null, IBANRegistry: false },
  NU: { chars: null, bban_regexp: null, IBANRegistry: false },
  NZ: { chars: null, bban_regexp: null, IBANRegistry: false },
  OM: { chars: null, bban_regexp: null, IBANRegistry: false },
  PA: { chars: null, bban_regexp: null, IBANRegistry: false },
  PE: { chars: null, bban_regexp: null, IBANRegistry: false },
  PF: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  PG: { chars: null, bban_regexp: null, IBANRegistry: false },
  PH: { chars: null, bban_regexp: null, IBANRegistry: false },
  PK: { chars: 24, bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$", IBANRegistry: true },
  PL: { chars: 28, bban_regexp: "^[0-9]{24}$", IBANRegistry: true },
  PM: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  PN: { chars: null, bban_regexp: null, IBANRegistry: false },
  PR: { chars: null, bban_regexp: null, IBANRegistry: false },
  PS: { chars: 29, bban_regexp: "^[A-Z0-9]{4}[0-9]{21}$", IBANRegistry: true },
  PT: { chars: 25, bban_regexp: "^[0-9]{21}$", IBANRegistry: true },
  PW: { chars: null, bban_regexp: null, IBANRegistry: false },
  PY: { chars: null, bban_regexp: null, IBANRegistry: false },
  QA: { chars: 29, bban_regexp: "^[A-Z]{4}[A-Z0-9]{21}$", IBANRegistry: true },
  RE: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  RO: { chars: 24, bban_regexp: "^[A-Z]{4}[A-Z0-9]{16}$", IBANRegistry: true },
  RS: { chars: 22, bban_regexp: "^[0-9]{18}$", IBANRegistry: true },
  RU: { chars: null, bban_regexp: null, IBANRegistry: false },
  RW: { chars: null, bban_regexp: null, IBANRegistry: false },
  SA: { chars: 24, bban_regexp: "^[0-9]{2}[A-Z0-9]{18}$", IBANRegistry: true },
  SB: { chars: null, bban_regexp: null, IBANRegistry: false },
  SC: {
    chars: 31,
    bban_regexp: "^[[A-Z]{4}[]0-9]{20}[A-Z]{3}$",
    IBANRegistry: true
  },
  SD: { chars: null, bban_regexp: null, IBANRegistry: false },
  SE: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true },
  SG: { chars: null, bban_regexp: null, IBANRegistry: false },
  SH: { chars: null, bban_regexp: null, IBANRegistry: false },
  SI: { chars: 19, bban_regexp: "^[0-9]{15}$", IBANRegistry: true },
  SJ: { chars: null, bban_regexp: null, IBANRegistry: false },
  SK: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true },
  SL: { chars: null, bban_regexp: null, IBANRegistry: false },
  SM: {
    chars: 27,
    bban_regexp: "^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",
    IBANRegistry: true
  },
  SN: { chars: 28, bban_regexp: "^[A-Z]{1}[0-9]{23}$", IBANRegistry: false },
  SO: { chars: null, bban_regexp: null, IBANRegistry: false },
  SR: { chars: null, bban_regexp: null, IBANRegistry: false },
  SS: { chars: null, bban_regexp: null, IBANRegistry: false },
  ST: { chars: 25, bban_regexp: "^[0-9]{21}$", IBANRegistry: true },
  SV: { chars: 28, bban_regexp: "^[A-Z]{4}[0-9]{20}$", IBANRegistry: true },
  SX: { chars: null, bban_regexp: null, IBANRegistry: false },
  SY: { chars: null, bban_regexp: null, IBANRegistry: false },
  SZ: { chars: null, bban_regexp: null, IBANRegistry: false },
  TC: { chars: null, bban_regexp: null, IBANRegistry: false },
  TD: { chars: 27, bban_regexp: "^[0-9]{23}$", IBANRegistry: false },
  TF: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  TG: { chars: 28, bban_regexp: "^[A-Z]{2}[0-9]{22}$", IBANRegistry: false },
  TH: { chars: null, bban_regexp: null, IBANRegistry: false },
  TJ: { chars: null, bban_regexp: null, IBANRegistry: false },
  TK: { chars: null, bban_regexp: null, IBANRegistry: false },
  TL: { chars: 23, bban_regexp: "^[0-9]{19}$", IBANRegistry: true },
  TM: { chars: null, bban_regexp: null, IBANRegistry: false },
  TN: { chars: 24, bban_regexp: "^[0-9]{20}$", IBANRegistry: true },
  TO: { chars: null, bban_regexp: null, IBANRegistry: false },
  TR: { chars: 26, bban_regexp: "^[0-9]{5}[A-Z0-9]{17}$", IBANRegistry: true },
  TT: { chars: null, bban_regexp: null, IBANRegistry: false },
  TV: { chars: null, bban_regexp: null, IBANRegistry: false },
  TW: { chars: null, bban_regexp: null, IBANRegistry: false },
  TZ: { chars: null, bban_regexp: null, IBANRegistry: false },
  UA: { chars: 29, bban_regexp: "^[0-9]{6}[A-Z0-9]{19}$", IBANRegistry: true },
  UG: { chars: null, bban_regexp: null, IBANRegistry: false },
  UM: { chars: null, bban_regexp: null, IBANRegistry: false },
  US: { chars: null, bban_regexp: null, IBANRegistry: false },
  UY: { chars: null, bban_regexp: null, IBANRegistry: false },
  UZ: { chars: null, bban_regexp: null, IBANRegistry: false },
  VA: { chars: 22, bban_regexp: "^[0-9]{18}", IBANRegistry: true },
  VC: { chars: null, bban_regexp: null, IBANRegistry: false },
  VE: { chars: null, bban_regexp: null, IBANRegistry: false },
  VG: { chars: 24, bban_regexp: "^[A-Z0-9]{4}[0-9]{16}$", IBANRegistry: true },
  VI: { chars: null, bban_regexp: null, IBANRegistry: false },
  VN: { chars: null, bban_regexp: null, IBANRegistry: false },
  VU: { chars: null, bban_regexp: null, IBANRegistry: false },
  WF: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  WS: { chars: null, bban_regexp: null, IBANRegistry: false },
  XK: { chars: 20, bban_regexp: "^[0-9]{16}$", IBANRegistry: true },
  YE: { chars: null, bban_regexp: null, IBANRegistry: false },
  YT: {
    chars: 27,
    bban_regexp: "^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",
    IBANRegistry: true
  },
  ZA: { chars: null, bban_regexp: null, IBANRegistry: false },
  ZM: { chars: null, bban_regexp: null, IBANRegistry: false },
  ZW: { chars: null, bban_regexp: null, IBANRegistry: false }
};
