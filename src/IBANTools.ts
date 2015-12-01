"use strict";

var  countrySpecs: CountryMap = {};

/**
 * Validate IBAN
 * @param {string} IBAN
 * @return {boolean} valid
 */
export function isValidIBAN(iban: string): boolean {
  if (iban !== undefined && iban !== null) {
    fillSpecs();
    var tmpIban: string = iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    var spec = countrySpecs[tmpIban.slice(0,2)];
    if (spec !== undefined &&
        spec.chars === tmpIban.length &&
        checkFormatBBAN(tmpIban.slice(4), spec.bban_format) &&
        mod9710(tmpIban) === 1) {
      return true;
    }
  }
  return false;
}
export interface ComposeIBANParms {
  countryCode?: string;
  bban?: string;
}
export function composeIBAN(params: ComposeIBANParms): string {
  fillSpecs();
  var bban: string = params.bban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  var spec = countrySpecs[params.countryCode];
  if (spec !== undefined &&
      spec.chars === (bban.length + 4) &&
      checkFormatBBAN(bban, spec.bban_format)) {
		var checksom = mod9710(params.countryCode + '00' + bban);
		return params.countryCode + ('0' + (98 - checksom)).slice(-2) + bban;
  }
	return null;
}

/**
 * MOD-97-10
 * @param {string}
 * @return {number}
 */
function mod9710(iban: string): number {
  iban = iban.slice(3) + iban.slice(0,4);
  var validationString: string = '';
  for (var n:number =1; n < iban.length; n++) {
    var c = iban.charCodeAt(n);
    if (c >= 65) {
      validationString += (c - 55).toString();
    } else {
      validationString += iban[n];
    }
  }
  while(validationString.length > 2) {
    var part = validationString.slice(0,9); // 10 chars
    validationString = (parseInt(part, 10) % 97).toString() + validationString.slice(part.length);
  }
  return parseInt(validationString, 10) % 97;
}

/**
 * Check BBAN format
 * @param {string} BBAN
 * @param {string} BBAN format
 */
function checkFormatBBAN(bban: string, bformat: string): boolean {
	if (bban.length !== bformat.length) {
		return false;
	}
  for(var n = 0; n < bban.length; n++) {
    if (bformat[n] === 'a') {
      if (/[A-Z]/.test(bban[n])) { continue; }
    } else if (bformat[n] === 'n' ) {
      if (/[0-9]/.test(bban[n])) { continue; }
    } else {
      if (/[A-Z0-9]/.test(bban[n])) { continue; }
    }
    return false;
  }
  return true;
}

/**
 * Get IBAN in electronic format (no spaces)
 * @parms {string} IBAN
 * @return {string} IBAN or null if IBAN is not valid
 */
export function electonicFormatIBAN(iban: string) {
  return iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

/**
 * Get IBAN in friendly format (space after every 4 characters)
 * @return {string} IBAN or null if IBAN is not valid
 */
export function friendlyFormatIBAN(iban: string) {
	return electonicFormatIBAN(iban).replace(/(.{4})(?!$)/g, "$1" + ' ');
}

/**
 * Interface for IBAN Country Specification
 */
interface CountrySpec {
  chars: number;
  name: string;
  bban_format: string;
  bban_fields: string;
}

/**
 * Interface for Map of country specifications
 */
interface CountryMap {
  [code: string]: CountrySpec;
}

/**
 * Fill map of IBAN country specifications
 */
function fillSpecs() {
  // INSERT_START
  countrySpecs['BA'] = {chars: 20, bban_format: 'nnnnnnnnnnnnnnnn', bban_fields: 'bbbsssccccccccxx', name: 'Bosnia and Herzegovina'};
  countrySpecs['BR'] = {chars: 29, bban_format: 'nnnnnnnnnnnnnnnnnnnnnnnac', bban_fields: 'bbbbbbbbssssscccccccccctn', name: 'Brazil'};
  countrySpecs['NL'] = {chars: 18, bban_format: 'aaaannnnnnnnnn', bban_fields: 'bbbbcccccccccc', name: 'Netherlands'};
  countrySpecs['MK'] = {chars: 19, bban_format: 'nnnccccccccccnn', bban_fields: 'bbbccccccccccxx', name: 'Republic of Macedonia'};
  // INSERT_END
}
