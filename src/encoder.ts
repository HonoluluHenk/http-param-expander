export interface EncoderOpts {
  readonly allowReserved: boolean;
}

export interface Encoder {
  encode(value: string): string;
}
