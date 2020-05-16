/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as chai from "chai";
const expect = chai.expect;

import * as iban from "../build/ibantools";

describe("IBANTools", () => {
  describe("When calling isValidIBAN()", () => {
    it("with valid IBAN should return true", () => {
      expect(iban.isValidIBAN("NL91ABNA0417164300")).to.be.true;
    });
    it("with valid IBAN should return true", () => {
      expect(iban.isValidIBAN("NL91ABNA0417164300")).to.be.true;
    });
    it("with invalid IBAN should return false", () => {
      expect(iban.isValidIBAN("NL91ABNA0517164300")).to.be.false;
    });
    it("with no IBAN should return false", () => {
      expect(iban.isValidIBAN(null)).to.be.false;
    });
    it("with valid AT IBAN should return true", () => {
      expect(iban.isValidIBAN("AT611904300234573201")).to.be.true;
    });
    it("with valid BY IBAN should return true", () => {
      expect(iban.isValidIBAN("BY13NBRB3600900000002Z00AB00")).to.be.true;
    });
    it("with valid CR IBAN should return true", () => {
      expect(iban.isValidIBAN("CR25010200009074883572")).to.be.true;
    });
    it("with valid DE IBAN should return true", () => {
      expect(iban.isValidIBAN("DE89370400440532013000")).to.be.true;
    });
    it("with valid ES IBAN should return true", () => {
      expect(iban.isValidIBAN("ES9121000418450200051332")).to.be.true;
    });
    it("with valid GT IBAN should return true", () => {
      expect(iban.isValidIBAN("GT82TRAJ01020000001210029690")).to.be.true;
    });
    it("with valid HR IBAN should return true", () => {
      expect(iban.isValidIBAN("HR1210010051863000160")).to.be.true;
    });
    it("with valid IQ IBAN should return true", () => {
      expect(iban.isValidIBAN("IQ98NBIQ850123456789012")).to.be.true;
    });
    it("with valid IQ IBAN with space it should return false", () => {
      expect(iban.isValidIBAN("IQ98 NBIQ 8501 2345 6789 012")).to.be.false;
    });
    it("with valid JO IBAN should return true", () => {
      expect(iban.isValidIBAN("JO94CBJO0010000000000131000302")).to.be.true;
    });
    it("with valid PA IBAN should return true", () => {
      expect(iban.isValidIBAN("PS92PALS000000000400123456702")).to.be.true;
    });
    it("with valid RS IBAN should return true", () => {
      expect(iban.isValidIBAN("RS35260005601001611379")).to.be.true;
    });
    it("with valid SV IBAN should return true", () => {
      expect(iban.isValidIBAN("SV62CENR00000000000000700025")).to.be.true;
    });
    it("with valid TL IBAN should return true", () => {
      expect(iban.isValidIBAN("TL380080012345678910157")).to.be.true;
    });
    it("with valid GL IBAN should return true", () => {
      expect(iban.isValidIBAN("GL8964710001000206")).to.be.true;
    });
    it("with valid UA IBAN should return true", () => {
      expect(iban.isValidIBAN("UA213996220000026007233566001")).to.be.true;
    });
    it("with valid VA IBAN should return true", () => {
      expect(iban.isValidIBAN("VA59001123000012345678")).to.be.true;
    });
    it("with valid SV IBAN should return true", () => {
      expect(iban.isValidIBAN("SV62CENR00000000000000700025")).to.be.true;
    });
    it("with invalid RS IBAN should return false", () => {
      expect(iban.isValidIBAN("RS36260005601001611379")).to.be.false;
    });
    it("with invalid TL IBAN should return false", () => {
      expect(iban.isValidIBAN("TL380080012345688910157")).to.be.false;
    });
    it("with invalid GL IBAN should return false", () => {
      expect(iban.isValidIBAN("GL89647100010002067")).to.be.false;
    });
    it("with valid GB IBAN should return true", () => {
      expect(iban.isValidIBAN("GB29NWBK60161331926819")).to.be.true;
    });
    it("with invalid GB IBAN should return false", () => {
      expect(iban.isValidIBAN("GB2LABBY09012857201707")).to.be.false;
    });
    it("with invalid GB IBAN should return false", () => {
      expect(iban.isValidIBAN("GB00HLFX11016111455365")).to.be.false;
    });
    it("with valid Egypt IBAN should return true", () => {
      expect(iban.isValidIBAN("EG380019000500000000263180002")).to.be.true;
    });
    it("with valid Algeria IBAN should return true", () => {
      expect(iban.isValidIBAN("DZ3512341234123412341234")).to.be.true;
    });
    it("with valid Angola IBAN should return true", () => {
      expect(iban.isValidIBAN("AO44123412341234123412341")).to.be.true;
    });
    it("with valid Benin IBAN should return true", () => {
      expect(iban.isValidIBAN("BJ83A12312341234123412341234")).to.be.true;
    });
    it("with valid Burkina Faso IBAN should return true", () => {
      expect(iban.isValidIBAN("BF4512341234123412341234123")).to.be.true;
    });
    it("with valid Burundi IBAN should return true", () => {
      expect(iban.isValidIBAN("BI33123412341234")).to.be.true;
    });
    it("with valid Cape Verde IBAN should return true", () => {
      expect(iban.isValidIBAN("CM1512341234123412341234123")).to.be.true;
    });
    it("with valid Iran IBAN should return true", () => {
      expect(iban.isValidIBAN("IR081234123412341234123412")).to.be.true;
    });
    it("with valid Ivory Coast IBAN should return true", () => {
      expect(iban.isValidIBAN("CI77A12312341234123412341234")).to.be.true;
    });
    it("with valid Madagaskar IBAN should return true", () => {
      expect(iban.isValidIBAN("MG4012341234123412341234123")).to.be.true;
    });
    it("with valid Mali IBAN should return true", () => {
      expect(iban.isValidIBAN("ML75A12312341234123412341234")).to.be.true;
    });
    it("with valid Mozambique IBAN should return true", () => {
      expect(iban.isValidIBAN("MZ97123412341234123412341")).to.be.true;
    });
    it("with valid Senegal IBAN should return true", () => {
      expect(iban.isValidIBAN("SN15A12312341234123412341234")).to.be.true;
    });
    it("with valid Comoros IBAN should return true", () => {
      expect(iban.isValidIBAN("KM4600005000010010904400137")).to.be.true;
    });
    it("with valid Chad IBAN should return true", () => {
      expect(iban.isValidIBAN("TD8960002000010271091600153")).to.be.true;
    });
    it("with valid Congo IBAN should return true", () => {
      expect(iban.isValidIBAN("CG3930011000101013451300019")).to.be.true;
    });
    it("with valid Gabon IBAN should return true", () => {
      expect(iban.isValidIBAN("GA2140021010032001890020126")).to.be.true;
    });
    it("with valid Honduras IBAN should return true", () => {
      expect(iban.isValidIBAN("HN54PISA00000000000000123124")).to.be.true;
    });
    it("with valid Marocco IBAN should return true", () => {
      expect(iban.isValidIBAN("MA64011519000001205000534921")).to.be.true;
    });
    it("with valid Nicaragua IBAN should return true", () => {
      expect(iban.isValidIBAN("NI92BAMC000000000000000003123123")).to.be.true;
    });
    it("with valid Niger IBAN should return true", () => {
      expect(iban.isValidIBAN("NE58NE0380100100130305000268")).to.be.true;
    });
    it("with valid Togo IBAN should return true", () => {
      expect(iban.isValidIBAN("TG53TG0090604310346500400070")).to.be.true;
    });
    it("with valid Central African Republic IBAN should return true", () => {
      expect(iban.isValidIBAN("CF4220001000010120069700160")).to.be.true;
    });
    it("with valid Djibouti IBAN should return true", () => {
      expect(iban.isValidIBAN("DJ2110002010010409943020008")).to.be.true;
    });
    it("with valid Equatorial Guinea IBAN should return true", () => {
      expect(iban.isValidIBAN("GQ7050002001003715228190196")).to.be.true;
    });
    it("with valid Guinea-Bissau IBAN should return true", () => {
      expect(iban.isValidIBAN("GW04GW1430010181800637601")).to.be.true;
    });
  });

  describe("When calling isValidBIC()", function () {
    it("with valid BIC ABNANL2A should return true", function () {
      expect(iban.isValidBIC("ABNANL2A")).to.be.true;
    });
    it("with valid BIC ABNANL2A000 should return true", function () {
      expect(iban.isValidBIC("ABNANL2A000")).to.be.true;
    });
    it("with valid BIC ABNANL2AXXX should return true", function () {
      expect(iban.isValidBIC("ABNANL2AXXX")).to.be.true;
    });
    it("with valid BIC ABNAAA2AXXX should return true", function () {
      expect(iban.isValidBIC("ABNAAA2AXXX")).to.be.false;
    });
    it("with valid BIC NOLADE21KI should return true", function () {
      expect(iban.isValidBIC("NOLADE21KIE")).to.be.true;
    });
    it("with valid BIC INGDDEFFXXX should return true", function () {
      expect(iban.isValidBIC("INGDDEFFXXX")).to.be.true;
    });
    it("with invalid BIC INGDEFFXXX should return false", function () {
      expect(iban.isValidBIC("INGDEFFXXX")).to.be.false;
    });
    it("with invalid BIC ABN4NL2A should return false", function () {
      expect(iban.isValidBIC("ABN4NL2A")).to.be.false;
    });
    it("with invalid BIC ABNANL2A01F should return true", function () {
      expect(iban.isValidBIC("ABNANL2A01F")).to.be.true;
    });
  });

  describe("When calling isSEPACountry()", function () {
    it("with valid country code NL should return true", function () {
      expect(iban.isSEPACountry("NL")).to.be.true
    });
    it("with valid country code PK return false", function () {
      expect(iban.isSEPACountry("PK")).to.be.false;
    });
    it("with non valid country code XX return false", function () {
      expect(iban.isSEPACountry("XX")).to.be.false;
    });
  });

  describe("When calling extractBIC() with valid BIC ABNANL2A", function () {
    const ext = iban.extractBIC("ABNANL2A");
    it("valid should be true", () => {
      expect(ext.valid).to.be.true;
    });
    it("bankCode should be ABNA", () => {
      expect(ext.bankCode).to.equal("ABNA");
    });
    it("countryCode should be NL", () => {
      expect(ext.countryCode).to.equal("NL");
    });
    it("locationCode should be 2A", () => {
      expect(ext.locationCode).to.equal("2A");
    });
    it("testBIC should be false", () => {
      expect(ext.testBIC).to.be.false;
    });
    it("branchCode should be 619 (primary office)", () => {
      expect(ext.branchCode).to.equal("619");
    });
  });
  describe("When calling extractBIC() with lowwercase BIC dnbanokk", () => {
    const ext = iban.extractBIC("dnbanokk");
    it("countryCode should be NO", () => {
      expect(ext.countryCode).to.equal("NO");
    });
  });

  describe("When calling extractBIC() with invalid BIC ABN7NL2A", function () {
    const ext = iban.extractBIC("ABN7NL2A");
    it("valid should be false", () => {
      expect(ext.valid).to.be.false;
    });
    it("bankCode should be undefined", () => {
      expect(ext.bankCode).to.be.undefined;
    });
    it("countryCode should be undefined", () => {
      expect(ext.countryCode).to.be.undefined;
    });
    it("locationCode should be undefined", () => {
      expect(ext.locationCode).to.be.undefined;
    });
    it("testBIC should be undefined", () => {
      expect(ext.testBIC).to.be.undefined;
    });
    it("branchCode should be undefined", () => {
      expect(ext.branchCode).to.be.undefined;
    });
  });

  describe("When calling extractBIC() with valid BIC NEDSZAJ0XXX", function () {
    const ext = iban.extractBIC("NEDSZAJ0XXX");
    it("valid should be true", () => {
      expect(ext.valid).to.be.true;
    });
    it("bankCode should be NEDS", () => {
      expect(ext.bankCode).to.equal("NEDS");
    });
    it("countryCode should be ZA", () => {
      expect(ext.countryCode).to.equal("ZA");
    });
    it("locationCode should be J0", () => {
      expect(ext.locationCode).to.equal("J0");
    });
    it("testBIC should be true", () => {
      expect(ext.testBIC).to.be.true;
    });
    it("branchCode should be XXX", () => {
      expect(ext.branchCode).to.equal("XXX");
    });
  });

  describe("When calling isValidBBAN()", () => {
    it("with valid BBAN and valid country code should return true", () => {
      expect(iban.isValidBBAN("ABNA0417164300", "NL")).to.be.true;
    });
    it("with invalid BBAN and valid country code should return false", () => {
      expect(iban.isValidBBAN("A7NA0417164300", "NL")).to.be.false;
    });
    it("with valid BBAN and invalid country code should return false", () => {
      expect(iban.isValidBBAN("ABNA0417164300", "ZZ")).to.be.false;
    });
    it("with valid BBAN and no country code should return false", () => {
      expect(iban.isValidBBAN("ABNA0417164300", null)).to.be.false;
    });
  });

  describe("When calling composeIBAN()", () => {
    it("with valid country code and valid BBAN should return NL91ABNA0417164300", () => {
      expect(
        iban.composeIBAN({ countryCode: "NL", bban: "ABNA0417164300" })
      ).to.equal("NL91ABNA0417164300");
    });
    it("with invalid country code and valid BBAN should return null", () => {
      expect(iban.composeIBAN({ countryCode: "ZZ", bban: "ABNA0417164300" })).to
        .be.null;
    });
    it("with valid country code and invalid BBAN (non-alpha character) should return null", () => {
      expect(iban.composeIBAN({ countryCode: "NL", bban: "A7NA0417164300" })).to
        .be.null;
    });
    it("with valid country code and invalid BBAN (non-numeric character) should return null", () => {
      expect(iban.composeIBAN({ countryCode: "NL", bban: "ABNA04171Z4300" })).to
        .be.null;
    });
    it("with valid country code and invalid BBAN (character count wrong) should return null", () => {
      expect(iban.composeIBAN({ countryCode: "NL", bban: "ABNA04171643000" }))
        .to.be.null;
    });
    it("with valid country code and no BBAN should return null", () => {
      expect(iban.composeIBAN({ countryCode: "NL", bban: null })).to.be.null;
    });
  });

  describe("When calling extractIBAN() with valid Brazilian IBAN", () => {
    const ext = iban.extractIBAN("BR9700360305000010009795493P1");
    it("valid should be true", () => {
      expect(ext.valid).to.be.true;
    });
    it("IBAN should be BR9700360305000010009795493P1", () => {
      expect(ext.iban).to.equal("BR9700360305000010009795493P1");
    });
    it("BBAN should be 00360305000010009795493P1", () => {
      expect(ext.bban).to.equal("00360305000010009795493P1");
    });
    it("countryCode should be BR", () => {
      expect(ext.countryCode).to.equal("BR");
    });
  });

  describe("When calling extractIBAN() with invalid IBAN", () => {
    const ext = iban.extractIBAN("BR970036030510009795493P1");
    it("valid should be false", () => {
      expect(ext.valid).to.be.false;
    });
    it("IBAN should be BR9700360305100019795493P1", () => {
      expect(ext.iban).to.equal("BR970036030510009795493P1");
    });
    it("BBAN should be undefined", () => {
      expect(ext.bban).to.be.undefined;
    });
    it("countryCode should be undefined", () => {
      expect(ext.countryCode).to.be.undefined;
    });
  });

  describe("When calling electronicFormatIBAN()", () => {
    it("with valid Brazilian IBAN should return BR9700360305000010009795493P1", () => {
      expect(
        iban.electronicFormatIBAN("BR97 0036 0305 0000 1000 9795 493P 1")
      ).to.equal("BR9700360305000010009795493P1");
    });
  });

  describe("When calling friendlyFormatIBAN()", () => {
    it("with valid badly formated Brazilian IBAN should return BR97 0036 0305 0000 1000 9795 493P 1", () => {
      expect(
        iban.friendlyFormatIBAN("BR97 0036-030500001000-9795493-P1")
      ).to.equal("BR97 0036 0305 0000 1000 9795 493P 1");
    });
  });

  describe("When calling friendlyFormatIBAN() with - as separator", () => {
    it("with valid badly formated Brazilian IBAN should return BR97-0036-0305-0000-1000-9795-493P-1", () => {
      expect(
        iban.friendlyFormatIBAN("BR97 0036-030500001000-9795493-P1", "-")
      ).to.equal("BR97-0036-0305-0000-1000-9795-493P-1");
    });
  });

  describe("When calling friendlyFormatIBAN() with invalid argument", () => {
    it("returns null when undefined is provided", () => {
      expect(iban.friendlyFormatIBAN(undefined)).to.be.null;
    });
    it("returns null when null is provided", () => {
      expect(iban.friendlyFormatIBAN(null)).to.be.null;
    });
  });

  describe("When calling getCountrySpecifications()", () => {
    const ext = iban.getCountrySpecifications();
    it("Country with code BA should return IBANRegistry true", () => {
      expect(ext.BA.IBANRegistry).to.be.true;
    });
    it("Country with code BE should return chars 16", () => {
      expect(ext.BE.chars).to.equal(16);
    });
    it("Country with code AL should return bban_regexp ^[0-9]{8}[A-Z0-9]{16}$", () => {
      expect(ext.AL.bban_regexp).to.equal("^[0-9]{8}[A-Z0-9]{16}$");
    });
  });
});
