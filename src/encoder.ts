// reserved characters as specified in https://www.rfc-editor.org/rfc/rfc6570
const genDelims = ':/?#[]@';
const subDelims = '!$&\'()*+,;=';
export const RESERVED_CHARACTERS = genDelims + subDelims;

export interface EncoderOpts {
  allowReserved: boolean;
}

export interface Encoder {
  encodeName(key: string): string;

  encodeValue(value: unknown): string;
}
