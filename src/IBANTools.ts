"use strict";

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

  /**
   * Create a IBANTools
   * @param {IBANToolsParams}
   */
  constructor(params: IBANToolsParams) {
    if (params.iban !== undefined) {
      this.iban = params.iban.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      this.bban = this.iban.slice(4);
      this.countryCode = this.iban.slice(0,2);
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
    return this.validIBAN && this.validBBAN;
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
}
