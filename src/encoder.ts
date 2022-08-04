export const RESERVED_CHARACTERS = ':/?#[]@!$&\'()*+,;=';

export interface EncoderOpts {
  allowReserved: boolean;
}

export interface Encoder {
  encodeName(key: string): string;

  encodeValue(value: unknown): string;
}
