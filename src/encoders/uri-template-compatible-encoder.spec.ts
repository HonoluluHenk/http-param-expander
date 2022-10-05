import {FOO_RESERVED_CHARACTERS} from '../reserved-characters';
import {URITemplateCompatibleEncoder} from './uri-template-compatible-encoder';

describe('URITemplateCompatibleEncoder', () => {
  const reserved = [
    [':', '%3A'],
    ['/', '%2F'],
    ['?', '%3F'],
    ['#', '%23'],
    ['[', '%5B'],
    [']', '%5D'],
    ['@', '%40'],
    ['!', '%21'],
    ['$', '%24'],
    ['&', '%26'],
    ['\'', '%27'],
    ['(', '%28'],
    [')', '%29'],
    ['*', '%2A'],
    ['+', '%2B'],
    [',', '%2C'],
    [';', '%3B'],
    ['=', '%3D'],
  ];

  const allTestedChars = Array(255)
    .fill(0)
    .map((_, i) => String.fromCharCode(i));

  const rawAllowed = allTestedChars.filter(c => !reserved.map(e => e[0]).includes(c));

  describe('parsing default options', () => {
    it('defaults allowReserved to false', () => {
      const encoder = new URITemplateCompatibleEncoder({
        reservedCharacters: FOO_RESERVED_CHARACTERS,
      });

      expect(encoder.opts.allowReserved)
        .toBe(false);
    })

    it('parses default options', () => {
      const encoder = new URITemplateCompatibleEncoder({reservedCharacters: FOO_RESERVED_CHARACTERS});
      const actual = encoder.opts;

      expect(actual)
        .toEqual({
          allowReserved: false,
          reservedCharacters: FOO_RESERVED_CHARACTERS,
        });
    });
  });

  describe('using allowReserved = false', () => {
    const encoder = new URITemplateCompatibleEncoder({
      allowReserved: false,
      reservedCharacters: FOO_RESERVED_CHARACTERS,
    });

    it.each(reserved)('encodes reserved characters: %s', (raw, escaped) => {
      const actual = encoder.encode(raw);

      expect(actual)
        .toEqual(escaped);
    });

    it(`returns the raw input: %s`, () => {
      for (const c of rawAllowed) {
        const actual = encoder.encode(c);

        expect(actual)
          .toEqual(c);
      }
    });
  });

  describe('using allowReserved = true', () => {
    const encoder = new URITemplateCompatibleEncoder({
      allowReserved: true,
      reservedCharacters: FOO_RESERVED_CHARACTERS,
    });

    it.each(reserved)('passes all characters: %s', (raw, _ignored) => {
      const actual = encoder.encode(raw);

      expect(actual)
        .toEqual(raw);
    });

  });

  it.each([
    ['🇯🇵', '🇯🇵'],
    ['😀︎', '😀︎'],
    ['😀️', '😀️'],
    ['👨‍👩‍👧‍👦', '👨‍👩‍👧‍👦'],
  ])('passes through multi-codepoint-characters since they are not reserved chars: %s', (input, expected) => {
    const encoder = new URITemplateCompatibleEncoder({reservedCharacters: FOO_RESERVED_CHARACTERS});

    const actual = encoder.encode(input);

    expect(actual)
      .toEqual(expected);
  })

});
