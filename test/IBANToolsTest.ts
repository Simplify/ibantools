/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../src/IBANTools.ts" />

import chai = require('chai');
var expect = chai.expect;

import IBANTools from '../src/IBANTools';

describe('IBANTools', () => {

  describe('When initialized with empty object', () => {
		var subject = new IBANTools({});
	  it('isValid() should return false', () => {
			expect(subject.isValid()).to.be.false;
		});
	  it('getBBAN() should return null', () => {
			expect(subject.getBBAN()).to.be.null;
		});
	  it('getIBAN() should return null', () => {
			expect(subject.getIBAN()).to.be.null;
		});
	  it('getCountryCode() should return null', () => {
			expect(subject.getCountryCode()).to.be.null;
		});
	  it('getCountryName() should return null', () => {
			expect(subject.getCountryName()).to.be.null;
		});
	});

	describe('When initialized with null IBAN', () => {
		var subject = new IBANTools({iban: null});
	  it('isValid() should return false', () => {
			expect(subject.isValid()).to.be.false;
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

  describe('When initialized with invalid Dutch IBAN', () => {
		var subject = new IBANTools({iban: 'NL92 ABNA 0417 1643 00'});
	  it('isValid() should return false', () => {
			expect(subject.isValid()).to.be.false;
		});
	  it('getBBAN() should return null', () => {
			expect(subject.getBBAN()).to.be.null;
		});
	  it('getIBAN() should return null', () => {
			expect(subject.getIBAN()).to.be.null;
		});
	});
  describe('When initialized with valid Macedonian IBAN', () => {
		var subject = new IBANTools({iban: 'MK07 2501 2000 0058 984'});
	  it('isValid() should return true', () => {
			expect(subject.isValid()).to.be.true;
		});
	});
  describe('When initialized with valid Brasilian IBAN', () => {
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

});