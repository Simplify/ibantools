/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as chai from 'chai';
const expect = chai.expect;

import * as iban from '../build/ibantools';


describe('IBANTools', () => {

  describe('When calling isValidIBAN()', () => {
    it('with valid IBAN should return true', () => {
      expect(iban.isValidIBAN('NL91 ABNA 0417 1643 00')).to.be.true;
    });
    it('with valid IBAN should return true', () => {
      expect(iban.isValidIBAN('NL91-ABNA-0417-1643-00')).to.be.true;
    });
    it('with invalid IBAN should return false', () => {
      expect(iban.isValidIBAN('NL91 ABNA 0517 1643 00')).to.be.false;
    });
    it('with no IBAN should return false', () => {
      expect(iban.isValidIBAN(null)).to.be.false;
    });
    it('with valid AT IBAN should return true', () => {
      expect(iban.isValidIBAN('AT61 1904 3002 3457 3201')).to.be.true;
    });
    it('with valid BY IBAN should return true', () => {
      expect(iban.isValidIBAN('BY13 NBRB 3600 9000 0000 2Z00 AB00')).to.be.true;
    });
    it('with valid CR IBAN should return true', () => {
      expect(iban.isValidIBAN('CR25 0102 0000 9074 8835 72')).to.be.true;
    });
    it('with valid DE IBAN should return true', () => {
      expect(iban.isValidIBAN('DE89 3704 0044 0532 0130 00')).to.be.true;
    });
    it('with valid ES IBAN should return true', () => {
      expect(iban.isValidIBAN('ES91 2100 0418 4502 0005 1332')).to.be.true;
    });
    it('with valid GT IBAN should return true', () => {
      expect(iban.isValidIBAN('GT82 TRAJ 0102 0000 0012 1002 9690')).to.be.true;
    });
    it('with valid HR IBAN should return true', () => {
      expect(iban.isValidIBAN('HR12 1001 0051 8630 0016 0')).to.be.true;
    });
    it('with valid IQ IBAN should return true', () => {
      expect(iban.isValidIBAN('IQ98 NBIQ 8501 2345 6789 012')).to.be.true;
    });
    it('with valid JO IBAN should return true', () => {
      expect(iban.isValidIBAN('JO94 CBJO 0010 0000 0000 0131 0003 02')).to.be.true;
    });
    it('with valid PA IBAN should return true', () => {
      expect(iban.isValidIBAN('PS92 PALS 0000 0000 0400 1234 5670 2')).to.be.true;
    });
    it('with valid RS IBAN should return true', () => {
      expect(iban.isValidIBAN('RS35 2600 0560 1001 6113 79')).to.be.true;
    });
    it('with valid SV IBAN should return true', () => {
      expect(iban.isValidIBAN('SV 62 CENR 00000000000000700025')).to.be.true;
    });
    it('with valid TL IBAN should return true', () => {
      expect(iban.isValidIBAN('TL38 0080 0123 4567 8910 157')).to.be.true;
    });
    it('with valid GL IBAN should return true', () => {
      expect(iban.isValidIBAN('GL89 6471 0001 0002 06')).to.be.true;
    });
    it('with valid UA IBAN should return true', () => {
      expect(iban.isValidIBAN('UA21 3996 2200 0002 6007 2335 6600 1')).to.be.true;
    });
    it('with invalid RS IBAN should return false', () => {
      expect(iban.isValidIBAN('RS36 2600 0560 1001 6113 79')).to.be.false;
    });
    it('with invalid TL IBAN should return false', () => {
      expect(iban.isValidIBAN('TL38 0080 0123 4568 8910 157')).to.be.false;
    });
    it('with invalid GL IBAN should return false', () => {
      expect(iban.isValidIBAN('GL89 6471 0001 0002 067')).to.be.false;
    });
  });

  describe('When calling isValidBIC()', function () {
    it('with valid BIC ABNANL2A should return true', function () {
      expect(iban.isValidBIC('ABNANL2A')).to.be.true;
    });
    it('with valid BIC ABNANL2A000 should return true', function () {
      expect(iban.isValidBIC('ABNANL2A000')).to.be.true;
    });
    it('with valid BIC ABNANL2AXXX should return true', function () {
      expect(iban.isValidBIC('ABNANL2AXXX')).to.be.true;
    });
    it('with valid BIC NOLADE21KI should return true', function () {
      expect(iban.isValidBIC('NOLADE21KIE')).to.be.true;
    });
    it('with valid BIC INGDDEFFXXX should return true', function () {
      expect(iban.isValidBIC('INGDDEFFXXX')).to.be.true;
    });
    it('with invalid BIC INGDEFFXXX should return false', function () {
      expect(iban.isValidBIC('INGDEFFXXX')).to.be.false;
    });
    it('with invalid BIC ABN4NL2A should return false', function () {
      expect(iban.isValidBIC('ABN4NL2A')).to.be.false;
    });
    it('with invalid BIC ABNANL2A01F should return true', function () {
      expect(iban.isValidBIC('ABNANL2A01F')).to.be.true;
    });
  });

  describe('When calling extractBIC() with valid BIC ABNANL2A', function () {
    let ext = iban.extractBIC('ABNANL2A');
    it('valid should be true', () => {
      expect(ext.valid).to.be.true;
    });
    it('bankCode should be ABNA', () => {
      expect(ext.bankCode).to.equal('ABNA');
    });
    it('countryCode should be NL', () => {
      expect(ext.countryCode).to.equal('NL');
    });
    it('locationCode should be 2A', () => {
      expect(ext.locationCode).to.equal('2A');
    });
    it('testBIC should be false', () => {
      expect(ext.testBIC).to.be.false;
    });
    it('branchCode should be 619 (primary office)', () => {
      expect(ext.branchCode).to.equal('619');
    });
  });

  describe('When calling extractBIC() with invalid BIC ABN7NL2A', function () {
    let ext = iban.extractBIC('ABN7NL2A');
    it('valid should be false', () => {
      expect(ext.valid).to.be.false;
    });
    it('bankCode should be undefined', () => {
      expect(ext.bankCode).to.be.undefined;
    });
    it('countryCode should be undefined', () => {
      expect(ext.countryCode).to.be.undefined;
    });
    it('locationCode should be undefined', () => {
      expect(ext.locationCode).to.be.undefined;
    });
    it('testBIC should be undefined', () => {
      expect(ext.testBIC).to.be.undefined;
    });
    it('branchCode should be undefined', () => {
      expect(ext.branchCode).to.be.undefined;
    });
  });

  describe('When calling extractBIC() with valid BIC NEDSZAJ0XXX', function () {
    let ext = iban.extractBIC('NEDSZAJ0XXX');
    it('valid should be true', () => {
      expect(ext.valid).to.be.true;
    });
    it('bankCode should be NEDS', () => {
      expect(ext.bankCode).to.equal('NEDS');
    });
    it('countryCode should be ZA', () => {
      expect(ext.countryCode).to.equal('ZA');
    });
    it('locationCode should be J0', () => {
      expect(ext.locationCode).to.equal('J0');
    });
    it('testBIC should be true', () => {
      expect(ext.testBIC).to.be.true;
    });
    it('branchCode should be XXX', () => {
      expect(ext.branchCode).to.equal('XXX');
    });
  });

  describe('When calling isValidBBAN()', () => {
    it('with valid BBAN and valid country code should return true', () => {
      expect(iban.isValidBBAN('ABNA 0417 1643 00', 'NL')).to.be.true;
    });
    it('with invalid BBAN and valid country code should return false', () => {
      expect(iban.isValidBBAN('A7NA 0417 1643 00', 'NL')).to.be.false;
    });
    it('with valid BBAN and invalid country code should return false', () => {
      expect(iban.isValidBBAN('ABNA0417164300', 'ZZ')).to.be.false;
    });
    it('with valid BBAN and no country code should return false', () => {
      expect(iban.isValidBBAN('ABNA0417164300', null)).to.be.false;
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
    it('with valid country code and no BBAN should return null', () => {
      expect(iban.composeIBAN({countryCode: 'NL', bban: null})).to.be.null;
    });
  });

  describe('When calling extractIBAN() with valid Brazilian IBAN', () => {
    let ext = iban.extractIBAN('BR97 0036 0305 0000 1000 9795 493P 1');
    it('valid should be true', () => {
      expect(ext.valid).to.be.true;
    });
    it('IBAN should be BR9700360305000010009795493P1', () => {
      expect(ext.iban).to.equal('BR9700360305000010009795493P1');
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
    it('IBAN should be BR9700360305100019795493P1', () => {
      expect(ext.iban).to.equal('BR970036030510009795493P1');
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
      expect(iban.electronicFormatIBAN('BR97 0036 0305 0000 1000 9795 493P 1')).to.equal('BR9700360305000010009795493P1');
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

  describe('When calling getCountrySpecifications()', () => {
    let ext = iban.getCountrySpecifications();
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
