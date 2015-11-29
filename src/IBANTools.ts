"use strict";

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
 * Interface for IBANTools constructor params
 */
export interface IBANToolsParams {
  iban?:        string;
  bban?:        string;
  countryCode?: string;
}

/** Class representing IBANTools */
export default class IBANTools {
  iban:        string = null;
  bban:        string = null;
  countryCode: string = null;
  countryName: string = null;
  validIBAN:   boolean = false;
  validBBAN:   boolean = false;
  countrySpecs: CountryMap = {};

  /**
   * Create a IBANTools
   * @param {IBANToolsParams}
   */
  constructor(params: IBANToolsParams) {
		this.fillSpecs();
    if (params.iban !== undefined) {
			var tmpIban: string = params.iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
			var spec = this.countrySpecs[tmpIban.slice(0,2)];
			if (spec !== undefined && spec.chars === tmpIban.length) {
				this.iban = tmpIban;
				this.bban = this.iban.slice(4);
				this.countryCode = this.iban.slice(0,2);
				this.validIBAN = true;
			}
    } else if (params.bban !== undefined &&
               params.countryCode !== undefined) {
      this.bban = params.bban;
      this.countryCode = params.countryCode;
    }
  }

  /**
   * Get IBAN validity
   * @return {boolean}
   */
  isValid() {
    return this.validIBAN;
  }

  /**
   * Get IBAN in electronic format (no spaces)
   * @return {string} IBAN or null if IBAN is not valid
   */
  getIBAN() {
    return this.iban;
  }

  /**
   * Get BBAN in electronic format (no spaces)
   * @return {string} BBAN or null if IBAN is not valid
   */
  getBBAN() {
    return this.bban;
  }

  /**
   * Get country code in ISO 3166-1 alpha-2
   * @return {string} Country Code or null if IBAN is not valid
   */
  getCountryCode() {
    return this.countryCode;
  }

  /**
   * Fill map of IBAN country specifications
   */
  fillSpecs() {
    this.countrySpecs['NL'] = {chars: 18, bban_format: '4a,10n', bban_fields: 'bbbbcccccccccc', name: 'Netherlands'};
  }

}
