# IBANTools

[![License MPL-2.0] (https://img.shields.io/badge/license-MPL%202.0-green.svg?dummy)](https://github.com/Simplify/ibantools/blob/master/LICENSE)

[![npm version](https://badge.fury.io/js/ibantools.svg)](https://badge.fury.io/js/ibantools)
[![devDependency Status](https://david-dm.org/simplify/ibantools/dev-status.svg)](https://david-dm.org/simplify/ibantools#info=devDependencies)
[![Dependency Status](https://david-dm.org/simplify/ibantools.svg)](https://david-dm.org/simplify/ibantools)



IBANTools is JavaScript library for validation, creation and extraction of IBAN's.

For more information about IBAN see [wikipedia page](https://en.wikipedia.org/wiki/International_Bank_Account_Number).

## Installation and usage

### Node

```
$ npm install ibantools
```

### Bower

```
$ bower install ibantools
```

## Usage

### Node - CommonJS

```js
var ibantools = require('ibantools');
ibantools.isValidIBAN('NL91 ABNA 0517 1643 00');
```

### AMD - RequireJS

```js
require(["ibantools"], function(ibantools) {
  console.log(ibantools.isValidIBAN('NL91 ABNA 0517 1643 00'));
});
```

### With TypeScript

If you are using `ibantools` with TypeScript, link definition file from the package:

```
$ tsd link
```

That will add link to `ibantools.d.ts` in your `typings/tsd.d.ts` file.

Use it in your `.ts` files:

```ts
/// <reference path="../typings/tsd.d.ts" /> 
import iban = require("ibantools");
console.log(iban.isValidIBAN("NL91 ABNA 0517 1643 00"));
```

### Note about TypeScript usage

After TypeScript 1.8 release (available now in typescript@next), It will be possible to directly use source `.ts` files from node packages, not only generated JavaScript files.
I'm planing to add original source file to both node and bower package after 1.8 release.
Mode info:

* [Github issue](https://github.com/Microsoft/TypeScript/issues/247)
* [Example](https://github.com/chanon/typescript_module_example)

## API

See [documentation](http://simplify.github.io/ibantools) with examples on Github pages.

## Contributing

* Write tests for your changes in `test/IBANToolsTest.ts`.
* Do not write more tests in `karma/ibantoolsSpec.js` unless module have problem with loading using AMD.
* Before making pull requests run `gulp all-with-tests`.
* Try not to make pull requests with changes in `dist` of `build` directories.

## License

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/).
