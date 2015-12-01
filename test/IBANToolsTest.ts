/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../src/IBANTools.ts" />

import chai = require('chai');
var expect = chai.expect;

//import iban from '../src/IBANTools';
import iban = require('../src/IBANTools');

describe('IBANTools', () => {

  describe('When calling isValidIBAN()', () => {
    it('with valid IBAN should return true', () => {
      expect(iban.isValidIBAN('NL91 ABNA 0417 1643 00')).to.be.true;
    });
    it('with invalid IBAN should return false', () => {
      expect(iban.isValidIBAN('NL91 ABNA 0517 1643 00')).to.be.false;
    });
    it('with no IBAN should return false', () => {
      expect(iban.isValidIBAN(null)).to.be.false;
    });
  });

	describe('When calling composeIBAN()', () => {
    it('with valid country code and valid BBAN should return NL91ABNA0417164300', () => {
      expect(iban.composeIBAN({countryCode: 'NL', bban: 'ABNA0417164300'})).to.equal('NL91ABNA0417164300');
    });
    it('with invalid country code and valid BBAN should return null', () => {
      expect(iban.composeIBAN({countryCode: 'ZZ', bban: 'ABNA0417164300'})).to.be.null;
    });
    it('with valid country code and invalid BBAN (non-alpha character) should return null', () => {
      expect(iban.composeIBAN({countryCode: 'NL', bban: 'A7NA0417164300'})).to.be.null;
    });
    it('with valid country code and invalid BBAN (non-numeric character) should return null', () => {
      expect(iban.composeIBAN({countryCode: 'NL', bban: 'ABNA04171Z4300'})).to.be.null;
    });
    it('with valid country code and invalid BBAN (character count wrong) should return null', () => {
      expect(iban.composeIBAN({countryCode: 'NL', bban: 'ABNA04171643000'})).to.be.null;
    });
  });

  describe('When calling electronicFormatIBAN()', () => {
    it('with valid Brazilian IBAN should return BR9700360305000010009795493P1', () => {
      expect(iban.electonicFormatIBAN('BR97 0036 0305 0000 1000 9795 493P 1')).to.equal('BR9700360305000010009795493P1');
    });
	});

  describe('When calling friendlyFormatIBAN()', () => {
    it('with valid badly formated Brazilian IBAN should return BR97 0036 0305 0000 1000 9795 493P 1', () => {
      expect(iban.friendlyFormatIBAN('BR97 0036-030500001000-9795493-P1')).to.equal('BR97 0036 0305 0000 1000 9795 493P 1');
    });
  });

});
