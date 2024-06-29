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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const newPlus = getRandomInt(4, 12);
const newShift = getRandomInt(12, 24);

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

// DEAD CODE/SELF-DEFEND 0
var __CHECKSUM__ = ${checksum(JSON.stringify(PROPERTIES) + JSON.stringify(STRINGS) + obfuscatedCode) };
var __REALCHECK__ = checksum >> 2;
if (__CHECKSUM__ !== __REALCHECK__) {
  var crazy = [];

  while(true) {
    crazy = [...Array(2**32-1)].map(_=>Math.ceil(Math.random()*111));
  }

  return crazy;
}

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

  let finalCode = uglify.minify(`function BOOTSTRAP(checksum){${propertyArrayCode}${obfuscatedCode}}`, {
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
  const evalString = `// Enjoy decoding this, you idiot.
// Build: ${built * 1000}

eval(${JSON.stringify(`(function WRAPPER(a,b){a(b);})(${finalCode},${checksum(JSON.stringify(PROPERTIES) + JSON.stringify(STRINGS) + obfuscatedCode) << 2});`)});
`;

  // console.log(evalString);
  fs.writeFileSync(outputFile, evalString);
};

function checksum(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }

  console.log(hash);
  return hash;
}

obfuscateFile('source.js', 'result-source.jsx');
