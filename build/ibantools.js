/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";function isValidIBAN(e){if(void 0!==e&&null!==e){var a=electonicFormatIBAN(e),r=countrySpecs[a.slice(0,2)];if(void 0!==r&&r.chars===a.length&&checkFormatBBAN(a.slice(4),r.bban_regexp)&&1===mod9710(a))return!0}return!1}function composeIBAN(e){var a=electonicFormatIBAN(e.bban),r=countrySpecs[e.countryCode];if(void 0!==r&&r.chars===a.length+4&&checkFormatBBAN(a,r.bban_regexp)){var n=mod9710(e.countryCode+"00"+a);return e.countryCode+("0"+(98-n)).slice(-2)+a}return null}function extractIBAN(e){var a={};if(e=electonicFormatIBAN(e),isValidIBAN(e)){a.bban=e.slice(4),a.countryCode=e.slice(0,2);var r=countrySpecs[a.countryCode];a.countryName=r.name,a.valid=!0}else a.valid=!1;return a}function checkFormatBBAN(e,a){var r=new RegExp(a,"");return r.test(e)}function electonicFormatIBAN(e){return e.replace(/[^a-zA-Z0-9]/g,"").toUpperCase()}function friendlyFormatIBAN(e,a){return"undefined"==typeof a&&(a=" "),electonicFormatIBAN(e).replace(/(.{4})(?!$)/g,"$1"+a)}function mod9710(e){e=e.slice(3)+e.slice(0,4);for(var a="",r=1;r<e.length;r++){var n=e.charCodeAt(r);a+=n>=65?(n-55).toString():e[r]}for(;a.length>2;){var c=a.slice(0,6);a=(parseInt(c,10)%97).toString()+a.slice(c.length)}return parseInt(a,10)%97}function getCountrySpecs(){return countrySpecs}var countrySpecs={};exports.isValidIBAN=isValidIBAN,exports.composeIBAN=composeIBAN,exports.extractIBAN=extractIBAN,exports.electonicFormatIBAN=electonicFormatIBAN,exports.friendlyFormatIBAN=friendlyFormatIBAN,exports.getCountrySpecs=getCountrySpecs,countrySpecs.AL={chars:28,bban_regexp:"^[0-9]{8}[A-Z0-9]{16}$",name:"Albania"},countrySpecs.AD={chars:24,bban_regexp:"^[0-9]{8}[A-Z0-9]{12}$",name:"Andorra"},countrySpecs.AT={chars:20,bban_regexp:"^[0-9]{16}$",name:"Austria"},countrySpecs.AZ={chars:28,bban_regexp:"^[A-Z0-9]{4}[0-9]{20}$",name:"Azerbaijan"},countrySpecs.BH={chars:22,bban_regexp:"^[A-Z]{4}[A-Z0-9]{14}$",name:"Bahrain"},countrySpecs.BE={chars:16,bban_regexp:"^[0-9]{12}$",name:"Belgium"},countrySpecs.BA={chars:20,bban_regexp:"^[0-9]{16}$",name:"Bosnia and Herzegovina"},countrySpecs.BR={chars:29,bban_regexp:"^[0-9]{23}[A-Z]{1}[A-Z0-9]{1}$",name:"Brazil"},countrySpecs.BG={chars:22,bban_regexp:"^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$",name:"Bulgaria"},countrySpecs.CR={chars:21,bban_regexp:"^[0-9]{17}$",name:"Costa Rica"},countrySpecs.HR={chars:21,bban_regexp:"^[0-9]{17}$",name:"Croatia"},countrySpecs.CY={chars:28,bban_regexp:"^[0-9]{8}[A-Z0-9]{16}$",name:"Cyprus"},countrySpecs.CZ={chars:24,bban_regexp:"^[0-9]{20}$",name:"Czech Republic"},countrySpecs.DK={chars:18,bban_regexp:"^[0-9]{14}$",name:"Denmark"},countrySpecs.DO={chars:28,bban_regexp:"^[A-Z]{4}[0-9]{20}$",name:"Dominican Republic"},countrySpecs.TL={chars:23,bban_regexp:"^[0-9]{19}$",name:"East Timor"},countrySpecs.EE={chars:20,bban_regexp:"^[0-9]{16}$",name:"Estonia"},countrySpecs.FO={chars:18,bban_regexp:"^[0-9]{14}$",name:"Faroe Islands"},countrySpecs.FI={chars:18,bban_regexp:"^[0-9]{14}$",name:"Finland"},countrySpecs.FR={chars:27,bban_regexp:"^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",name:"France"},countrySpecs.GE={chars:22,bban_regexp:"^[A-Z0-9]{2}[0-9]{16}$",name:"Georgia (country)"},countrySpecs.DE={chars:22,bban_regexp:"^[0-9]{18}$",name:"Germany"},countrySpecs.GI={chars:23,bban_regexp:"^[A-Z]{4}[A-Z0-9]{15}$",name:"Gibraltar"},countrySpecs.GR={chars:27,bban_regexp:"^[0-9]{7}[A-Z0-9]{16}$",name:"Greece"},countrySpecs.GL={chars:18,bban_regexp:"^[0-9]{14}$",name:"Greenland"},countrySpecs.GT={chars:28,bban_regexp:"^[A-Z0-9]{4}[A-Z0-9]{20}$",name:"Guatemala"},countrySpecs.HU={chars:28,bban_regexp:"^[0-9]{24}$",name:"Hungary"},countrySpecs.IS={chars:26,bban_regexp:"^[0-9]{22}$",name:"Iceland"},countrySpecs.IE={chars:22,bban_regexp:"^[A-Z0-9]{4}[0-9]{14}$",name:"Republic of Ireland"},countrySpecs.IL={chars:23,bban_regexp:"^[0-9]{19}$",name:"Israel"},countrySpecs.IT={chars:27,bban_regexp:"^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",name:"Italy"},countrySpecs.JO={chars:30,bban_regexp:"^[A-Z]{4}[0-9]{22}$",name:"Jordan"},countrySpecs.KZ={chars:20,bban_regexp:"^[0-9]{3}[A-Z0-9]{13}$",name:"Kazakhstan"},countrySpecs.XK={chars:20,bban_regexp:"^[0-9]{4}[0-9]{10}[0-9]{2}$",name:"Kosovo"},countrySpecs.KW={chars:30,bban_regexp:"^[A-Z]{4}[A-Z0-9]{22}$",name:"Kuwait"},countrySpecs.LV={chars:21,bban_regexp:"^[A-Z]{4}[A-Z0-9]{13}$",name:"Latvia"},countrySpecs.LB={chars:28,bban_regexp:"^[0-9]{4}[A-Z0-9]{20}$",name:"Lebanon"},countrySpecs.LI={chars:21,bban_regexp:"^[0-9]{5}[A-Z0-9]{12}$",name:"Liechtenstein"},countrySpecs.LT={chars:20,bban_regexp:"^[0-9]{16}$",name:"Lithuania"},countrySpecs.LU={chars:20,bban_regexp:"^[0-9]{3}[A-Z0-9]{13}$",name:"Luxembourg"},countrySpecs.MK={chars:19,bban_regexp:"^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$",name:"Republic of Macedonia"},countrySpecs.MT={chars:31,bban_regexp:"^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$",name:"Malta"},countrySpecs.MR={chars:27,bban_regexp:"^[0-9]{23}$",name:"Mauritania"},countrySpecs.MU={chars:30,bban_regexp:"^[A-Z]{4}[0-9]{19}[A-Z]{3}$",name:"Mauritius"},countrySpecs.MC={chars:27,bban_regexp:"^[0-9]{10}[A-Z0-9]{11}[0-9]{2}$",name:"Monaco"},countrySpecs.MD={chars:24,bban_regexp:"^[A-Z0-9]{2}[A-Z0-9]{18}$",name:"Moldova"},countrySpecs.ME={chars:22,bban_regexp:"^[0-9]{18}$",name:"Montenegro"},countrySpecs.NL={chars:18,bban_regexp:"^[A-Z]{4}[0-9]{10}$",name:"Netherlands"},countrySpecs.NO={chars:15,bban_regexp:"^[0-9]{11}$",name:"Norway"},countrySpecs.PK={chars:24,bban_regexp:"^[A-Z0-9]{4}[0-9]{16}$",name:"Pakistan"},countrySpecs.PS={chars:29,bban_regexp:"^[A-Z0-9]{4}[0-9]{21}$",name:"Palestinian territories"},countrySpecs.PL={chars:28,bban_regexp:"^[0-9]{24}$",name:"Poland"},countrySpecs.PT={chars:25,bban_regexp:"^[0-9]{21}$",name:"Portugal"},countrySpecs.QA={chars:29,bban_regexp:"^[A-Z]{4}[A-Z0-9]{21}$",name:"Qatar"},countrySpecs.RO={chars:24,bban_regexp:"^[A-Z]{4}[A-Z0-9]{16}$",name:"Romania"},countrySpecs.SM={chars:27,bban_regexp:"^[A-Z]{1}[0-9]{10}[A-Z0-9]{12}$",name:"San Marino"},countrySpecs.SA={chars:24,bban_regexp:"^[0-9]{2}[A-Z0-9]{18}$",name:"Saudi Arabia"},countrySpecs.RS={chars:22,bban_regexp:"^[0-9]{18}$",name:"Serbia"},countrySpecs.SK={chars:24,bban_regexp:"^[0-9]{20}$",name:"Slovakia"},countrySpecs.SI={chars:19,bban_regexp:"^[0-9]{15}$",name:"Slovenia"},countrySpecs.ES={chars:24,bban_regexp:"^[0-9]{20}$",name:"Spain"},countrySpecs.SE={chars:24,bban_regexp:"^[0-9]{20}$",name:"Sweden"},countrySpecs.CH={chars:21,bban_regexp:"^[0-9]{5}[A-Z0-9]{12}$",name:"Switzerland"},countrySpecs.TN={chars:24,bban_regexp:"^[0-9]{20}$",name:"Tunisia"},countrySpecs.TR={chars:26,bban_regexp:"^[0-9]{5}[A-Z0-9]{17}$",name:"Turkey"},countrySpecs.AE={chars:23,bban_regexp:"^[0-9]{3}[0-9]{16}$",name:"United Arab Emirates"},countrySpecs.GB={chars:22,bban_regexp:"^[A-Z]{4}[0-9]{14}$",name:"United Kingdom"},countrySpecs.VG={chars:24,bban_regexp:"^[A-Z0-9]{4}[0-9]{16}$",name:"British Virgin Islands"};