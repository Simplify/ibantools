# IBANTools

[![License MPL-2.0] (https://img.shields.io/badge/license-MPL%202.0-green.svg?dummy)](https://github.com/Simplify/ibantools/blob/master/LICENSE)

IBANTools is JavaScript library for validation or creation of IBAN's.

For more information about IBAN see [wikipedia page](https://en.wikipedia.org/wiki/International_Bank_Account_Number).

## Installation and usage

### Node

#### Installation

```
$ npm install iban-tools
```

#### Usage

```js
var ibantools = require('IBANTools');
ibantools.isValidIBAN('NL91 ABNA 0517 1643 00');
```

#### With TypeScript

If you are using IBANTools with TypeScript, link definition file from the package:

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

### AMD - RequireJS - "Client side"

* Working on it...



## Note about TypeScript

After TypeScript 1.8 release (now in typescript@next), It will be possible to directly use source `.ts` files from node packages, not only generated JavaScript files.
I'm planing to add original source file to both node and bower package after 1.8 release.
Mode info:

* [Github issue](https://github.com/Microsoft/TypeScript/issues/247)
* [Example](https://github.com/chanon/typescript_module_example)

## License

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/).
