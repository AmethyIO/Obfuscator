import figlet from "figlet";

const base24Chars: string = '0123456789ABCDEFGHIJKLMN';

function decimalToBase24(num: number) {
  let base24 = '';
  while (num > 0) {
    let remainder = num % 24;
    base24 = base24Chars[remainder] + base24;
    num = ~~(num / 24);
  }
  return base24 || '0';
}

export function caesarShift(str: string, amount: number) {
  if (amount < 0)
    return caesarShift(str, amount + 26);

  let output = "";
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if (c.match(/[a-z]/i)) {
      const code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }
    output += c;
  }
  return output;
}

export const containsSpecialUnicodeOrEmoji = (str: string) => [...str].some(char => char.charCodeAt(0) > 127);

export function encrypt(str: string): string {
  let encrypted = '';

  for (let i = 0; i < str.length; i++) {
    let ascii = str.charCodeAt(i);

    // Ignore non-standard Unicode characters (emojis, etc.)
    if (ascii <= 0xFFFF) {  // Basic Multilingual Plane (BMP) characters only
      let base24 = decimalToBase24(ascii);
      base24 = base24.padStart(2, '0');
      encrypted += base24;
    }
  }

  console.log(encrypted);

  return encrypted;
}

export const shuffleString = (str: string): string => {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};

export const generateRandomLength = (minLength: number, maxLength: number): number => {
  return Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
};

export const generateVariations = (base: string, count: number, minLength: number, maxLength: number): string[] => {
  const variations = new Set<string>();
  let index = 0;

  while (variations.size < count) {
    index++;
    let variation = shuffleString(base);
    const randomLength = generateRandomLength(minLength, maxLength);

    if (variation.length > randomLength) {
      variation = variation.substring(0, randomLength).replace(/\$/g, '_');
    } else {
      while (variation.length < randomLength) {
        variation += shuffleString(base).substring(0, randomLength - variation.length);
      }
    }

    if (!variations.has(variation)) {
      variations.add(variation);
      // variations.add('amethyst_' + variation);
    }
  }
  return Array.from(variations);
};

export function checksum(str: string): number {
  let crc;
  let crcTable = [];

  for (let n = 0; n < 256; n++) {
    crc = n;
    for (let k = 8; k > 0; k--) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xEDB88320;
      } else {
        crc = crc >>> 1;
      }
    }
    crcTable[n] = crc;
  }

  crc = 0 ^ (-1);

  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
  }

  return (crc ^ (-1)) >>> 0;
}

export const encodeChars = (str: string, shift: number, shift2: number): number[] => {
  str = encrypt(str);

  const length = str.length;
  const encoded = [];

  for (let index = 0; index < length; index++) {
    const char = str.charCodeAt(index);
    if (char <= 0xFFFF) {  // Basic Multilingual Plane (BMP) characters only
      encoded.push(0x0 | ((char << shift) | shift2));
    }
  }

  encoded.push(0x0 | (encoded.length + shift2));

  return encoded;
};

export function getRandomInt(min: number = 0, max: number = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return ~~(Math.random() * (max - min + 1)) + min;
}

const encodeCharLiteral = (char: string): string => {
  const charCode = char.charCodeAt(0);
  if (charCode < 0x100)
    return `\\x${charCode.toString(16).padStart(2, '0')}`;

  return `\\u${charCode.toString(16).padStart(4, '0')}`;
};

export const encodeStringLiteral = (str: string): string => {
  const x = JSON.stringify(str.split('').map(encodeCharLiteral));

  return x.replace(/\\/g, '');
};

export function isHexadecimalLiteral(node: any) {
  return typeof node.value === 'number' && /^0x[0-9a-f]+$/i.test(node.raw);
}

export const generateLogo = async () => new Promise((resolve, reject) => {
  figlet('Amethyst', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});