const fs = require('fs');
const acorn = require('acorn');
const uglify = require('uglify-js');
const escodegen = require('escodegen');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Function to encode characters as \xNN or \uNNNN
const encodeChar = (char) => {
  const charCode = char.charCodeAt(0);
  if (charCode < 0x100) {
    return `\\x${charCode.toString(16).padStart(2, '0')}`;
  } else {
    return `\\u${charCode.toString(16).padStart(4, '0')}`;
  }
};

// Function to encode a string by converting each character to \xNN or \uNNNN
const encodeStringLiteral = (str) => {
  const x = JSON.stringify(str.split('').map(encodeChar));

  return x.replace(/\\/g, '');
};

function getRandomGreekCharSet() {
  const greekChars = 'αβγδεζηθικλμνξοπρστυφχψω';
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const combinedChars = greekChars + randomChars;
  let charSet = '';

  for (let i = 0; i < combinedChars.length; i++) {
    charSet += combinedChars.charAt(Math.floor(Math.random() * combinedChars.length));
  }

  return charSet;
}

// Custom encoding function using bitwise operations
const encodeString = (str, shift, plus) => {
  const encoded = [];
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    encoded.push((charCode << shift) | plus);
  }
  encoded.push(str.length);
  return encoded;
};

const newPlus = ~~(Math.random() * 31);
const newShift = ~~(Math.random() * 13);

console.log('plus', newPlus, 'shift', newShift);

const obfuscateFile = (inputFile, outputFile) => {
  const code = fs.readFileSync(inputFile, 'utf-8');
  const ast = acorn.parse(code, { ecmaVersion: 2020 });

  const PROPERTIES = [];
  const STRINGS = [];
  const propertyMap = new Map();
  const stringMap = new Map();

  // Traverse the AST and collect property names and string literals
  const traverse = (node) => {
    if (!node) return;

    if (Array.isArray(node))
      node.forEach(child => traverse(child));
    else if (typeof node === 'object') {
      Object.keys(node).forEach(key => {
        if (node.type === 'MemberExpression' && node.property.type === 'Identifier' && !node.computed) {
          const propertyName = node.property.name;
          if (!propertyMap.has(propertyName)) {
            const encodedProperty = encodeString(propertyName, newShift, newPlus);
            PROPERTIES.push(encodedProperty);
            propertyMap.set(propertyName, PROPERTIES.length - 1);
          }
          node.property = {
            type: 'MemberExpression',
            computed: true,
            object: {
              type: 'Identifier',
              name: '__ENCODED_PROPS__'
            },
            property: {
              type: 'Literal',
              value: propertyMap.get(propertyName),
              raw: propertyMap.get(propertyName).toString()
            }
          };
          node.computed = true;
        } else if (node.type === 'Literal' && typeof node.value === 'string' && node.value !== 'use strict') {
          const stringValue = node.value;
          if (!stringMap.has(stringValue)) {
            const encodedString = encodeString(stringValue, newShift, newPlus);
            STRINGS.push(encodedString);
            stringMap.set(stringValue, STRINGS.length - 1);
          }
          node.type = 'MemberExpression';
          node.computed = true;
          node.object = {
            type: 'Identifier',
            name: '__ENCODED_STRINGS__'
          };
          node.property = {
            type: 'Literal',
            value: stringMap.get(stringValue),
            raw: stringMap.get(stringValue).toString()
          };
        } else if (node.type === 'Property' && node.key.type === 'Literal' && typeof node.key.value === 'string') {
          // Handle computed property keys in object literals
          const propertyName = node.key.value;
          if (!propertyMap.has(propertyName)) {
            const encodedProperty = encodeString(propertyName, newShift, newPlus);
            PROPERTIES.push(encodedProperty);
            propertyMap.set(propertyName, PROPERTIES.length - 1);
          }
          node.key = {
            type: 'MemberExpression',
            computed: true,
            object: {
              type: 'Identifier',
              name: '__ENCODED_PROPS__'
            },
            property: {
              type: 'Literal',
              value: propertyMap.get(propertyName),
              raw: propertyMap.get(propertyName).toString()
            }
          };
          node.computed = true;
        } else if (node.type === 'Property' && node.value.type === 'Literal' && typeof node.value.value === 'string') {
          // Handle string values in object literals
          const stringValue = node.value.value;
          if (!stringMap.has(stringValue)) {
            const encodedString = encodeString(stringValue, newShift, newPlus);
            STRINGS.push(encodedString);
            stringMap.set(stringValue, STRINGS.length - 1);
          }
          node.value = {
            type: 'MemberExpression',
            computed: true,
            object: {
              type: 'Identifier',
              name: '__ENCODED_STRINGS__'
            },
            property: {
              type: 'Literal',
              value: stringMap.get(stringValue),
              raw: stringMap.get(stringValue).toString()
            }
          };
        }

        traverse(node[key]);
      });
    }
  };

  traverse(ast);

  // Generate the obfuscated code
  const obfuscatedCode = escodegen.generate(ast);

  const built = Date.now();
  const built_expire = built + 2592000000;
  // const built_expire = built + 10000;

  // Create the property and string array code with deobfuscation
  const propertyArrayCode = `
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

var __NOW__ = ${encodeStringLiteral('now')}.map(decodeEscapedString).join('');
var __EVAL__ = ${encodeStringLiteral('eval')}.map(decodeEscapedString).join('');
var __PUSH__ = ${encodeStringLiteral('push')}.map(decodeEscapedString).join('');
var __DATE__ = ${encodeStringLiteral('Date')}.map(decodeEscapedString).join('');
var __STRING__ = ${encodeStringLiteral('String')}.map(decodeEscapedString).join('');
var __LENGTH__ = ${encodeStringLiteral('length')}.map(decodeEscapedString).join('');
var __SETINT__ = ${encodeStringLiteral('setInterval')}.map(decodeEscapedString).join('');
var __DEBUGGER__ = ${encodeStringLiteral('debugger')}.map(decodeEscapedString).join('');
var __FROMCHARCODE__ = ${encodeStringLiteral('fromCharCode')}.map(decodeEscapedString).join('');

// DEAD CODE 1
var __BUILT__ = ${built};
var __BUILT_EXPIRY__ = ${built_expire};

function CHECK_BUILT() {
  var now = window[__DATE__][__NOW__]();

  if (now > __BUILT_EXPIRY__)
    throw 1;

  return true;
}

var udon;

try {
  udon = CHECK_BUILT();
} catch (e) {
  throw e
}

function __ANTI__DEBUG__() {
  return window[__EVAL__](__DEBUGGER__);
}
__ANTI__DEBUG__();
window[__SETINT__](__ANTI__DEBUG__, 500);

// DEAD CODE 2
var __TEST__ = [__NOW__, __DATE__, __STRING__, __LENGTH__, __FROMCHARCODE__];
var __TEST_GOOD__ = false;

for (var i = 0; i < __TEST__[__LENGTH__]; i++) {
  var j = __TEST__[i][__LENGTH__];
  for (var k = 0; k < j; k++) {
    if (k === j[__LENGTH__]) {
      k = 0;
      j = 0;
      i = 0;
      __TEST_GOOD__ = true;
      break;
    }
  }
}

// DEAD CODE 3
var m = [];

if (__TEST_GOOD__) {
  for (var i = 0; i < 200; i++) {
    m[i] = [];
    for (var j = 0; j < 100; j++) {
      m[i][__PUSH__](j);
    }
  }
}

var __ENCODED_PROPS__ = ${JSON.stringify(PROPERTIES)};
var __ENCODED_STRINGS__ = ${JSON.stringify(STRINGS)};

function DECODE(success, bytes) {
  if (!success)
    throw 2;

  var string = '';

  for (var j = 0; j < (bytes[__LENGTH__] - 1); j++)
    string += window[__STRING__][__FROMCHARCODE__]((bytes[j] ^ ${newPlus}) >> ${newShift});

  if (string[__LENGTH__] === bytes[bytes[__LENGTH__] - 1])
    return string;

  return null;
};

var PROPS_L = __ENCODED_PROPS__[__LENGTH__];
var STRINGS_L = __ENCODED_STRINGS__[__LENGTH__];

if (__ENCODED_PROPS__[__LENGTH__] !== PROPS_L || __ENCODED_STRINGS__[__LENGTH__] !== STRINGS_L)
  throw 2;

for (var i = 0; i < PROPS_L; i++) __ENCODED_PROPS__[i] = DECODE(udon, __ENCODED_PROPS__[i]);
for (var i = 0; i < STRINGS_L; i++) __ENCODED_STRINGS__[i] = DECODE(udon, __ENCODED_STRINGS__[i]);
`;

  let finalCode = uglify.minify(`function BOOTSTRAP(){${propertyArrayCode}${obfuscatedCode}}`, {
    mangle: {
      toplevel: true,
    },
    output: {
      ascii_only: true,
      keep_quoted_props: false,
    }
  });

  if (finalCode.error) {
    throw finalCode.error;
  }

  finalCode = finalCode.code;

  // Create the eval string
  const evalString = `// Enjoy decoding this, you idiot.\n// Build: ${built * 1000}\n\neval(${JSON.stringify(`(function WRAPPER(bootstrap){bootstrap();})(${finalCode});`)})`;

  // console.log(evalString);
  fs.writeFileSync(outputFile, evalString);

  // Encode as a char code
  // const chars = [];
  // const c_plus = ~~(Math.random() * 5) + 1;
  // const c_shift = ~~(Math.random() * 4) + 1;

  // for (let i = 0; i < evalString.length; i++) {
  //   const charCode = evalString.charCodeAt(i);
  //   chars.push((charCode << c_shift) | c_plus);
  // }
  // chars.push(evalString.length);
  
  // bootstrap();
//   const realFinalCode = `(function() {
//   var properties = [[101,118,97,108,4],[83,116,114,105,110,103,6],[108,101,110,103,116,104,6],[102,114,111,109,67,104,97,114,67,111,100,101,12]];

//   function decode_properties(array) {
//     if (!Array.isArray(array))
//       throw "u";

//     var i = 0;
//     var l = array.length;

//     for (; i < l; i++) {
//       var prop = array[i];
//       var prop_l = prop.length - 1;

//       var prop_i = 0;
//       var prop_s = '';

//       for (; prop_i < prop_l; prop_i++)
//         prop_s += String.fromCharCode(prop[prop_i]);

//       if (prop_l !== prop_s.length)
//         throw new ReferenceError('invalid length');

//       array[i] = prop_s;
//     }

//     return array;
//   }

//   properties = decode_properties(properties);

//   var bytes = ${JSON.stringify(chars)};

//   function decode_bytes(bytes) {
//     var string = '';
//     var length = bytes[properties[2]];
//     var real_length = bytes[properties[2]] - 1; 

//     for (var i = 0; i < length - 1; i++)
//       string += window[properties[1]][properties[3]]((bytes[i] ^ ${c_plus}) >> ${c_shift});

//     if (string[properties[2]] !== bytes[real_length])
//       throw new ReferenceError('invalid bytes length');

//     return string;
//   }

//   function bootstrap() {
//     if (!Array.isArray(bytes))
//       throw "u";

//     var code = decode_bytes(bytes);
//     window[properties[0]](code);
//   }

//   bootstrap();
// })();`;

//   // Write the eval string to the output file
//   const ugly = uglify.minify(realFinalCode, {
//     mangle: {
//       toplevel: true,
//     },
//     output: {
//       ascii_only: true,
//       keep_quoted_props: false,
//     }
//   })
//   if (ugly.error) {
//     throw new Error(ugly.error);
//   }

//   fs.writeFileSync(outputFile, realFinalCode);

  // const eval = [
  //   [],
  //   [],
  //   [],
  //   []
  // ];
  // ['e', 'v', 'a', 'l'].forEach(c => eval[0].push(c.charCodeAt(c)));
  // ['S', 't', 'r', 'i', 'n', 'g'].forEach(c => eval[1].push(c.charCodeAt(c)));
  // ['l', 'e', 'n', 'g', 't', 'h'].forEach(c => eval[2].push(c.charCodeAt(c)));
  // ['f', 'r', 'o', 'm', 'C', 'h', 'a', 'r', 'C', 'o', 'd', 'e'].forEach(c => eval[3].push(c.charCodeAt(c)));

  // console.log(JSON.stringify(eval));
};

obfuscateFile('source.js', 'result-source.jsx');