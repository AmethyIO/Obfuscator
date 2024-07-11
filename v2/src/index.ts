import { parse } from "acorn";
import { readFileSync, writeFileSync } from "fs";
import { generate } from 'escodegen';
import { minify as terserMinify } from 'terser';
// import { minify } from "uglify-js";

import minify from '@node-minify/core';
import gcc from '@node-minify/google-closure-compiler';

import { DECODER_CHECKSUM_RANDOM, DECODER_SHIFT_1, DECODER_SHIFT_2, DECODER_TEMPLATE } from "./templates";
import { checksum, containsSpecialUnicodeOrEmoji, encodeChars as encodeString, generateVariations } from './utils';

import obfuscator from 'javascript-obfuscator';

interface ASTNode {
  type: string;
  [key: string]: any;
}

// ᐃΔΔΔᐃᐃᐃばれ
// const underscoreIdentifiers = generateAmethystVariations('__ﱆﱆﱆﱆﱆﱆ_v_r_u_a_', 5000, 1, 19);
// const underscoreIdentifiers = generateVariations('$_$_Δ_ᐃ_ﱆﱆﱆﱆﱆﱆ', 5000, 1, 26);
const underscoreIdentifiers = generateVariations('____$_L', 5000, 3, 16);

console.log(underscoreIdentifiers);

console.log(DECODER_SHIFT_1, DECODER_SHIFT_2, DECODER_CHECKSUM_RANDOM);

async function obfuscate(input: string, output: string) {
  const base = readFileSync(input, 'utf-8');

  // const ast = parse(base, { ecmaVersion: 5 });

  const ast = parse(obfuscator.obfuscate(base, {
    "compact": true,
    // "selfDefending": true,
    "disableConsoleOutput": true,
    // "debugProtection": true,
    // "debugProtectionInterval": 500,
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
    "stringArrayThreshold": 1,
    "stringArrayThresholdEnabled": true,
    "stringArrayIndexesType": ["hexadecimal-number"],
    "stringArrayIndexShift": true,
    "stringArrayCallsTransform": true,
    "stringArrayCallsTransformThreshold": 1,
    "stringArrayEncoding": ["rc4"],
    "stringArrayEncodingEnabled": true,
    "stringArrayWrappersCount": 1,
    "stringArrayWrappersChainedCalls": true,
    "stringArrayWrappersParametersMaxCount": 16,
    "stringArrayWrappersType": "function",
    "controlFlowFlattening": true,
    "controlFlowFlatteningThreshold": 1,
    "numbersToExpressions": true,
    // "identifierNamesGenerator": "mangled",
    "identifierNamesGenerator": 'mangled-shuffled',
    "transformObjectKeys": true,
    "ignoreImports": false,
    "log": false,
    "sourceMapSourcesMode": "sources-content"
  }).getObfuscatedCode(), { ecmaVersion: 5 });

  const stringMap = new Map();
  const propertyMap = new Map();
  const unicodeMap = new Map();
  const numberMap = new Map();

  const STRINGS: number[][] = [];
  const PROPERTIES: number[][] = [];
  const UNICODE_STRINGS: string[] = [];
  const NUMBERS: number[] = [];

  const transformNode = (node: ASTNode, key: string | number, parent: ASTNode | null) => {
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
      if (containsSpecialUnicodeOrEmoji(stringValue)) {
        if (!unicodeMap.has(stringValue)) {
          UNICODE_STRINGS.push(stringValue);
          unicodeMap.set(stringValue, UNICODE_STRINGS.length - 1);
        }
        parent![key] = {
          type: 'MemberExpression',
          computed: true,
          object: {
            type: 'Identifier',
            name: '__UNICODE_STRINGS__'
          },
          property: {
            type: 'Literal',
            value: unicodeMap.get(stringValue),
            raw: unicodeMap.get(stringValue)!.toString()
          }
        };
      } else {
        if (!stringMap.has(stringValue)) {
          const encodedString = encodeString(stringValue, DECODER_SHIFT_1, DECODER_SHIFT_2);
          STRINGS.push(encodedString);
          stringMap.set(stringValue, STRINGS.length - 1);
        }
        parent![key] = {
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
      }
    } else if (node.type === 'Property' && node.key.type === 'Literal' && typeof node.key.value === 'string') {
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
    } else if (node.type === 'Property' && node.value.type === 'Literal' && typeof node.value.value === 'string' && !containsSpecialUnicodeOrEmoji(node.value.value)) {
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
    }
  };

  const traverse = (node: ASTNode | ASTNode[] | null, parent: ASTNode | null = null, key: string | number | null = null) => {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach((child, index) => traverse(child, node as any, index));
    } else if (typeof node === 'object') {
      if (parent && key !== null) {
        transformNode(node, key, parent);
      }

      Object.keys(node).forEach(childKey => {
        const childNode = node[childKey];
        traverse(childNode, node, childKey);
      });
    }
  };

  // traverse(ast);

  traverse(ast);


  let obfuscated = generate(ast, {
    format: {
      hexadecimal: true,
    }
  });

  const built = Date.now();
  const built_expire = built + 259200000000;

  const computedChecksum = checksum(JSON.stringify(PROPERTIES) + JSON.stringify(STRINGS) + JSON.stringify(NUMBERS) + obfuscated);

  let bootstrap = `
    (function AMETHYST_BOOTSTRAP(checksum, random){
      ${DECODER_TEMPLATE(built, built_expire, computedChecksum, PROPERTIES, STRINGS, NUMBERS, UNICODE_STRINGS)}
      ${obfuscated}
    })(${computedChecksum}, ${DECODER_CHECKSUM_RANDOM});
    `;

  const terser: any = await terserMinify(bootstrap,
    {
      mangle: true,
      compress: {
        loops: true,
        booleans: true,
        arguments: true,
        join_vars: false,
        hoist_props: true,
        hoist_funs: true,
        hoist_vars: false,
        keep_fnames: false,
        keep_infinity: true,
        // drop_console: true,
        collapse_vars: true,
        // unused: true,
        // booleans_as_integers: true,
        conditionals: true,
        if_return: true,
      }
    });

  if (terser.error) {
    throw terser.error;
  }

  let gcs: string | undefined = undefined;
  await minify({
    content: terser.code,
    compressor: gcc,
    callback: async function (error: any, min: any) {
      if (error) {
        throw error;
      }

      gcs = min;
    }
  });

  if (typeof gcs === 'string') {

    // const code = obfuscator.obfuscate(gcs, {
    //   // "compact": true,
    //   // "selfDefending": true,
    //   // "numbersToExpressions": false,
    //   "seed": Date.now() / 100,
    //   // "unicodeEscapeSequence": true,
    //   // "splitStrings": true,
    //   // "splitStringsChunkLength": 1,
    //   // "splitStringsChunkLengthEnabled": true,
    //   // "stringArray": true,
    //   // "stringArrayRotate": true,
    //   // "stringArrayRotateEnabled": true,
    //   // "stringArrayShuffle": true,
    //   // "stringArrayShuffleEnabled": true,
    //   "target": "browser",
    //   // "stringArrayThreshold": 1,
    //   // "stringArrayThresholdEnabled": true,
    //   // "stringArrayIndexesType": ["hexadecimal-number"],
    //   // "stringArrayIndexShift": true,
    //   // "stringArrayCallsTransform": true,
    //   // "stringArrayCallsTransformThreshold": 1,
    //   // "stringArrayEncoding": ["rc4"],
    //   // "stringArrayEncodingEnabled": true,
    //   // "stringArrayWrappersCount": 1,
    //   // "stringArrayWrappersChainedCalls": true,
    //   // "stringArrayWrappersParametersMaxCount": 16,
    //   // "stringArrayWrappersType": "function",
    //   "identifierNamesDictionary": underscoreIdentifiers,
    //   "identifiersDictionary": underscoreIdentifiers,
    //   "identifierNamesGenerator": "dictionary",
    //   // "transformObjectKeys": true,
    //   // "ignoreImports": false,
    //   // "log": false,
    //   // "sourceMapSourcesMode": "sources-content"
    // }).getObfuscatedCode();
    writeFileSync(output, `window.__AMETHYST_COMPILED__ = true;${gcs}`);
  }
  // if (bootstrap.error) {
  //   // throw bootstrap.error;
  //   console.log(bootstrap.error.stack)
  // }

  // bootstrap = bootstrap.code;

  // const evalx = await EVAL_TEMPLATE(bootstrap, computedChecksum, DECODER_CHECKSUM_RANDOM);

}

obfuscate('./source.js', './test.js');
