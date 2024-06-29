import figlet from "figlet";

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
  const length = str.length;
  const encoded = [];

  for (let index = 0; index < length; index++) {
    const char = str.charCodeAt(index);
    encoded.push(0x0 | ((char << shift) | shift2));  // Push as hexadecimal integer
  }

  encoded.push(0x0 | (encoded.length + shift2));  // Push length + shift2 as hexadecimal integer

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