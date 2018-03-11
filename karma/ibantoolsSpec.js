// Only need few tests. Basic idea is to test loading of AMD package, nothing else.
// All other tests are in test directory.

define(['dist/ibantools'], function(iban) {

	describe('IBANTools', function () {
		describe('When calling isValidIBAN()', function () {
			it('with valid IBAN should return true', function () {
				expect(iban.isValidIBAN('NL91ABNA0417164300')).toEqual(true);
			});
			it('with invalid IBAN should return false', function () {
				expect(iban.isValidIBAN('NL91ABNA0517164300')).toEqual(false);
			});
			it('with no IBAN should return false', function () {
				expect(iban.isValidIBAN(null)).toEqual(false);
			});
		});
	});

});
