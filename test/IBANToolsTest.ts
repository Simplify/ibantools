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
    it('with valid country code and invalid BBAN (alpha) should return null', () => {
      expect(iban.composeIBAN({countryCode: 'NL', bban: 'A7NA0417164300'})).to.be.null;
    });
    it('with valid country code and invalid BBAN (num) should return null', () => {
      expect(iban.composeIBAN({countryCode: 'NL', bban: 'ABNA04171Z4300'})).to.be.null;
    });
  });


/*
	describe('When calling extractIBAN() with valid IBAN', () => {
    var subject = new IBANTools({}).extractIBAN('NL91 ABN A0 41 716 43 00');
    it('isValid() should return true', () => {
      expect(subject.isValid()).to.be.true;
    });
    it('getBBAN() should return ABNA0417164300', () => {
      expect(subject.getBBAN()).to.equal('ABNA0417164300');
    });
    it('getIBAN() should return NL91ABNA0417164300', () => {
      expect(subject.getIBAN()).to.equal('NL91ABNA0417164300');
    });
    it('getCountryCode() should return NL', () => {
      expect(subject.getCountryCode()).to.equal('NL');
    });
    it('getCountryName() should return Netherlands', () => {
      expect(subject.getCountryName()).to.equal('Netherlands');
    });
  });

  describe('When initialized with valid Dutch IBAN', () => {
    var subject = new IBANTools({iban: 'NL91 ABNA 0417 1643 00'});
    it('isValid() should return true', () => {
      expect(subject.isValid()).to.be.true;
    });
    it('getBBAN() should return ABNA0417164300', () => {
      expect(subject.getBBAN()).to.equal('ABNA0417164300');
    });
    it('getIBAN() should return NL91ABNA0417164300', () => {
      expect(subject.getIBAN()).to.equal('NL91ABNA0417164300');
    });
    it('getCountryCode() should return NL', () => {
      expect(subject.getCountryCode()).to.equal('NL');
    });
    it('getCountryName() should return Netherlands', () => {
      expect(subject.getCountryName()).to.equal('Netherlands');
    });
  });

  describe('When initialized with valid Brazilian IBAN', () => {
    var subject = new IBANTools({iban: 'BR97 0036 0305 0000 1000 9795 493P 1'});
    it('isValid() should return true', () => {
      expect(subject.isValid()).to.be.true;
    });
    it('getIban() should return BR9700360305000010009795493P1', () => {
      expect(subject.getIBAN()).to.equal('BR9700360305000010009795493P1');
    });
    it('getFriendlyIban() should return BR97 0036 0305 0000 1000 9795 493P 1', () => {
      expect(subject.getFriendlyIBAN()).to.equal('BR97 0036 0305 0000 1000 9795 493P 1');
    });
  });
*/
});

