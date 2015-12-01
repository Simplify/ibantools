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
  countrySpecs: CountryMap = {};

  /**
   * Create a IBANTools
   * @param {IBANToolsParams}
   */
  constructor(params: IBANToolsParams) {
		this.fillSpecs();
    if (params.iban !== undefined && params.iban !== null) {
			var tmpIban: string = params.iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
			if(this.isValidIBAN(tmpIban)) {
				var spec = this.countrySpecs[tmpIban.slice(0,2)];
				this.iban = tmpIban;
				this.bban = this.iban.slice(4);
				this.countryCode = this.iban.slice(0,2);
				this.countryName = spec.name;
				this.validIBAN = true;
			}
    } else if (params.bban !== undefined &&
               params.countryCode !== undefined) {
      this.bban = params.bban;
      this.countryCode = params.countryCode;
    }
  }

	/**
	 * Extract IBAN
	 * @param {string} IBAN
	 */
	extractIBAN(iban: string):IBANTools {
		this.fillSpecs();
    if (iban !== undefined && iban !== null) {
			var tmpIban: string = iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
			if(this.isValidIBAN(tmpIban)) {
				var spec = this.countrySpecs[tmpIban.slice(0,2)];
				this.iban = tmpIban;
				this.bban = this.iban.slice(4);
				this.countryCode = this.iban.slice(0,2);
				this.countryName = spec.name;
				this.validIBAN = true;
			}
			return this;
    }
	}

	/**
	 * Validate IBAN
	 * @param {string} IBAN
	 * @return {boolean} valid
	 */
	isValidIBAN(iban: string): boolean {
    if (iban !== undefined && iban !== null) {
			this.fillSpecs();
			var tmpIban: string = iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
			var spec = this.countrySpecs[tmpIban.slice(0,2)];
			if (spec !== undefined &&
					spec.chars === tmpIban.length &&
					this.checkFormatBBAN(tmpIban.slice(4), spec.bban_fields) &&
					this.mod9710(tmpIban) === 1) {
				return true;
			}
		}
		return false;
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
   * Get IBAN in friendly format (space after every 4 characters)
   * @return {string} IBAN or null if IBAN is not valid
   */
  getFriendlyIBAN() {
    return this.iban.replace(/(.{4})(?!$)/g, "$1" + ' ');
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
   * Get Country
   * @return {string} Country or null if IBAN is not valid
   */
  getCountryName() {
    return this.countryName;
  }

	/**
	 * MOD-97-10
	 * @param {string}
	 * @return {number}
	 */
	mod9710(iban: string): number {
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
	checkFormatBBAN(bban: string, format: string): boolean {
		for(var n:number = 0; n < format.length; n++) {
			if (format[n] === 'a') {
				if (/[A-Z]/.test(bban[n])) { continue; }
			} else if (format[n] === 'n' ) {
				if (/[0-9]/.test(bban[n])) { continue; }
			} else {
				if (/[A-Z0-9]/.test(bban[n])) { continue; }
			}
			return false;
		}
		return true;
	}

  /**
   * Fill map of IBAN country specifications
   */
  fillSpecs() {
		// INSERT_START
		this.countrySpecs['BA'] = {chars: 20, bban_format: 'nnnnnnnnnnnnnnnn', bban_fields: 'bbbsssccccccccxx', name: 'Bosnia and Herzegovina'};
		this.countrySpecs['BR'] = {chars: 29, bban_format: 'nnnnnnnnnnnnnnnnnnnnnnnac', bban_fields: 'bbbbbbbbssssscccccccccctn', name: 'Brazil'};
		this.countrySpecs['NL'] = {chars: 18, bban_format: 'aaaannnnnnnnnn', bban_fields: 'bbbbcccccccccc', name: 'Netherlands'};
		this.countrySpecs['MK'] = {chars: 19, bban_format: 'nnnccccccccccnn', bban_fields: 'bbbccccccccccxx', name: 'Republic of Macedonia'};

		// INSERT_END
  }
}
