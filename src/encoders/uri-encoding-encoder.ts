import {Encoder} from '../encoder';

export class URIEncodingEncoder implements Encoder {
  encodeName(key: string, allowReserved: boolean): string {
    if (allowReserved) {
      return String(key);
    }

    return encodeURIComponent(String(key));
  }

  encodeValue(value: string, allowReserved: boolean): string {
    if (allowReserved) {
      return String(value);
    }

    return encodeURIComponent(String(value));
  }

}
