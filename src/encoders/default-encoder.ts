import {type Encoder, type EncoderOpts, RESERVED_CHARACTERS} from '../encoder';

export class DefaultEncoder implements Encoder {
  public readonly opts: Readonly<Required<EncoderOpts>>;
  private static RESERVED_CHARACTERS = new Set(RESERVED_CHARACTERS);

  constructor(
    opts?: Partial<{ allowReserved: boolean }>
  ) {
    this.opts = {
      allowReserved: opts?.allowReserved ?? false,
    };
  }

  encodeName(key: string): string {
    return this.encodeValue(key);
  }

  encodeValue(value: string): string {
    if (this.opts.allowReserved) {
      return String(value);
    }

    return this.percentEscapeReservedCharacters(String(value));
  }

  protected percentEscapeReservedCharacters(text: string): string {
    const result = Array.from(text)
      .map(c => this.escapeReservedChar(c))
      .join('');

    return result;
  }

  private escapeReservedChar(c: string) {
    if (DefaultEncoder.RESERVED_CHARACTERS.has(c)) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    }

    return c;
  }
}
