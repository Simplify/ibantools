'use strict';

import { expect } from 'chai';
import { createRequire } from 'node:module';
import { electronicFormatIBAN, isValidIBAN } from 'ibantools';

describe('IBANTools package entrypoints', function() {
  it('resolves named ESM exports from package root', function() {
    expect(electronicFormatIBAN('nl91 abna 0417 1643 00')).to.equal('NL91ABNA0417164300');
    expect(isValidIBAN('NL91ABNA0417164300')).to.equal(true);
  });

  it('keeps CommonJS require working from package root', function() {
    const cjs = createRequire(import.meta.url)('ibantools');

    expect(cjs.electronicFormatIBAN('nl91-abna-0417-1643-00')).to.equal('NL91ABNA0417164300');
    expect(cjs.isValidIBAN('NL91ABNA0417164300')).to.equal(true);
  });
});
