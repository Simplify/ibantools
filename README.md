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

### AMD - RequireJS - "Client side"

* Working on it...

## License

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at [http://mozilla.org/MPL/2.0/](http://mozilla.org/MPL/2.0/).

