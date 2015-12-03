/**
 * @module IBANTools
 */
export declare module IBANTools {
    /**
     * Validate IBAN
     * @param {string} IBAN
     * @return {boolean} valid
     */
    function isValidIBAN(iban: string): boolean;
    /**
     * Interface for ComposeIBAN parameteres
     */
    interface ComposeIBANParms {
        countryCode?: string;
        bban?: string;
    }
    /**
     * composeIBAN
     * @param {ComposeIBANParams} Object {bban: string, countryCode: string}
     * @result {string} IBAN
     */
    function composeIBAN(params: ComposeIBANParms): string;
    /**
     * Interface for ExtractIBAN result
     */
    interface ExtractIBANResult {
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
    function extractIBAN(iban: string): ExtractIBANResult;
    /**
     * Get IBAN in electronic format (no spaces)
     * IBAN validation is not performed.
     * @param {string} IBAN
     * @return {string} IBAN or null if IBAN is not valid
     */
    function electonicFormatIBAN(iban: string): string;
    /**
     * Get IBAN in friendly format (separated after every 4 characters)
     * IBAN validation is not performed.
     * @param {string} IBAN
     * @param {string} separator, default is space ' '
     * @return {string} IBAN or null if IBAN is not valid
     */
    function friendlyFormatIBAN(iban: string, separator?: string): string;
}
