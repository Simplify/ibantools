# IBANTools

[![License](https://img.shields.io/badge/license-MPL%202.0-green.svg?dummy)](https://github.com/Simplify/ibantools/blob/master/LICENSE)

[![Bower version](https://badge.fury.io/bo/ibantools.svg)](https://badge.fury.io/bo/ibantools)
[![npm version](https://badge.fury.io/js/ibantools.svg)](https://badge.fury.io/js/ibantools)
[![devDependency Status](https://david-dm.org/simplify/ibantools/dev-status.svg)](https://david-dm.org/simplify/ibantools#info=devDependencies)
[![Dependency Status](https://david-dm.org/simplify/ibantools.svg)](https://david-dm.org/simplify/ibantools)

[![Build Status](https://travis-ci.org/Simplify/ibantools.svg?branch=master)](https://travis-ci.org/Simplify/ibantools)

IBANTools is JavaScript library for validation, creation and extraction of IBAN's.

For more information about IBAN see [wikipedia page](https://en.wikipedia.org/wiki/International_Bank_Account_Number).

## Installation and usage

### Node (Common JS ES5 and ES6)

```
$ npm install ibantools
```

### Bower (AMD ES6)

```
$ bower install ibantools
```

## Usage

### Node.js - CommonJS

```js
var ibantools = require('ibantools');
ibantools.isValidIBAN('NL91 ABNA 0517 1643 00');
```

### AMD - RequireJS - Browser

```js
require(["ibantools"], function(ibantools) {
  console.log(ibantools.isValidIBAN('NL91 ABNA 0517 1643 00'));
});
```

### Node.js - Common JS in browser

Use browserify or webpack.

### ES6

Use node, not bower module.

If you are using ES6-aware tools, like a [rollup](https://github.com/rollup/rollup) or [JSPM](http://jspm.io/), they will automatically select ES6 module from the package.

### With TypeScript

#### Typings (new way)

Include ibantools as dependency and run `typings install`.

#### TSD (old way)

Link definition file from the package:

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

## API

See [documentation](http://simplify.github.io/ibantools) with examples on Github pages.

## Contributing

* `npm install` and after `node node_modules/.bin/typings install` (or run `typings install` if you have typings installed globally).
* Write tests for your changes in `test/IBANToolsTest.ts`.
* Do not write more tests in `karma/ibantoolsSpec.js` unless module have problem with loading using AMD.
* Before making pull requests run `gulp all-with-tests`.
* Try not to make pull requests with changes in `dist`, `es6` or `build` directories.

## License

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/).
