"use strict";

let  countrySpecs: CountryMap = {};

/**
 * Validate IBAN
 * @param {string} IBAN
 * @return {boolean} valid
 */
export function isValidIBAN(iban: string): boolean {
  if (iban !== undefined && iban !== null) {
    fillSpecs();
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
export interface ComposeIBANParms {
  countryCode?: string;
  bban?: string;
}
export function composeIBAN(params: ComposeIBANParms): string {
  fillSpecs();
  let bban: string = electonicFormatIBAN(params.bban);
  let spec = countrySpecs[params.countryCode];
  if (spec !== undefined &&
      spec.chars === (bban.length + 4) &&
      checkFormatBBAN(bban, spec.bban_regexp)) {
    let checksom = mod9710(params.countryCode + '00' + bban);
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
    let part = validationString.slice(0,9); // 10 chars
    validationString = (parseInt(part, 10) % 97).toString() + validationString.slice(part.length);
  }
  return parseInt(validationString, 10) % 97;
}

/**
 * Check BBAN format
 * @param {string} BBAN
 * @param {string} BBAN regexp
 * @return {boolean} valid
 */
function checkFormatBBAN(bban: string, bformat: string): boolean {
  let reg = new RegExp(bformat, '');
  return reg.test(bban);
}

/**
 * Get IBAN in electronic format (no spaces)
 * IBAN validation is not performed.
 * @parms {string} IBAN
 * @return {string} IBAN or null if IBAN is not valid
 */
export function electonicFormatIBAN(iban: string) {
  return iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

/**
 * Get IBAN in friendly format (space after every 4 characters)
 * IBAN validation is not performed.
 * @parms {string} IBAN
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
  bban_regexp: string;
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
  countrySpecs['AL'] = {chars: 28, bban_regexp: '^[0-9]{8}[A-Z0-9]{16}$', bban_fields: 'bbbssssxcccccccccccccccc', name: 'Albania'};
  countrySpecs['AD'] = {chars: 24, bban_regexp: '^[0-9]{8}[A-Z0-9]{12}$', bban_fields: 'bbbbsssscccccccccccc', name: 'Andorra'};
  countrySpecs['AT'] = {chars: 20, bban_regexp: '^[0-9]{16}$', bban_fields: 'bbbbbccccccccccc', name: 'Austria'};
  countrySpecs['AZ'] = {chars: 28, bban_regexp: '^[A-Z0-9]{4}[0-9]{20}$', bban_fields: 'bbbbcccccccccccccccccccc', name: 'Azerbaijan'};
  countrySpecs['BH'] = {chars: 22, bban_regexp: '^[A-Z]{4}[A-Z0-9]{14}$', bban_fields: 'bbbbcccccccccccccc', name: 'Bahrain'};
  countrySpecs['BE'] = {chars: 16, bban_regexp: '^[0-9]{12}$', bban_fields: 'bbbcccccccxx', name: 'Belgium'};
  countrySpecs['BA'] = {chars: 20, bban_regexp: '^[0-9]{16}$', bban_fields: 'bbbsssccccccccxx', name: 'Bosnia and Herzegovina'};
  countrySpecs['BR'] = {chars: 29, bban_regexp: '^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$', bban_fields: 'bbbbbbbbssssscccccccccctn', name: 'Brazil'};
  countrySpecs['BG'] = {chars: 22, bban_regexp: '^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$', bban_fields: 'bbbbssssddcccccccc', name: 'Bulgaria'};
  countrySpecs['CR'] = {chars: 21, bban_regexp: '^[0-9]{17}$', bban_fields: 'bbbcccccccccccccc', name: 'Costa Rica'};
  countrySpecs['HR'] = {chars: 21, bban_regexp: '^[0-9]{17}$', bban_fields: 'bbbbbbbcccccccccc', name: 'Croatia'};
  countrySpecs['CY'] = {chars: 28, bban_regexp: '^[0-9]{8}[A-Z0-9]{16}$', bban_fields: 'bbbssssscccccccccccccccc', name: 'Cyprus'};
  countrySpecs['CZ'] = {chars: 24, bban_regexp: '^[0-9]{20}$', bban_fields: 'bbbbsssssscccccccccc', name: 'Czech Republic'};
  countrySpecs['DK'] = {chars: 18, bban_regexp: '^[0-9]{14}$', bban_fields: 'bbbbcccccccccc', name: 'Denmark'};
  countrySpecs['DO'] = {chars: 28, bban_regexp: '^[A-Z]{4}[0-9]{20}$', bban_fields: 'bbbbcccccccccccccccccccc', name: 'Dominican Republic'};
  countrySpecs['TL'] = {chars: 23, bban_regexp: '^[0-9]{19}$', bban_fields: 'bbbccccccccccccccxx', name: 'East Timor'};
  countrySpecs['EE'] = {chars: 20, bban_regexp: '^[0-9]{16}$', bban_fields: 'bbsscccccccccccx', name: 'Estonia'};
  countrySpecs['FO'] = {chars: 18, bban_regexp: '^[0-9]{14}$', bban_fields: 'bbbbcccccccccx', name: 'Faroe Islands'};
  countrySpecs['FI'] = {chars: 18, bban_regexp: '^[0-9]{14}$', bban_fields: 'bbbbbbcccccccx', name: 'Finland'};
  countrySpecs['FR'] = {chars: 27, bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$', bban_fields: 'bbbbbgggggcccccccccccxx', name: 'France'};
  countrySpecs['GE'] = {chars: 22, bban_regexp: '^[A-Z0-9]{2}[0-9]{16}$', bban_fields: 'bbcccccccccccccccc', name: 'Georgia (country)'};
  countrySpecs['DE'] = {chars: 22, bban_regexp: '^[0-9]{18}$', bban_fields: 'bbbbbbbbcccccccccc', name: 'Germany'};
  countrySpecs['GI'] = {chars: 23, bban_regexp: '^[A-Z]{4}[A-Z0-9]{15}$', bban_fields: 'bbbbccccccccccccccc', name: 'Gibraltar'};
  countrySpecs['GR'] = {chars: 27, bban_regexp: '^[0-9]{7}[A-Z0-9]{16}$', bban_fields: 'bbbsssscccccccccccccccc', name: 'Greece'};
  countrySpecs['GL'] = {chars: 18, bban_regexp: '^[0-9]{14}$', bban_fields: 'bbbbcccccccccc', name: 'Greenland'};
  countrySpecs['GT'] = {chars: 28, bban_regexp: '^[A-Z0-9]{4}[A-Z0-9]{20}$', bban_fields: 'bbbbmmttcccccccccccccccc', name: 'Guatemala'};
  countrySpecs['HU'] = {chars: 28, bban_regexp: '^[0-9]{24}$', bban_fields: 'bbbsssskcccccccccccccccx', name: 'Hungary'};
  countrySpecs['IS'] = {chars: 26, bban_regexp: '^[0-9]{22}$', bban_fields: 'bbbbsscccccciiiiiiiiii', name: 'Iceland'};
  countrySpecs['IE'] = {chars: 22, bban_regexp: '^[A-Z0-9]{4}[0-9]{14}$', bban_fields: 'aaaabbbbbbcccccccc', name: 'Republic of Ireland'};
  countrySpecs['IL'] = {chars: 23, bban_regexp: '^[0-9]{19}$', bban_fields: 'bbbnnnccccccccccccc', name: 'Israel'};
  countrySpecs['IT'] = {chars: 27, bban_regexp: '^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$', bban_fields: 'xaaaaabbbbbcccccccccccc', name: 'Italy'};
  countrySpecs['JO'] = {chars: 30, bban_regexp: '^[A-Z]{4}[0-9]{22}$', bban_fields: 'bbbbnnnncccccccccccccccccc', name: 'Jordan'};
  countrySpecs['KZ'] = {chars: 20, bban_regexp: '^[0-9]{3}[A-Z0-9]{13}$', bban_fields: 'bbbccccccccccccc', name: 'Kazakhstan'};
  countrySpecs['XK'] = {chars: 20, bban_regexp: '^[0-9]{4}[0-9]{10}[0-9]{2}$', bban_fields: 'bbbbcccccccccccc', name: 'Kosovo'};
  countrySpecs['KW'] = {chars: 30, bban_regexp: '^[A-Z]{4}[A-Z0-9]{22}$', bban_fields: 'bbbbcccccccccccccccccccccc', name: 'Kuwait'};
  countrySpecs['LV'] = {chars: 21, bban_regexp: '^[A-Z]{4}[A-Z0-9]{13}$', bban_fields: 'bbbbccccccccccccc', name: 'Latvia'};
  countrySpecs['LB'] = {chars: 28, bban_regexp: '^[0-9]{4}[A-Z0-9]{20}$', bban_fields: 'bbbbcccccccccccccccccccc', name: 'Lebanon'};
  countrySpecs['LI'] = {chars: 21, bban_regexp: '^[0-9]{5}[A-Z0-9]{12}$', bban_fields: 'bbbbbcccccccccccc', name: 'Liechtenstein'};
  countrySpecs['LT'] = {chars: 20, bban_regexp: '^[0-9]{16}$', bban_fields: 'bbbbbccccccccccc', name: 'Lithuania'};
  countrySpecs['LU'] = {chars: 20, bban_regexp: '^[0-9]{3}[A-Z0-9]{13}$', bban_fields: 'bbbccccccccccccc', name: 'Luxembourg'};
  countrySpecs['MK'] = {chars: 19, bban_regexp: '^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$', bban_fields: 'bbbccccccccccxx', name: 'Republic of Macedonia'};
  countrySpecs['MT'] = {chars: 31, bban_regexp: '^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$', bban_fields: 'bbbbssssscccccccccccccccccc', name: 'Malta'};
  countrySpecs['MR'] = {chars: 27, bban_regexp: '^[0-9]{23}$', bban_fields: 'bbbbbssssscccccccccccxx', name: 'Mauritania'};
  countrySpecs['MU'] = {chars: 30, bban_regexp: '^[A-Z]{4}[0-9]{19}[A-Z]{3}$', bban_fields: 'bbbbbbssccccccccccccddd', name: 'Mauritius'};
  countrySpecs['MC'] = {chars: 27, bban_regexp: '^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$', bban_fields: 'bbbbbssssscccccccccccxx', name: 'Monaco'};
  countrySpecs['MD'] = {chars: 24, bban_regexp: '^[A-Z0-9]{2}[A-Z0-9]{18}$', bban_fields: 'bbcccccccccccccccccc', name: 'Moldova'};
  countrySpecs['ME'] = {chars: 22, bban_regexp: '^[0-9]{18}$', bban_fields: 'bbbcccccccccccccxx', name: 'Montenegro'};
  countrySpecs['NL'] = {chars: 18, bban_regexp: '^[A-Z]{4}[0-9]{10}$', bban_fields: 'bbbbcccccccccc', name: 'Netherlands'};
  countrySpecs['NO'] = {chars: 15, bban_regexp: '^[0-9]{11}$', bban_fields: 'bbbbccccccx', name: 'Norway'};
  countrySpecs['PK'] = {chars: 24, bban_regexp: '^[A-Z0-9]{4}[0-9]{16}$', bban_fields: 'bbbbcccccccccccccccc', name: 'Pakistan'};
  countrySpecs['PS'] = {chars: 29, bban_regexp: '^[A-Z0-9]{4}[0-9]{21}$', bban_fields: 'bbbbxxxxxxxxxcccccccccccc', name: 'Palestinian territories'};
  countrySpecs['PL'] = {chars: 28, bban_regexp: '^[0-9]{24}$', bban_fields: 'bbbssssxcccccccccccccccc', name: 'Poland'};
  countrySpecs['PT'] = {chars: 25, bban_regexp: '^[0-9]{21}$', bban_fields: 'bbbbsssscccccccccccxx', name: 'Portugal'};
  countrySpecs['QA'] = {chars: 29, bban_regexp: '^[A-Z]{4}[A-Z0-9]{21}$', bban_fields: 'bbbbccccccccccccccccccccc', name: 'Qatar'};
  countrySpecs['RO'] = {chars: 24, bban_regexp: '^[A-Z]{4}[A-Z0-9]{16}$', bban_fields: 'bbbbcccccccccccccccc', name: 'Romania'};
  countrySpecs['SM'] = {chars: 27, bban_regexp: '^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$', bban_fields: 'xaaaaabbbbbcccccccccccc', name: 'San Marino'};
  countrySpecs['SA'] = {chars: 24, bban_regexp: '^[0-9]{2}[A-Z0-9]{18}$', bban_fields: 'bbcccccccccccccccccc', name: 'Saudi Arabia'};
  countrySpecs['RS'] = {chars: 22, bban_regexp: '^[0-9]{18}$', bban_fields: 'bbbcccccccccccccxx', name: 'Serbia'};
  countrySpecs['SK'] = {chars: 24, bban_regexp: '^[0-9]{20}$', bban_fields: 'bbbbsssssscccccccccc', name: 'Slovakia'};
  countrySpecs['SI'] = {chars: 19, bban_regexp: '^[0-9]{15}$', bban_fields: 'bbsssccccccccxx', name: 'Slovenia'};
  countrySpecs['ES'] = {chars: 24, bban_regexp: '^[0-9]{20}$', bban_fields: 'bbbbggggxxcccccccccc', name: 'Spain'};
  countrySpecs['SE'] = {chars: 24, bban_regexp: '^[0-9]{20}$', bban_fields: 'bbbccccccccccccccccc', name: 'Sweden'};
  countrySpecs['CH'] = {chars: 21, bban_regexp: '^[0-9]{5}[A-Z0-9]{12}$', bban_fields: 'bbbbbcccccccccccc', name: 'Switzerland'};
  countrySpecs['TN'] = {chars: 24, bban_regexp: '^[0-9]{20}$', bban_fields: 'bbsssccccccccccccccc', name: 'Tunisia'};
  countrySpecs['TR'] = {chars: 26, bban_regexp: '^[0-9]{5}[A-Z0-9]{17}$', bban_fields: 'bbbbbxcccccccccccccccc', name: 'Turkey'};
  countrySpecs['AE'] = {chars: 23, bban_regexp: '^[0-9]{3}[0-9]{16}$', bban_fields: 'bbbcccccccccccccccc', name: 'United Arab Emirates'};
  countrySpecs['GB'] = {chars: 22, bban_regexp: '^[A-Z]{4}[0-9]{14}$', bban_fields: 'bbbbsssssscccccccc', name: 'United Kingdom'};
  countrySpecs['VG'] = {chars: 24, bban_regexp: '^[A-Z0-9]{4}[0-9]{16}$', bban_fields: 'bbbbcccccccccccccccc', name: 'British Virgin Islands'};
}
