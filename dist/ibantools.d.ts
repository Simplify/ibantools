/**
 * Validate IBAN
 * @param {string} IBAN
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
 * @param {ComposeIBANParams} Object {bban: string, countryCode: string}
 * @result {string} IBAN
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
 * @param {string} IBAN
 * @result {ExtractIBANResult} Object {bban: string, countryCode: string, countryName: string, valid: boolean}
 */
export declare function extractIBAN(iban: string): ExtractIBANResult;
/**
 * Get IBAN in electronic format (no spaces)
 * IBAN validation is not performed.
 * @param {string} IBAN
 * @return {string} IBAN or null if IBAN is not valid
 */
export declare function electonicFormatIBAN(iban: string): string;
/**
 * Get IBAN in friendly format (separated after every 4 characters)
 * IBAN validation is not performed.
 * @param {string} IBAN
 * @param {string} separator, default is space ' '
 * @return {string} IBAN or null if IBAN is not valid
 */
export declare function friendlyFormatIBAN(iban: string, separator?: string): string;
