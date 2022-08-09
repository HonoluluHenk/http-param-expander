import {Encoder} from '../encoder';

export class URIComponentEncoder implements Encoder {
  encodeName(key: string): string {
    return encodeURIComponent(String(key));
  }

  encodeValue(value: unknown): string {
    return encodeURIComponent(String(value));
  }

}
