export function pctEncode(text: string): string {
  // FIXME: TextEncoder is only available in browser?
  const utf8Encoded = new TextEncoder().encode(text);
  const result = Array.from(utf8Encoded.values())
    .map(hexEncode)
    .join('');

  return result;
}

function hexEncode(byte: number): string {
  const result = '%' + padTo2Digits(byte.toString(16).toUpperCase());

  return result
}

function padTo2Digits(hex: string) {
  if (hex.length === 1) {
    return `0${hex}`;
  }

  return hex;
}
