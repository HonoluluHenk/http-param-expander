export interface Encoder {
  encodeName(key: string, allowReserved: boolean): string;

  encodeValue(value: unknown, allowReserved: boolean): string;
}
