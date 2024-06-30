import { parse } from "acorn";
import { readFileSync, writeFileSync } from "fs";
import { generate } from 'escodegen';
import { minify } from 'terser';
import { DECODER_CHECKSUM_RANDOM, DECODER_SHIFT_1, DECODER_SHIFT_2, DECODER_TEMPLATE } from "./templates";
import { checksum, encodeChars as encodeString, generateAmethystVariations } from './utils';

import obfuscator from 'javascript-obfuscator';

console.log(DECODER_SHIFT_1, DECODER_SHIFT_2, DECODER_CHECKSUM_RANDOM);

interface ASTNode {
  type: string;
  [key: string]: any;
}

// ᐃΔΔΔᐃᐃᐃばれ
const underscoreIdentifiers = generateAmethystVariations('__ﱆﱆﱆﱆﱆﱆ_v_r_u_a_', 5000, 1, 19);

console.log(underscoreIdentifiers);

async function obfuscate(input: string, output: string) {
  const base = readFileSync(input, 'utf-8');

  const ast = parse(obfuscator.obfuscate(base, {
    // "compact": true,
    "selfDefending": true,
    // "disableConsoleOutput": true,
    "debugProtection": true,
    "debugProtectionInterval": 500,
    "splitStrings": true,
    "splitStringsChunkLength": 1,
    "splitStringsChunkLengthEnabled": true,
    "stringArray": true,
    "stringArrayRotate": true,
    "stringArrayRotateEnabled": true,
    "stringArrayShuffle": true,
    "stringArrayShuffleEnabled": true,
    "seed": Date.now() / 1000,
    "deadCodeInjectionThreshold": 0.5,
    "deadCodeInjection": true,
    "unicodeEscapeSequence": true,
    "target": "browser",
    // "stringArrayThreshold": 1,
    // "stringArrayThresholdEnabled": true,
    // "stringArrayIndexesType": ["hexadecimal-number"],
    // "stringArrayIndexShift": true,
    // "stringArrayCallsTransform": true,
    // "stringArrayCallsTransformThreshold": 1,
    // "stringArrayEncoding": ["rc4"],
    // "stringArrayEncodingEnabled": true,
    // "stringArrayWrappersCount": 1,
    // "stringArrayWrappersChainedCalls": true,
    // "stringArrayWrappersParametersMaxCount": 16,
    // "stringArrayWrappersType": "function",
    // "identifierNamesGenerator": "mangled",
    "identifierNamesGenerator": 'mangled-shuffled',
    "transformObjectKeys": true,
    "ignoreImports": false,
    "log": false,
    "sourceMapSourcesMode": "sources-content"
  }).getObfuscatedCode(), { ecmaVersion: 5 });

  const stringMap = new Map();
  const propertyMap = new Map();
  const numberMap = new Map();

  const STRINGS: number[][] = [];
  const PROPERTIES: number[][] = [];
  const NUMBERS: number[] = [];

  const traverse = (node: ASTNode | ASTNode[] | null) => {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach(child => traverse(child));
    } else if (typeof node === 'object') {
      Object.keys(node).forEach(key => {
        const childNode = node[key];

        if (node.type === 'MemberExpression' && node.property.type === 'Identifier' && !node.computed) {
          const propertyName = node.property.name;
          if (!propertyMap.has(propertyName)) {
            const encodedProperty = encodeString(propertyName, DECODER_SHIFT_1, DECODER_SHIFT_2);
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
              raw: propertyMap.get(propertyName)!.toString()
            }
          };
          node.computed = true;
        } else if (node.type === 'Literal' && typeof node.value === 'string' && node.value !== 'use strict') {
          const stringValue = node.value;
          if (!stringMap.has(stringValue)) {
            const encodedString = encodeString(stringValue, DECODER_SHIFT_1, DECODER_SHIFT_2);
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
            raw: stringMap.get(stringValue)!.toString()
          };
        } else if (node.type === 'Literal' && typeof node.value === 'number') {
          const numberValue = node.value;
          if (!numberMap.has(numberValue)) {
            NUMBERS.push(numberValue);
            numberMap.set(numberValue, NUMBERS.length - 1);
          }
          node.type = 'MemberExpression';
          node.computed = true;
          node.object = {
            type: 'Identifier',
            name: '__COMPUTED_NUMBERS__'
          };
          node.property = {
            type: 'Literal',
            value: numberMap.get(numberValue),
            raw: numberMap.get(numberValue)!.toString()
          };
        } else if (node.type === 'Property' && node.key.type === 'Literal' && typeof node.key.value === 'string') {
          // Handle computed property keys in object literals
          const propertyName = node.key.value;
          if (!propertyMap.has(propertyName)) {
            const encodedProperty = encodeString(propertyName, DECODER_SHIFT_1, DECODER_SHIFT_2);
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
              raw: propertyMap.get(propertyName)!.toString()
            }
          };
          node.computed = true;
        } else if (node.type === 'Property' && node.value.type === 'Literal' && typeof node.value.value === 'string') {
          // Handle string values in object literals
          const stringValue = node.value.value;
          if (!stringMap.has(stringValue)) {
            const encodedString = encodeString(stringValue, DECODER_SHIFT_1, DECODER_SHIFT_2);
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
              raw: stringMap.get(stringValue)!.toString()
            }
          };
        } else if (node.type === 'Property' && node.value.type === 'Literal' && typeof node.value.value === 'number') {
          // Handle number values in object literals
          const numberValue = node.value.value;
          if (!numberMap.has(numberValue)) {
            NUMBERS.push(numberValue);
            numberMap.set(numberValue, NUMBERS.length - 1);
          }
          node.value = {
            type: 'MemberExpression',
            computed: true,
            object: {
              type: 'Identifier',
              name: '__COMPUTED_NUMBERS__'
            },
            property: {
              type: 'Literal',
              value: numberMap.get(numberValue),
              raw: numberMap.get(numberValue)!.toString()
            }
          };
        }

        traverse(childNode);
      });
    }
  };

  traverse(ast);

  let obfuscated = generate(ast, {
    format: {
      hexadecimal: true,
    }
  });

  const built = Date.now();
  const built_expire = built + 259200000000;

  const computedChecksum = checksum(JSON.stringify(PROPERTIES) + JSON.stringify(STRINGS) + JSON.stringify(NUMBERS) + obfuscated);

  let bootstrap: any = await minify(`
    (function AMETHYST_BOOTSTRAP(checksum, random){
      ${DECODER_TEMPLATE(built, built_expire, computedChecksum, PROPERTIES, STRINGS, NUMBERS)}
      ${obfuscated}
    })(${computedChecksum}, ${DECODER_CHECKSUM_RANDOM});
    `,
    {
      mangle: true,
      compress: {
        loops: true,
        booleans: true,
        arguments: true,
        join_vars: true,
        hoist_props: true,
        hoist_funs: true,
        hoist_vars: true,
        keep_fnames: false,
        keep_infinity: true,
        // drop_console: true,
        collapse_vars: true,
        // unused: true,
        booleans_as_integers: true,
        conditionals: true,
        if_return: true,
      }
    });

  if (bootstrap.error) {
    throw bootstrap.error;
  }

  console.log(underscoreIdentifiers);

  bootstrap = bootstrap.code;

  // const evalx = await EVAL_TEMPLATE(bootstrap, computedChecksum, DECODER_CHECKSUM_RANDOM);
  writeFileSync(output, `/**
  * @copyright Amethyst
  * @license private (Personal Use License)
  * @compiled ${built} 
  **/

// AMETHYST_DATA_ACCESS: $machineId;$licenseKey;$game
window.__AMETHYST_COMPILED__ = true;(function AMETHYST_MODULE(){${obfuscator.obfuscate(bootstrap, {
    // "compact": true,
    "selfDefending": true,
    // "numbersToExpressions": false,
    "seed": Date.now() / 100,
    "unicodeEscapeSequence": true,
    // "splitStrings": true,
    // "splitStringsChunkLength": 1,
    // "splitStringsChunkLengthEnabled": true,
    // "stringArray": true,
    // "stringArrayRotate": true,
    // "stringArrayRotateEnabled": true,
    // "stringArrayShuffle": true,
    // "stringArrayShuffleEnabled": true,
    "target": "browser",
    "identifierNamesDictionary": underscoreIdentifiers,
    "identifiersDictionary": underscoreIdentifiers,
    "identifierNamesGenerator": "dictionary",
    "transformObjectKeys": true,
    "ignoreImports": false,
    "log": false,
    "sourceMapSourcesMode": "sources-content"
  }).getObfuscatedCode()}})();`);
}

obfuscate('./source.js', './test.js');
