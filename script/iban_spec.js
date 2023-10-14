/*!
 * @license
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export const autogeneratedCountrySpecs = {
  AD: {
    chars: 24,
    bban_regexp: '^[0-9]{4}[0-9]{4}[A-Z0-9]{12}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '4-7',
    bank_identifier: '0-3',
    account_indentifier: '8-24',
  },
  AE: {
    chars: 23,
    bban_regexp: '^[0-9]{3}[0-9]{16}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-2',
    account_indentifier: '7-23',
  },
  AL: {
    chars: 28,
    bban_regexp: '^[0-9]{8}[A-Z0-9]{16}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '3-7',
    bank_identifier: '0-2',
    account_indentifier: '12-28',
  },
  AT: {
    chars: 20,
    bban_regexp: '^[0-9]{5}[0-9]{11}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-4',
  },
  AZ: {
    chars: 28,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{20}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '4-28',
  },
  BA: {
    chars: 20,
    bban_regexp: '^[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '3-5',
    bank_identifier: '0-2',
  },
  BE: {
    chars: 16,
    bban_regexp: '^[0-9]{3}[0-9]{7}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-2',
    account_indentifier: '0-16',
  },
  BG: {
    chars: 22,
    bban_regexp: '^[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '4-7',
    bank_identifier: '0-3',
  },
  BH: {
    chars: 22,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{14}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '8-22',
  },
  BI: {
    chars: 27,
    bban_regexp: '^[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '5-9',
    bank_identifier: '0-4',
    account_indentifier: '14-27',
  },
  BR: {
    chars: 29,
    bban_regexp: '^[0-9]{8}[0-9]{5}[0-9]{10}[A-Z]{1}[A-Z0-9]{1}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '8-12',
    bank_identifier: '0-7',
    account_indentifier: '17-29',
  },
  BY: {
    chars: 28,
    bban_regexp: '^[A-Z0-9]{4}[0-9]{4}[A-Z0-9]{16}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
  },
  CH: {
    chars: 21,
    bban_regexp: '^[0-9]{5}[A-Z0-9]{12}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-4',
  },
  CR: {
    chars: 22,
    bban_regexp: '^[0-9]{4}[0-9]{14}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '8-22',
  },
  CY: {
    chars: 28,
    bban_regexp: '^[0-9]{3}[0-9]{5}[A-Z0-9]{16}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '3-7',
    bank_identifier: '0-2',
    account_indentifier: '12-28',
  },
  CZ: {
    chars: 24,
    bban_regexp: '^[0-9]{4}[0-9]{6}[0-9]{10}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-3',
  },
  DE: {
    chars: 22,
    bban_regexp: '^[0-9]{8}[0-9]{10}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-7',
    account_indentifier: '13-22',
  },
  DJ: {
    chars: 27,
    bban_regexp: '^[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '5-9',
    bank_identifier: '0-4',
    account_indentifier: '14-27',
  },
  DK: {
    chars: 18,
    bban_regexp: '^[0-9]{4}[0-9]{9}[0-9]{1}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-3',
    account_indentifier: '4-18',
  },
  DO: {
    chars: 28,
    bban_regexp: '^[A-Z0-9]{4}[0-9]{20}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '8-28',
  },
  EE: {
    chars: 20,
    bban_regexp: '^[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-1',
    account_indentifier: '8-20',
  },
  EG: {
    chars: 29,
    bban_regexp: '^[0-9]{4}[0-9]{4}[0-9]{17}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '4-7',
    bank_identifier: '0-3',
    account_indentifier: '17-29',
  },
  ES: {
    chars: 24,
    bban_regexp: '^[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '4-7',
    bank_identifier: '0-3',
    account_indentifier: '4-24',
  },
  FI: {
    chars: 18,
    bban_regexp: '^[0-9]{3}[0-9]{11}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-2',
    account_indentifier: '0-0',
  },
  FK: {
    chars: 18,
    bban_regexp: '^[A-Z]{2}[0-9]{12}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-1',
    account_indentifier: '6-18',
  },
  FO: {
    chars: 18,
    bban_regexp: '^[0-9]{4}[0-9]{9}[0-9]{1}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '4-18',
  },
  FR: {
    chars: 27,
    bban_regexp: '^[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-4',
    account_indentifier: '4-27',
  },
  GB: {
    chars: 22,
    bban_regexp: '^[A-Z]{4}[0-9]{6}[0-9]{8}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '4-9',
    bank_identifier: '0-3',
  },
  GE: {
    chars: 22,
    bban_regexp: '^[A-Z]{2}[0-9]{16}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-1',
    account_indentifier: '6-22',
  },
  GI: {
    chars: 23,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{15}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-3',
    account_indentifier: '8-23',
  },
  GL: {
    chars: 18,
    bban_regexp: '^[0-9]{4}[0-9]{9}[0-9]{1}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '4-18',
  },
  GR: {
    chars: 27,
    bban_regexp: '^[0-9]{3}[0-9]{4}[A-Z0-9]{16}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '3-6',
    bank_identifier: '0-2',
    account_indentifier: '7-27',
  },
  GT: {
    chars: 28,
    bban_regexp: '^[A-Z0-9]{4}[A-Z0-9]{20}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '8-28',
  },
  HR: {
    chars: 21,
    bban_regexp: '^[0-9]{7}[0-9]{10}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-6',
  },
  HU: {
    chars: 28,
    bban_regexp: '^[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '3-6',
    bank_identifier: '0-2',
  },
  IE: {
    chars: 22,
    bban_regexp: '^[A-Z]{4}[0-9]{6}[0-9]{8}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '4-9',
    bank_identifier: '0-3',
  },
  IL: {
    chars: 23,
    bban_regexp: '^[0-9]{3}[0-9]{3}[0-9]{13}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '3-5',
    bank_identifier: '0-2',
  },
  IQ: {
    chars: 23,
    bban_regexp: '^[A-Z]{4}[0-9]{3}[0-9]{12}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '4-6',
    bank_identifier: '0-3',
    account_indentifier: '11-23',
  },
  IS: {
    chars: 26,
    bban_regexp: '^[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '2-3',
    bank_identifier: '0-1',
  },
  IT: {
    chars: 27,
    bban_regexp: '^[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '6-10',
    bank_identifier: '1-5',
    account_indentifier: '4-27',
  },
  JO: {
    chars: 30,
    bban_regexp: '^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '4-7',
    bank_identifier: '4-7',
  },
  KW: {
    chars: 30,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{22}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '20-30',
  },
  KZ: {
    chars: 20,
    bban_regexp: '^[0-9]{3}[A-Z0-9]{13}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-2',
    account_indentifier: '0-20',
  },
  LB: {
    chars: 28,
    bban_regexp: '^[0-9]{4}[A-Z0-9]{20}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '14-28',
  },
  LC: {
    chars: 32,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{24}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '8-32',
  },
  LI: {
    chars: 21,
    bban_regexp: '^[0-9]{5}[A-Z0-9]{12}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-4',
  },
  LT: {
    chars: 20,
    bban_regexp: '^[0-9]{5}[0-9]{11}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-4',
  },
  LU: {
    chars: 20,
    bban_regexp: '^[0-9]{3}[A-Z0-9]{13}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-2',
  },
  LV: {
    chars: 21,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{13}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-3',
    account_indentifier: '0-21',
  },
  LY: {
    chars: 25,
    bban_regexp: '^[0-9]{3}[0-9]{3}[0-9]{15}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '3-5',
    bank_identifier: '0-2',
    account_indentifier: '10-25',
  },
  MC: {
    chars: 27,
    bban_regexp: '^[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '5-9',
    bank_identifier: '0-4',
  },
  MD: {
    chars: 24,
    bban_regexp: '^[A-Z0-9]{2}[A-Z0-9]{18}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-1',
    account_indentifier: '6-24',
  },
  ME: {
    chars: 22,
    bban_regexp: '^[0-9]{3}[0-9]{13}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-2',
    account_indentifier: '4-22',
  },
  MK: {
    chars: 19,
    bban_regexp: '^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-2',
  },
  MN: {
    chars: 20,
    bban_regexp: '^[0-9]{4}[0-9]{12}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '8-20',
  },
  MR: {
    chars: 27,
    bban_regexp: '^[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '5-9',
    bank_identifier: '0-4',
    account_indentifier: '4-27',
  },
  MT: {
    chars: 31,
    bban_regexp: '^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '4-8',
    bank_identifier: '0-3',
    account_indentifier: '15-31',
  },
  MU: {
    chars: 30,
    bban_regexp: '^[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '6-7',
    bank_identifier: '0-5',
    account_indentifier: '0-30',
  },
  NI: {
    chars: 28,
    bban_regexp: '^[A-Z]{4}[0-9]{20}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '8-28',
  },
  NL: {
    chars: 18,
    bban_regexp: '^[A-Z]{4}[0-9]{10}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-3',
    account_indentifier: '8-18',
  },
  NO: {
    chars: 15,
    bban_regexp: '^[0-9]{4}[0-9]{6}[0-9]{1}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-3',
    account_indentifier: '4-15',
  },
  PK: {
    chars: 24,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{16}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
  },
  PL: {
    chars: 28,
    bban_regexp: '^[0-9]{8}[0-9]{16}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '0-7',
    account_indentifier: '2-28',
  },
  PS: {
    chars: 29,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{21}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '17-29',
  },
  PT: {
    chars: 25,
    bban_regexp: '^[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-3',
  },
  QA: {
    chars: 29,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{21}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-3',
    account_indentifier: '8-29',
  },
  RO: {
    chars: 24,
    bban_regexp: '^[A-Z]{4}[A-Z0-9]{16}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-3',
    account_indentifier: '0-24',
  },
  RS: {
    chars: 22,
    bban_regexp: '^[0-9]{3}[0-9]{13}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-2',
  },
  RU: {
    chars: 33,
    bban_regexp: '^[0-9]{9}[0-9]{5}[A-Z0-9]{15}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '9-13',
    bank_identifier: '0-8',
    account_indentifier: '13-33',
  },
  SA: {
    chars: 24,
    bban_regexp: '^[0-9]{2}[A-Z0-9]{18}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-1',
    account_indentifier: '12-24',
  },
  SC: {
    chars: 31,
    bban_regexp: '^[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{16}[A-Z]{3}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '6-7',
    bank_identifier: '0-5',
    account_indentifier: '12-28',
  },
  SD: {
    chars: 18,
    bban_regexp: '^[0-9]{2}[0-9]{12}$',
    IBANRegistry: true,
    SEPA: false,
    bank_identifier: '0-1',
    account_indentifier: '6-18',
  },
  SE: {
    chars: 24,
    bban_regexp: '^[0-9]{3}[0-9]{16}[0-9]{1}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '0-2',
  },
  SI: {
    chars: 19,
    bban_regexp: '^[0-9]{5}[0-9]{8}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: true,
    bank_identifier: '-1-4',
    account_indentifier: '4-19',
  },
  SK: {
    chars: 24,
    bban_regexp: '^[0-9]{4}[0-9]{6}[0-9]{10}$',
    IBANRegistry: true,
    SEPA: true,
  },
  SM: {
    chars: 27,
    bban_regexp: '^[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}$',
    IBANRegistry: true,
    SEPA: true,
    branch_indentifier: '6-10',
  },
  SO: {
    chars: 23,
    bban_regexp: '^[0-9]{4}[0-9]{3}[0-9]{12}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '4-6',
    account_indentifier: '11-23',
  },
  ST: {
    chars: 25,
    bban_regexp: '^[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '4-7',
  },
  SV: {
    chars: 28,
    bban_regexp: '^[A-Z]{4}[0-9]{20}$',
    IBANRegistry: true,
    SEPA: false,
    account_indentifier: '8-28',
  },
  TL: {
    chars: 23,
    bban_regexp: '^[0-9]{3}[0-9]{14}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    account_indentifier: '4-23',
  },
  TN: {
    chars: 24,
    bban_regexp: '^[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '2-4',
    account_indentifier: '4-24',
  },
  TR: {
    chars: 26,
    bban_regexp: '^[0-9]{5}[0-9]{1}[A-Z0-9]{16}$',
    IBANRegistry: true,
    SEPA: false,
    account_indentifier: '0-0',
  },
  UA: {
    chars: 29,
    bban_regexp: '^[0-9]{6}[A-Z0-9]{19}$',
    IBANRegistry: true,
    SEPA: false,
    account_indentifier: '15-29',
  },
  VA: {
    chars: 22,
    bban_regexp: '^[0-9]{3}[0-9]{15}$',
    IBANRegistry: true,
    SEPA: true,
    account_indentifier: '7-22',
  },
  VG: {
    chars: 24,
    bban_regexp: '^[A-Z]{4}[0-9]{16}$',
    IBANRegistry: true,
    SEPA: false,
    account_indentifier: '8-24',
  },
  XK: {
    chars: 20,
    bban_regexp: '^[0-9]{4}[0-9]{10}[0-9]{2}$',
    IBANRegistry: true,
    SEPA: false,
    branch_indentifier: '2-3',
    account_indentifier: '4-20',
  },
};
