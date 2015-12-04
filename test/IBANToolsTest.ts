/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../build/ibantools.d.ts" />

import chai = require('chai');
let expect = chai.expect;

import iban = require('../build/ibantools');

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

  describe('When calling extractIBAN() with valid Brazilian IBAN', () => {
    let ext = iban.extractIBAN('BR97 0036 0305 0000 1000 9795 493P 1');
		it('valid should be true', () => {
			expect(ext.valid).to.be.true;
		});
    it('BBAN should be 00360305000010009795493P1', () => {
      expect(ext.bban).to.equal('00360305000010009795493P1');
    });
    it('countryCode should be BR', () => {
      expect(ext.countryCode).to.equal('BR');
    });
    it('countryName should be Brazil', () => {
      expect(ext.countryName).to.equal('Brazil');
    });
  });

  describe('When calling extractIBAN() with invalid IBAN', () => {
		let ext = iban.extractIBAN('BR97 0036 0305 1000 9795 493P 1');
		it('valid should be false', () => {
			expect(ext.valid).to.be.false;
		});
    it('BBAN should be undefined', () => {
      expect(ext.bban).to.be.undefined;
    });
    it('countryCode should be undefined', () => {
      expect(ext.countryCode).to.be.undefined;
    });
    it('countryName should be undefined', () => {
      expect(ext.countryName).to.be.undefined;
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

  describe('When calling friendlyFormatIBAN() with - as separator', () => {
    it('with valid badly formated Brazilian IBAN should return BR97-0036-0305-0000-1000-9795-493P-1', () => {
      expect(iban.friendlyFormatIBAN('BR97 0036-030500001000-9795493-P1', '-')).to.equal('BR97-0036-0305-0000-1000-9795-493P-1');
    });
  });

  describe('When calling getCountrySpecs()', () => {
    let ext = iban.getCountrySpecs();
    it('Country with code NL should return name Netherlands', () => {
      expect(ext['NL'].name).to.equal('Netherlands');
    });
    it('Country with code BE should return chars 16', () => {
      expect(ext['BE'].chars).to.equal(16);
    });
    it('Country with code AL should return bban_regexp ^[0-9]{8}[A-Z0-9]{16}$', () => {
      expect(ext['AL'].bban_regexp).to.equal('^[0-9]{8}[A-Z0-9]{16}$');
    });
  });

});
