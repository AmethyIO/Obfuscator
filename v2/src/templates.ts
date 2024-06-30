import { encodeStringLiteral, generateLogo, getRandomInt } from "./utils";

export const DECODER_SHIFT_1: number = getRandomInt(4, 12);
export const DECODER_SHIFT_2: number = getRandomInt(12, 24);
export const DECODER_CHECKSUM_RANDOM: number = getRandomInt(999, 99999);

export const DECODER_TEMPLATE = (built: number, built_expiry: number, checksum: number, props: number[][], strings: number[][], numbers: number[]): string => {
  const template = `
  var globalobj = window;

  var OK = false;

  var SHIFT_1 = ${DECODER_SHIFT_1};
  var SHIFT_2 = ${DECODER_SHIFT_2};

  var __ENCODED_PROPS__ = ${JSON.stringify(props)};
  var __ENCODED_STRINGS__ = ${JSON.stringify(strings)};
  var __COMPUTED_NUMBERS__ = ${JSON.stringify(numbers)};

  // Escaped strings decoder
  function decodeEscapedString(encodedStr) {
    return encodedStr.replace(/\\x([0-9A-Fa-f]{2})|\\u([0-9A-Fa-f]{4})/g, function (match, hex, unicode) {
      if (hex) {
        return String.fromCharCode(parseInt(hex, 16));
      } else if (unicode) {
        return String.fromCharCode(parseInt(unicode, 16));
      }
      return match;
    });
  }

  // Setup strings
  var __MAP__ = ${encodeStringLiteral('map')}.map(decodeEscapedString).join('');
  var __JOIN__ = ${encodeStringLiteral('join')}.map(decodeEscapedString).join(''); 

  // Built verification
  var __BUILT__ = ${built};
  var __BUILT_EXPIRY__ = ${built_expiry};

  // Setup strings v2
  var __NOW__ = ${encodeStringLiteral('now')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __DATE__ = ${encodeStringLiteral('Date')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __COMPILED__ = ${encodeStringLiteral('__AMETHYST_COMPILED__')}[__MAP__](decodeEscapedString)[__JOIN__]('');

  function BUILT_VERIFY() {
    var now = globalobj[__DATE__][__NOW__]();

    if (now > __BUILT_EXPIRY__)
      return false;

    return true;
  }

  // Checksum verification
  var __CHECKSUM__ = ${checksum + DECODER_CHECKSUM_RANDOM};

  function CHECKSUM_VERIFY() {
    if ((__CHECKSUM__ - random) === checksum)
      return true;

    return false;
  }

  function COMPILER_VERIFY() {
    return !!(__COMPILED__ in globalobj);
  }

  var BUILT_BOOL = BUILT_VERIFY();
  var CHECKSUM_BOOL = CHECKSUM_VERIFY();
  var COMPILER_BOOL = COMPILER_VERIFY();

  var __MAP__ = ${encodeStringLiteral('map')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __PUSH__ = ${encodeStringLiteral('push')}[__MAP__](decodeEscapedString)[__JOIN__]('');

  var __CEIL__ = ${encodeStringLiteral('ceil')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __RANDOM__ = ${encodeStringLiteral('random')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __LENGTH__ = ${encodeStringLiteral('length')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __ISARRAY__ = ${encodeStringLiteral('isArray')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __FROMCHARCODE__ = ${encodeStringLiteral('fromCharCode')}[__MAP__](decodeEscapedString)[__JOIN__]('');

  var __MATH__ = ${encodeStringLiteral('Math')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __ARRAY__ = ${encodeStringLiteral('Array')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __STRING__ = ${encodeStringLiteral('String')}[__MAP__](decodeEscapedString)[__JOIN__]('');

  var __EVAL__ = ${encodeStringLiteral('eval')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __DEBUGGER__ = ${encodeStringLiteral('debugger')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __ONUNLOAD__ = ${encodeStringLiteral('onunload')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __SETINTERVAL__ = ${encodeStringLiteral('setInterval')}[__MAP__](decodeEscapedString)[__JOIN__]('');
  var __CLEARINTERVAL__ = ${encodeStringLiteral('clearInterval')}[__MAP__](decodeEscapedString)[__JOIN__]('');

  function IS_EVERYTHING_OK() {
    return BUILT_BOOL && CHECKSUM_BOOL && COMPILER_BOOL;
  }

  OK = IS_EVERYTHING_OK();

  // Setup all dead code stuff etc.
  function SETUP_HELPERS() {
    // Deadcode1 method
    if (!OK) {
      console.log('nope');

      var dead1 = [];
      while (true) {
        dead1[__PUSH__]([...globalobj[__ARRAY__](2**32-1)][__MAP__](_=>globalobj[__MATH__][__CEIL__](globalobj[__MATH__][__RANDOM__]()*111)));
      }

      return dead1;
    }

    // Deadcode2 method
    var m = [];
    for (var i = 0; i < 100; i++) {
      if (i % 10 === 0) {
        m[i] = [];
        for (var j = 0; j < 100; j++) {
          m[i][__PUSH__](j);
        }
      }
    }

    // Anti-debugger
    var AD_INTERVAL = undefined;
    var AD_THRESHOLD = 500;

    function AD() {
      return globalobj[__EVAL__](__DEBUGGER__);
    }

    if (typeof AD_INTERVAL !== 'number') {
      AD();
      AD_INTERVAL = globalobj[__SETINTERVAL__](AD, AD_THRESHOLD);
    }

    function DESTROY_HELPERS() {
      if (typeof AD_INTERVAL === 'number') {
        globalobj[__CLEARINTERVAL__](AD_INTERVAL);
        AD_INTERVAL = undefined;
      }
    }

    globalobj[__ONUNLOAD__] = DESTROY_HELPERS;
  }

  function DECODE(bytes) {
    if (!OK) throw 1;

    var STRING = '';
    var REAL_LENGTH = bytes[bytes[__LENGTH__] - 1] - SHIFT_2;

    for (var index = 0; index < bytes[__LENGTH__] - 1; index++) {
      try {
        STRING += globalobj[__STRING__][__FROMCHARCODE__]((bytes[index] ^ SHIFT_2) >> SHIFT_1);
      } catch {
        throw 2;
      }
    }

    if (STRING[__LENGTH__] === REAL_LENGTH)
      return STRING;

    return null;
  }

  var PROPS_L = __ENCODED_PROPS__[__LENGTH__];
  var STRINGS_L = __ENCODED_STRINGS__[__LENGTH__];

  for (var i = 0; i < PROPS_L; i++) __ENCODED_PROPS__[i] = DECODE(__ENCODED_PROPS__[i]);
  for (var i = 0; i < STRINGS_L; i++) __ENCODED_STRINGS__[i] = DECODE(__ENCODED_STRINGS__[i]);

  SETUP_HELPERS();

  console.log(__ENCODED_PROPS__, __ENCODED_STRINGS__);
`;

  return template;
};

export const EVAL_TEMPLATE = async (code: string, checksum: number, random: number): Promise<string> => {
  const now = Date.now();

  const template = `/**
${await generateLogo()}

built at ${new Date(now).toISOString()} / ${now}
branch: production
*/

window.__AMETHYST_COMPILED__ = true;

eval(${JSON.stringify(
    `/**
  * @info Maybe instead deobfuscating the code you'll shall join our team?
  * Please do not share this script.
  * Sharing our script will result in banning your actual license.
  */

(function AMETHYST_WRAPPER(a,b,c){a(b,c)})(${code},${checksum},${random});`
  )});
`;

  return template;
};