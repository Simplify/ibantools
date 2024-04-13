/* Licensed under the Mozilla Public License, Version 2.0 or the MIT license,
 * at your option. This file may not be copied, modified, or distributed
 * except according to those terms.
 * SPDX-FileCopyrightText: Saša Jovanić
 * SPDX-License-Identifier: MIT or MPL/2.0 */

'use strict';

import { expect } from 'chai';
import * as iban from '../jsnext/ibantools.js';

describe('IBANTools', function() {
  describe('When calling isValidIBAN()', function() {

    it('with valid IBAN should return true', function() {
      expect(iban.isValidIBAN('NL91ABNA0417164300')).to.be.true;
    });
    it('with valid IBAN should return true', function() {
      expect(iban.isValidIBAN('NL91ABNA0417164300')).to.be.true;
    });
    it('with valid IBAN should return true', function() {
      expect(iban.isValidIBAN('NL50PSTB0000054322')).to.be.true;
    });
    it('with invalid IBAN should return false', function() {
      expect(iban.isValidIBAN('NL91ABNA0517164300')).to.be.false;
    });
    it('with no IBAN should return false', function() {
      expect(iban.isValidIBAN(null)).to.be.false;
    });
    it('with valid AT IBAN should return true', function() {
      expect(iban.isValidIBAN('AT611904300234573201')).to.be.true;
    });
    it('with valid BY IBAN should return true', function() {
      expect(iban.isValidIBAN('BY13NBRB3600900000002Z00AB00')).to.be.true;
    });
    it('with valid CR IBAN should return true', function() {
      expect(iban.isValidIBAN('CR25010200009074883572')).to.be.true;
    });
    it('with valid DE IBAN should return true', function() {
      expect(iban.isValidIBAN('DE89370400440532013000')).to.be.true;
    });
    it('with valid ES IBAN should return true', function() {
      expect(iban.isValidIBAN('ES9121000418450200051332')).to.be.true;
    });
    it('with valid ES IBAN should return true', function() {
      expect(iban.isValidIBAN('ES4901825500610201630983')).to.be.true;
    });
    it('with invalid ES IBAN should return false', function() {
      expect(iban.isValidIBAN('ES8350210036679521296135')).to.be.false;
    });
    it('with valid GT IBAN should return true', function() {
      expect(iban.isValidIBAN('GT82TRAJ01020000001210029690')).to.be.true;
    });
    it('with valid HR IBAN should return true', function() {
      expect(iban.isValidIBAN('HR1210010051863000160')).to.be.true;
    });
    it('with valid IQ IBAN should return true', function() {
      expect(iban.isValidIBAN('IQ98NBIQ850123456789012')).to.be.true;
    });
    it('with valid IQ IBAN with space it should return false', function() {
      expect(iban.isValidIBAN('IQ98 NBIQ 8501 2345 6789 012')).to.be.false;
    });
    it('with valid JO IBAN should return true', function() {
      expect(iban.isValidIBAN('JO94CBJO0010000000000131000302')).to.be.true;
    });
    it('with valid PA IBAN should return true', function() {
      expect(iban.isValidIBAN('PS92PALS000000000400123456702')).to.be.true;
    });
    it('with valid RS IBAN should return true', function() {
      expect(iban.isValidIBAN('RS35260005601001611379')).to.be.true;
    });
    it('with valid SV IBAN should return true', function() {
      expect(iban.isValidIBAN('SV62CENR00000000000000700025')).to.be.true;
    });
    it('with valid TL IBAN should return true', function() {
      expect(iban.isValidIBAN('TL380080012345678910157')).to.be.true;
    });
    it('with valid GL IBAN should return true', function() {
      expect(iban.isValidIBAN('GL8964710001000206')).to.be.true;
    });
    it('with valid UA IBAN should return true', function() {
      expect(iban.isValidIBAN('UA213996220000026007233566001')).to.be.true;
    });
    it('with valid VA IBAN should return true', function() {
      expect(iban.isValidIBAN('VA59001123000012345678')).to.be.true;
    });
    it('with valid SV IBAN should return true', function() {
      expect(iban.isValidIBAN('SV62CENR00000000000000700025')).to.be.true;
    });
    it('with invalid RS IBAN should return false', function() {
      expect(iban.isValidIBAN('RS36260005601001611379')).to.be.false;
    });
    it('with invalid TL IBAN should return false', function() {
      expect(iban.isValidIBAN('TL380080012345688910157')).to.be.false;
    });
    it('with invalid GL IBAN should return false', function() {
      expect(iban.isValidIBAN('GL89647100010002067')).to.be.false;
    });
    it('with valid GB IBAN should return true', function() {
      expect(iban.isValidIBAN('GB29NWBK60161331926819')).to.be.true;
    });
    it('with invalid GB IBAN should return false', function() {
      expect(iban.isValidIBAN('GB2LABBY09012857201707')).to.be.false;
    });
    it('with invalid GB IBAN should return false', function() {
      expect(iban.isValidIBAN('GB00HLFX11016111455365')).to.be.false;
    });
    it('with valid Egypt IBAN should return true', function() {
      expect(iban.isValidIBAN('EG380019000500000000263180002')).to.be.true;
    });
    it('with valid Algeria IBAN should return true', function() {
      expect(iban.isValidIBAN('DZ580002100001113000000570')).to.be.true;
    });
    it('with valid Angola IBAN should return true', function() {
      expect(iban.isValidIBAN('AO44123412341234123412341')).to.be.true;
    });
    it('with valid Benin IBAN should return true', function() {
      expect(iban.isValidIBAN('BJ83A12312341234123412341234')).to.be.true;
    });
    it('with valid Burkina Faso IBAN should return true', function() {
      expect(iban.isValidIBAN('BF42BF0840101300463574000390')).to.be.true;
    });
    it('with valid Burundi IBAN should return true', function() {
      expect(iban.isValidIBAN('BI4210000100010000332045181')).to.be.true;
    });
    it('with valid Cameroon IBAN should return true', function() {
      expect(iban.isValidIBAN('CM1512341234123412341234123')).to.be.true;
    });
    it('with valid Cape Verde IBAN should return true', function() {
      expect(iban.isValidIBAN('CV05123412341234123412341')).to.be.true;
    });
    it('with valid Cape Verde IBAN should return true (2)', function() {
      expect(iban.isValidIBAN('CV64000300008885500810176')).to.be.true;
    });
    it('with valid Iran IBAN should return true', function() {
      expect(iban.isValidIBAN('IR081234123412341234123412')).to.be.true;
    });
    it('with valid Ivory Coast IBAN should return true', function() {
      expect(iban.isValidIBAN('CI77A12312341234123412341234')).to.be.true;
    });
    it('with valid Madagaskar IBAN should return true', function() {
      expect(iban.isValidIBAN('MG4012341234123412341234123')).to.be.true;
    });
    it('with valid Mali IBAN should return true', function() {
      expect(iban.isValidIBAN('ML75A12312341234123412341234')).to.be.true;
    });
    it('with valid Mozambique IBAN should return true', function() {
      expect(iban.isValidIBAN('MZ97123412341234123412341')).to.be.true;
    });
    it('with valid Comoros IBAN should return true', function() {
      expect(iban.isValidIBAN('KM4600005000010010904400137')).to.be.true;
    });
    it('with valid Chad IBAN should return true', function() {
      expect(iban.isValidIBAN('TD8960002000010271091600153')).to.be.true;
    });
    it('with valid Congo IBAN should return true', function() {
      expect(iban.isValidIBAN('CG3930011000101013451300019')).to.be.true;
    });
    it('with valid Gabon IBAN should return true', function() {
      expect(iban.isValidIBAN('GA2140021010032001890020126')).to.be.true;
    });
    it('with valid Honduras IBAN should return true', function() {
      expect(iban.isValidIBAN('HN54PISA00000000000000123124')).to.be.true;
    });
    it('with valid Marocco IBAN should return true', function() {
      expect(iban.isValidIBAN('MA64011519000001205000534921')).to.be.true;
    });
    it('with valid Nicaragua IBAN should return true', function() {
      expect(iban.isValidIBAN('NI79BAMC00000000000003123123')).to.be.true;
    });
    it('with valid Niger IBAN should return true', function() {
      expect(iban.isValidIBAN('NE58NE0380100100130305000268')).to.be.true;
    });
    it('with valid Togo IBAN should return true', function() {
      expect(iban.isValidIBAN('TG53TG0090604310346500400070')).to.be.true;
    });
    it('with valid Central African Republic IBAN should return true', function() {
      expect(iban.isValidIBAN('CF4220001000010120069700160')).to.be.true;
    });
    it('with valid Djibouti IBAN should return true', function() {
      expect(iban.isValidIBAN('DJ2110002010010409943020008')).to.be.true;
    });
    it('with valid Equatorial Guinea IBAN should return true', function() {
      expect(iban.isValidIBAN('GQ7050002001003715228190196')).to.be.true;
    });
    it('with valid Guinea-Bissau IBAN should return true', function() {
      expect(iban.isValidIBAN('GW04GW1430010181800637601')).to.be.true;
    });
    it('with valid Seychelles IBAN should return true', function() {
      expect(iban.isValidIBAN('SC52BAHL01031234567890123456USD')).to.be.true;
    });
    it('with valid Libya IBAN should return true', function() {
      expect(iban.isValidIBAN('LY83002048000020100120361')).to.be.true;
    });
    it('with valid Senegal IBAN should return true', function() {
      expect(iban.isValidIBAN('SN08SN0100152000048500003035')).to.be.true;
    });
    it('with valid Sudan IBAN should return true', function() {
      expect(iban.isValidIBAN('SD8811123456789012')).to.be.true;
    });
    it('with valid Somalian IBAN should return true', function() {
      expect(iban.isValidIBAN('SO061000001123123456789')).to.be.true;
    });
    it('with valid Poland IBAN should return true', function() {
      expect(iban.isValidIBAN('PL10105000997603123456789123')).to.be.true;
    });
    it('with valid Belgian IBAN should return true', function() {
      expect(iban.isValidIBAN('BE68539007547034')).to.be.true;
    });
    it('with valid BA IBAN should return true', function() {
      expect(iban.isValidIBAN('BA391290079401028494')).to.be.true;
    });
    it('with valid BA IBAN should return true', function() {
      expect(iban.isValidIBAN('BA391990440001200279')).to.be.true;
    });
    it('with valid MK IBAN should return true', function() {
      expect(iban.isValidIBAN('MK07250120000058984')).to.be.true;
    });
    it('with valid MK IBAN should return true', function() {
      expect(iban.isValidIBAN('MK07500120050057453')).to.be.true;
    });
    it('with valid ME IBAN should return true', function() {
      expect(iban.isValidIBAN('ME25505000012345678951')).to.be.true;
    });
    it('with valid ME IBAN should return true', function() {
      expect(iban.isValidIBAN('ME25907000000005800138')).to.be.true;
    });
    it('with valid PT IBAN should return true', function() {
      expect(iban.isValidIBAN('PT50002600000524218600185')).to.be.true;
    });
    it('with valid PT IBAN should return true', function() {
      expect(iban.isValidIBAN('PT50000405010020500101441')).to.be.true;
    });
    it('with valid SI IBAN should return true', function() {
      expect(iban.isValidIBAN('SI56191000000123438')).to.be.true;
    });
    it('with valid SI IBAN should return true', function() {
      expect(iban.isValidIBAN('SI56051008000032875')).to.be.true;
    });
    it('with valid CZ IBAN should return true', function() {
      expect(iban.isValidIBAN('CZ6508000000192000145399')).to.be.true;
    });
    it('with invalid CZ IBAN should return false', function() {
      expect(iban.isValidIBAN('CZ6508000000182000145399')).to.be.false;
    });
    it('with valid EE IBAN should return true', function() {
      expect(iban.isValidIBAN('EE443300338400100007')).to.be.true;
    });
    it('with valid EE IBAN should return true', function() {
      expect(iban.isValidIBAN('EE382200221020145685')).to.be.true;
    });
    it('with valid EE IBAN should return true', function() {
      expect(iban.isValidIBAN('EE901700017000000006')).to.be.true;
    });
    it('with valid EE IBAN should return true', function() {
      expect(iban.isValidIBAN('EE975500000550008329')).to.be.true;
    });
    it('with valid FI IBAN should return true', function() {
      expect(iban.isValidIBAN('FI2112345600000785')).to.be.true;
    });
    it('with valid FI IBAN should return true', function() {
      expect(iban.isValidIBAN('FI5542345670000081')).to.be.true;
    });
    it('with valid FI IBAN should return true', function() {
      expect(iban.isValidIBAN('FI6879826661004681')).to.be.true;
    });
    it('with valid FI IBAN should return true', function() {
      expect(iban.isValidIBAN('FI0488000710574083')).to.be.true;
    });
    it('with valid FR IBAN should return true', function() {
      expect(iban.isValidIBAN('FR1420041010050500013M02606')).to.be.true;
    });
    it('with valid FR IBAN should return true', function() {
      expect(iban.isValidIBAN('FR22200410100505QZABCMGEF65')).to.be.true;
    });
    it('with valid MC IBAN should return true', function() {
      expect(iban.isValidIBAN('MC5811222000010123456789030')).to.be.true;
    });
    it('with valid MC IBAN should return true', function() {
      expect(iban.isValidIBAN('MC1112739000700011111000H79')).to.be.true;
    });
    it('with valid HU IBAN should return true', function() {
      expect(iban.isValidIBAN('HU42117730161111101800000000')).to.be.true;
    });
    it('with valid HU IBAN should return true', function() {
      expect(iban.isValidIBAN('HU51100320000122013950000249')).to.be.true;
    });
    it('with valid HU IBAN should return true', function() {
      expect(iban.isValidIBAN('HU43100320000122032850002447')).to.be.true;
    });
    it('with valid HU IBAN should return true', function() {
      expect(iban.isValidIBAN('HU90100320000160120200000000')).to.be.true;
    });
    it('with valid MN IBAN should return true', function() {
      expect(iban.isValidIBAN('MN121234123456789123')).to.be.true;
    });
    it('with valid SK IBAN should return true', function() {
      expect(iban.isValidIBAN('SK3112000000198742637541')).to.be.true;
    });
    it('with valid RU IBAN should return true', function() {
      expect(iban.isValidIBAN('RU0204452560040702810412345678901')).to.be.true;
    });
    it('with valid old Postbank Dutch IBAN should return true', function() {
      expect(iban.isValidIBAN('NL08INGB0000000555')).to.be.true;
    });
    it('with invalid Dutch IBAN should return false', function() {
      expect(iban.isValidIBAN('NL08INGB0012345555')).to.be.false;
    });
    it('with two dots should return false', function() {
      expect(iban.isValidIBAN('..')).to.be.false;
    });
    it('with too short IBAN should return false', function() {
      expect(iban.isValidIBAN('SI94BARC102')).to.be.false;
    });
    it('allows QR-IBAN by default', function() {
      expect(iban.isValidIBAN('CH4431999123000889012')).to.be.true;
    });
    it('does not allows QR-IBAN when requested to do so', function() {
      expect(iban.isValidIBAN('CH4431999123000889012', { allowQRIBAN: false })).to.be.false;
    });
    it('with valid FK IBAN should return true', function() {
      expect(iban.isValidIBAN('FK88SC123456789012')).to.be.true;
    });
    it('with valid OM IBAN should return true', function() {
      expect(iban.isValidIBAN('OM810180000001299123456')).to.be.true;
    });
  });

  describe('When calling validateIBAN()', function() {
    it('with null IBAN should return false', function() {
      expect(iban.validateIBAN(null)).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsIBAN.NoIBANProvided],
      });
    });

    it('with empty IBAN should return false', function() {
      expect(iban.validateIBAN('')).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsIBAN.NoIBANProvided],
      });
    });

    it('with two dots instead of IBAN should return false', function() {
      expect(iban.validateIBAN('..')).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsIBAN.NoIBANCountry],
      });
    });

    it('with valid IBAN separeted with spaces returns false', function() {
      expect(iban.validateIBAN('NL91 ABNA 0417 1643 00')).to.deep.equal({
        valid: false,
        errorCodes: [
          iban.ValidationErrorsIBAN.WrongBBANLength,
          iban.ValidationErrorsIBAN.WrongBBANFormat,
          iban.ValidationErrorsIBAN.WrongIBANChecksum,
        ],
      });
    });

    it('with IBAN separeted with dashes returns false', function() {
      expect(iban.validateIBAN('FR76-4097-8265-8510-1221-2598-123')).to.deep.equal({
        valid: false,
        errorCodes: [
          iban.ValidationErrorsIBAN.WrongBBANLength,
          iban.ValidationErrorsIBAN.WrongBBANFormat,
          iban.ValidationErrorsIBAN.WrongAccountBankBranchChecksum,
          iban.ValidationErrorsIBAN.WrongIBANChecksum,
        ],
      });
    });

    it('with too short IBAN should return false', function() {
      expect(iban.validateIBAN('SI94BARC102')).to.deep.equal({
        valid: false,
        errorCodes: [
          iban.ValidationErrorsIBAN.WrongBBANLength,
          iban.ValidationErrorsIBAN.WrongBBANFormat,
          iban.ValidationErrorsIBAN.WrongAccountBankBranchChecksum,
          iban.ValidationErrorsIBAN.WrongIBANChecksum,
        ],
      });
    });

    it('with undefined IBAN should return false', function() {
      expect(iban.validateIBAN(undefined)).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsIBAN.NoIBANProvided],
      });
    });

    it('with invalid IBAN checksum should return false with correct code', function() {
      expect(iban.validateIBAN('NL91ABNA0517164300')).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsIBAN.WrongIBANChecksum],
      });
    });

    it('with invalid IBAN country should return false with error codes', function() {
      expect(iban.validateIBAN('XX91ABNA0517164300')).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsIBAN.NoIBANCountry],
      });
    });

    it('with country code only should return false with wrong code', function() {
      expect(iban.validateIBAN('NL')).to.deep.equal({
        valid: false,
        errorCodes: [
          iban.ValidationErrorsIBAN.WrongBBANLength,
          iban.ValidationErrorsIBAN.WrongBBANFormat,
          iban.ValidationErrorsIBAN.ChecksumNotNumber,
          iban.ValidationErrorsIBAN.WrongIBANChecksum,
        ],
      });
    });

    it('with invalid IBAN should return multiple error codes', function() {
      expect(iban.validateIBAN('NL9ZA8NA057164300')).to.deep.equal({
        valid: false,
        errorCodes: [
          iban.ValidationErrorsIBAN.WrongBBANLength,
          iban.ValidationErrorsIBAN.WrongBBANFormat,
          iban.ValidationErrorsIBAN.ChecksumNotNumber,
          iban.ValidationErrorsIBAN.WrongIBANChecksum,
        ],
      });
    });

    it('allows QR-IBAN by default', function() {
      expect(iban.validateIBAN('CH4431999123000889012')).to.deep.equal({
        valid: true,
        errorCodes: [],
      });
    });

    it('does not allows QR-IBAN when requested to do so', function() {
      expect(iban.validateIBAN('CH4431999123000889012', { allowQRIBAN: false })).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsIBAN.QRIBANNotAllowed],
      });
    });

    it('with valid Libya IBAN should return true', function() {
      expect(iban.validateIBAN('LY83002048000020100120361')).to.deep.equal({ valid: true, errorCodes: [] });
    });

    it('with valid Russian IBAN should return true', function() {
      expect(iban.validateIBAN('RU0204452560040702810412345678901')).to.deep.equal({ valid: true, errorCodes: [] });
    });

    it('with valid Sudanese IBAN should return true', function() {
      expect(iban.validateIBAN('SD8811123456789012')).to.deep.equal({ valid: true, errorCodes: [] });
    });

    it('with valid Somalian IBAN should return true', function() {
      expect(iban.validateIBAN('SO061000001123123456789')).to.deep.equal({ valid: true, errorCodes: [] });
    });
  });

  describe('When calling isValidBIC()', function() {
    it('with valid BIC ABNANL2A should return true', function() {
      expect(iban.isValidBIC('ABNANL2A')).to.be.true;
    });
    it('with valid BIC ABNANL2A000 should return true', function() {
      expect(iban.isValidBIC('ABNANL2A000')).to.be.true;
    });
    it('with valid BIC ABNANL2AXXX should return true', function() {
      expect(iban.isValidBIC('ABNANL2AXXX')).to.be.true;
    });
    it('with valid BIC ABNAAA2AXXX should return true', function() {
      expect(iban.isValidBIC('ABNAAA2AXXX')).to.be.false;
    });
    it('with valid BIC NOLADE21KI should return true', function() {
      expect(iban.isValidBIC('NOLADE21KIE')).to.be.true;
    });
    it('with valid BIC INGDDEFFXXX should return true', function() {
      expect(iban.isValidBIC('INGDDEFFXXX')).to.be.true;
    });
    it('with invalid BIC INGDEFFXXX should return false', function() {
      expect(iban.isValidBIC('INGDEFFXXX')).to.be.false;
    });
    it('with invalid BIC ABN4NL2A should return false', function() {
      expect(iban.isValidBIC('ABN4NL2A')).to.be.false;
    });
    it('with invalid BIC ABNANL2A01F should return true', function() {
      expect(iban.isValidBIC('ABNANL2A01F')).to.be.true;
    });
    it('with invalid BIC `null` should return false', function() {
      expect(iban.isValidBIC(null)).to.be.false;
    });
    it('with invalid BIC `undefined` should return false', function() {
      expect(iban.isValidBIC(undefined)).to.be.false;
    });
    it('with invalid BIC ABNAXX2A should return false', function() {
      expect(iban.isValidBIC('ABNAXX2A')).to.be.false;
    });
  });

  describe('When calling validateBIC()', function() {
    it('with null BIC should return false', function() {
      expect(iban.validateBIC(null)).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsBIC.NoBICProvided],
      });
    });

    it('with empty BIC should return false', function() {
      expect(iban.validateBIC('')).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsBIC.NoBICProvided],
      });
    });

    it('with undefined BIC should return false', function() {
      expect(iban.validateBIC(undefined)).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsBIC.NoBICProvided],
      });
    });

    it('with invalid BIC should return false with correct code', function() {
      expect(iban.validateBIC('ABN4NL2A')).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsBIC.WrongBICFormat],
      });
    });

    it('with invalid BIC country should return false with correct code', function() {
      expect(iban.validateBIC('ABNAXX2A')).to.deep.equal({
        valid: false,
        errorCodes: [iban.ValidationErrorsBIC.NoBICCountry],
      });
    });

    it('with valid BIC should return true', function() {
      expect(iban.validateBIC('ABNANL2A')).to.deep.equal({ valid: true, errorCodes: [] });
    });
  });

  describe('When calling isSEPACountry()', function() {
    it('with valid country code NL should return true', function() {
      expect(iban.isSEPACountry('NL')).to.be.true;
    });
    it('with valid country code PK return false', function() {
      expect(iban.isSEPACountry('PK')).to.be.false;
    });
    it('with non valid country code XX return false', function() {
      expect(iban.isSEPACountry('XX')).to.be.false;
    });
  });

  describe('When calling extractBIC() with valid BIC ABNANL2A', function() {
    var ext = iban.extractBIC('ABNANL2A');
    it('valid should be true', function() {
      expect(ext.valid).to.be.true;
    });
    it('bankCode should be ABNA', function() {
      expect(ext.bankCode).to.equal('ABNA');
    });
    it('countryCode should be NL', function() {
      expect(ext.countryCode).to.equal('NL');
    });
    it('locationCode should be 2A', function() {
      expect(ext.locationCode).to.equal('2A');
    });
    it('testBIC should be false', function() {
      expect(ext.testBIC).to.be.false;
    });
    it('branchCode should be null', function() {
      expect(ext.branchCode).to.equal(null);
    });
  });

  describe('When calling extractBIC() with lowercase BIC dnbanokk', function() {
    var ext = iban.extractBIC('dnbanokk');
    it('countryCode should be NO', function() {
      expect(ext.countryCode).to.equal('NO');
    });
  });

  describe('When calling extractBIC() with invalid BIC ABN7NL2A', function() {
    var ext = iban.extractBIC('ABN7NL2A');
    it('valid should be false', function() {
      expect(ext.valid).to.be.false;
    });
    it('bankCode should be undefined', function() {
      expect(ext.bankCode).to.be.undefined;
    });
    it('countryCode should be undefined', function() {
      expect(ext.countryCode).to.be.undefined;
    });
    it('locationCode should be undefined', function() {
      expect(ext.locationCode).to.be.undefined;
    });
    it('testBIC should be undefined', function() {
      expect(ext.testBIC).to.be.undefined;
    });
    it('branchCode should be undefined', function() {
      expect(ext.branchCode).to.be.undefined;
    });
  });

  describe('When calling extractBIC() with valid BIC NEDSZAJ0XXX', function() {
    var ext = iban.extractBIC('NEDSZAJ0XXX');
    it('valid should be true', function() {
      expect(ext.valid).to.be.true;
    });
    it('bankCode should be NEDS', function() {
      expect(ext.bankCode).to.equal('NEDS');
    });
    it('countryCode should be ZA', function() {
      expect(ext.countryCode).to.equal('ZA');
    });
    it('locationCode should be J0', function() {
      expect(ext.locationCode).to.equal('J0');
    });
    it('testBIC should be true', function() {
      expect(ext.testBIC).to.be.true;
    });
    it('branchCode should be XXX', function() {
      expect(ext.branchCode).to.equal('XXX');
    });
  });

  describe('When calling isValidBBAN()', function() {
    it('with valid BBAN and valid country code should return true', function() {
      expect(iban.isValidBBAN('ABNA0417164300', 'NL')).to.be.true;
    });
    it('with valid BBAN and valid country code should return true', function() {
      expect(iban.isValidBBAN('PSTB0000054322', 'NL')).to.be.true;
    });
    it('with invalid BBAN and valid country code should return false', function() {
      expect(iban.isValidBBAN('A7NA0417164300', 'NL')).to.be.false;
    });
    it('with valid BBAN and invalid country code should return false', function() {
      expect(iban.isValidBBAN('ABNA0417164300', 'ZZ')).to.be.false;
    });
    it('with valid BBAN and no country code should return false', function() {
      expect(iban.isValidBBAN('ABNA0417164300', null)).to.be.false;
    });
    it('with invalid BBAN for country code NO should return false', function() {
      expect(iban.isValidBBAN('12043175441', 'NO')).to.be.false;
    });
    it('with valid BBAN for country code NO should return true', function() {
      expect(iban.isValidBBAN('12043175449', 'NO')).to.be.true;
    });
    it('with too short BBAN for country code NO should return false', function() {
      expect(iban.isValidBBAN('1204317544', 'NO')).to.be.false;
    });
  });

  describe('When calling composeIBAN()', function() {
    it('with valid country code and valid BBAN should return NL91ABNA0417164300', function() {
      expect(iban.composeIBAN({ countryCode: 'NL', bban: 'ABNA0417164300' })).to.equal('NL91ABNA0417164300');
    });
    it('with invalid country code and valid BBAN should return null', function() {
      expect(iban.composeIBAN({ countryCode: 'ZZ', bban: 'ABNA0417164300' })).to.be.null;
    });
    it('with valid country code and invalid BBAN (non-alpha character) should return null', function() {
      expect(iban.composeIBAN({ countryCode: 'NL', bban: 'A7NA0417164300' })).to.be.null;
    });
    it('with valid country code and invalid BBAN (non-numeric character) should return null', function() {
      expect(iban.composeIBAN({ countryCode: 'NL', bban: 'ABNA04171Z4300' })).to.be.null;
    });
    it('with valid country code and invalid BBAN (character count wrong) should return null', function() {
      expect(iban.composeIBAN({ countryCode: 'NL', bban: 'ABNA04171643000' })).to.be.null;
    });
    it('without country codeshould return null', function() {
      expect(iban.composeIBAN({ bban: 'ABNA04171643000' })).to.be.null;
    });
    it('with valid country code and no BBAN should return null', function() {
      expect(iban.composeIBAN({ countryCode: 'NL', bban: null })).to.be.null;
    });
  });

  describe('When calling extractIBAN() with valid Brazilian IBAN', function() {
    var ext = iban.extractIBAN('BR9700360305000010009795493P1');
    it('valid should be true', function() {
      expect(ext.valid).to.be.true;
    });
    it('IBAN should be BR9700360305000010009795493P1', function() {
      expect(ext.iban).to.equal('BR9700360305000010009795493P1');
    });
    it('BBAN should be 00360305000010009795493P1', function() {
      expect(ext.bban).to.equal('00360305000010009795493P1');
    });
    it('countryCode should be BR', function() {
      expect(ext.countryCode).to.equal('BR');
    });
    it('accountNumber should be 0009795493P1', function() {
      expect(ext.accountNumber).to.equal('0009795493P1');
    });
    it('bankIdentifier should be 00360305', function() {
      expect(ext.bankIdentifier).to.equal('00360305');
    });
    it('branchIdentifier should be 00001', function() {
      expect(ext.branchIdentifier).to.equal('00001');
    });
  });

  describe('When calling extractIBAN() with valid French IBAN', function() {
    var ext = iban.extractIBAN('FR3330002005500000157841Z25');
    it('valid should be true', function() {
      expect(ext.valid).to.be.true;
    });
    it('IBAN should be FR3330002005500000157841Z25', function() {
      expect(ext.iban).to.equal('FR3330002005500000157841Z25');
    });
    it('BBAN should be 30002005500000157841Z25', function() {
      expect(ext.bban).to.equal('30002005500000157841Z25');
    });
    it('countryCode should be FR', function() {
      expect(ext.countryCode).to.equal('FR');
    });
    it('accountNumber should be 0000157841Z', function() {
      expect(ext.accountNumber).to.equal('0000157841Z');
    });
    it('bankIdentifier should be 30002', function() {
      expect(ext.bankIdentifier).to.equal('30002');
    });
    it('branchIdentifier should be 00550', function() {
      expect(ext.branchIdentifier).to.equal('00550');
    });
  });

  describe('When calling extractIBAN() with valid Slovenian IBAN', function() {
    var ext = iban.extractIBAN('SI56263300012039086');
    it('valid should be true', function() {
      expect(ext.valid).to.be.true;
    });
    it('IBAN should be SI56263300012039086', function() {
      expect(ext.iban).to.equal('SI56263300012039086');
    });
    it('BBAN should be 263300012039086', function() {
      expect(ext.bban).to.equal('263300012039086');
    });
    it('countryCode should be SI', function() {
      expect(ext.countryCode).to.equal('SI');
    });
    it('accountNumber should be 00120390', function() {
      expect(ext.accountNumber).to.equal('00120390');
    });
    it('bankIdentifier should be 26', function() {
      expect(ext.bankIdentifier).to.equal('26');
    });
    it('branchIdentifier should be 330', function() {
      expect(ext.branchIdentifier).to.equal('330');
    });
  });

  describe('When calling extractIBAN() with invalid IBAN', function() {
    var ext = iban.extractIBAN('BR970036030510009795493P1');
    it('valid should be false', function() {
      expect(ext.valid).to.be.false;
    });
    it('IBAN should be BR9700360305100019795493P1', function() {
      expect(ext.iban).to.equal('BR970036030510009795493P1');
    });
    it('BBAN should be undefined', function() {
      expect(ext.bban).to.be.undefined;
    });
    it('countryCode should be undefined', function() {
      expect(ext.countryCode).to.be.undefined;
    });
  });

  describe('When calling extractIBAN() with space separated IBAN', function() {
    var ext = iban.extractIBAN('NL91 ABNA 0417 1643 00');
    it('valid should be true', function() {
      expect(ext.valid).to.be.true;
    });

    it('IBAN should be NL91ABNA0417164300', function() {
      expect(ext.iban).to.equal('NL91ABNA0417164300');
    });

    it('BBAN should be ABNA0417164300', function() {
      expect(ext.bban).to.equal('ABNA0417164300');
    });
    it('countryCode should be NL', function() {
      expect(ext.countryCode).to.equal('NL');
    });
    it('accountNumber should be 0417164300', function() {
      expect(ext.accountNumber).to.equal('0417164300');
    });
  });

  describe('When calling extractIBAN() with valid Spanish IBAN', function() {
    var ext = iban.extractIBAN('ES6000491500051234567892');
    it('valid should be true', function() {
      expect(ext.valid).to.be.true;
    });
    it('IBAN should be ES6000491500051234567892', function() {
      expect(ext.iban).to.equal('ES6000491500051234567892');
    });
    it('BBAN should be 00491500051234567892', function() {
      expect(ext.bban).to.equal('00491500051234567892');
    });
    it('countryCode should be ES', function() {
      expect(ext.countryCode).to.equal('ES');
    });
    it('accountNumber should be 1234567892', function() {
      expect(ext.accountNumber).to.equal('1234567892');
    });
    it('bankIdentifier should be 0049', function() {
      expect(ext.bankIdentifier).to.equal('0049');
    });
    it('branchIdentifier should be 1500', function() {
      expect(ext.branchIdentifier).to.equal('1500');
    });
  });

  describe('When calling extractIBAN() with dash separated IBAN', function() {
    var ext = iban.extractIBAN('NL91-ABNA-0417-1643-00');

    it('valid should be true', function() {
      expect(ext.valid).to.be.true;
    });

    it('IBAN should be NL91ABNA0417164300', function() {
      expect(ext.iban).to.equal('NL91ABNA0417164300');
    });

    it('BBAN should be ABNA0417164300', function() {
      expect(ext.bban).to.equal('ABNA0417164300');
    });
    it('countryCode should be NL', function() {
      expect(ext.countryCode).to.equal('NL');
    });
  });

  describe('When calling electronicFormatIBAN()', function() {
    it('with valid Brazilian IBAN should return BR9700360305000010009795493P1', function() {
      expect(iban.electronicFormatIBAN('BR97 0036 0305 0000 1000 9795 493P 1')).to.equal(
        'BR9700360305000010009795493P1',
      );
    });
  });

  describe('When calling friendlyFormatIBAN()', function() {
    it('with valid badly formated Brazilian IBAN should return BR97 0036 0305 0000 1000 9795 493P 1', function() {
      expect(iban.friendlyFormatIBAN('BR97 0036-030500001000-9795493-P1')).to.equal(
        'BR97 0036 0305 0000 1000 9795 493P 1',
      );
    });
  });

  describe('When calling friendlyFormatIBAN() with - as separator', function() {
    it('with valid badly formated Brazilian IBAN should return BR97-0036-0305-0000-1000-9795-493P-1', function() {
      expect(iban.friendlyFormatIBAN('BR97 0036-030500001000-9795493-P1', '-')).to.equal(
        'BR97-0036-0305-0000-1000-9795-493P-1',
      );
    });
  });

  describe('When calling friendlyFormatIBAN() with invalid argument', function() {
    it('returns null when undefined is provided', function() {
      expect(iban.friendlyFormatIBAN(undefined)).to.be.null;
    });
    it('returns null when null is provided', function() {
      expect(iban.friendlyFormatIBAN(null)).to.be.null;
    });
    it('returns empty string when empty string is provided', function() {
      expect(iban.friendlyFormatIBAN('')).to.equal('');
    });
  });

  describe('Adding country specification allows us to use it', function() {
    it('Adds and uses country code XX', function() {
      iban.countrySpecs['XX'] = { chars: 24, bban_regexp: '^[0-9]{8}[A-Z0-9]{12}$', IBANRegistry: true };
      var ext = iban.getCountrySpecifications();
      expect(ext.XX.chars).to.equal(24);
      expect(ext.XX.bban_regexp).to.equal('^[0-9]{8}[A-Z0-9]{12}$');
      expect(ext.XX.IBANRegistry).to.be.true;
      expect(ext.XX.SEPA).to.be.false;
    });
  });

  describe('When calling getCountrySpecifications()', function() {
    var ext = iban.getCountrySpecifications();
    it('Country with code BE should return chars 16', function() {
      expect(ext.BE.chars).to.equal(16);
    });
    it('Country with code AF should return chars null', function() {
      expect(ext.AF.chars).to.be.null;
    });
    it('Country with code AL should return bban_regexp ^[0-9]{8}[A-Z0-9]{16}$', function() {
      expect(ext.AL.bban_regexp).to.equal('^[0-9]{8}[A-Z0-9]{16}$');
    });
    it('Country with code AF should return bban_regexp null', function() {
      expect(ext.AF.bban_regexp).to.be.null;
    });
    it('Country with code BA should return IBANRegistry true', function() {
      expect(ext.BA.IBANRegistry).to.be.true;
    });
    it('Country with code AO should return IBANRegistry false', function() {
      expect(ext.AO.IBANRegistry).to.be.false;
    });
    it('Country with code NL should return SEPA true', function() {
      expect(ext.NL.SEPA).to.be.true;
    });
    it('Country with code PK should return SEPA false', function() {
      expect(ext.PK.SEPA).to.be.false;
    });
    it('Country with code NO should have extra BBAN valication function', function() {
      expect(ext.NO.bban_validation_function).not.to.be.null;
    });
  });

  describe('Adding custom BBAN validation function', function() {
    it('with valid DE IBAN should return true', function() {
      iban.setCountryBBANValidation('DE', () => false);

      // This IBAN has been tested valid (see above).
      // After we changed the method, it should now be false
      expect(iban.isValidIBAN('DE89370400440532013000')).to.be.false;
    });
    it('Unknown country returns false', function() {
      expect(iban.setCountryBBANValidation('XY', () => true)).to.be.false;
    });
    it('Unknown country cannot be modified', function() {
      iban.setCountryBBANValidation('XY', () => true);
      const ext = iban.getCountrySpecifications();
      expect(ext.XY).to.be.undefined;
    });
  });

  describe('isQRIBAN', function() {
    it('should return true', function() {
      expect(iban.isQRIBAN('CH4431999123000889012')).to.be.true;
    });
    it('should return false', function() {
      expect(iban.isQRIBAN('NL50PSTB0000054322')).to.be.false;
    });
  });
});
