import {URITeplateCompatibleEncoder} from './uri-template-compatible-encoder';

describe('URITeplateCompatibleEncoder', () => {
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


  describe('parses default options', () => {
    const encoder = new URITeplateCompatibleEncoder();
    const actual = encoder.opts;

    expect(actual)
      .toEqual({allowReserved: false});
  });

  describe('using allowReserved = false', () => {
    const encoder = new URITeplateCompatibleEncoder({allowReserved: false});

    it.each(reserved)('encodes reserved characters in name: %s', (raw, escaped) => {
      const actual = encoder.encodeName(raw);

      expect(actual)
        .toEqual(escaped);
    });

    it.each(reserved)('encodes reserved characters in value', (raw, escaped) => {
      const actual = encoder.encodeValue(raw);

      expect(actual)
        .toEqual(escaped);
    });


    it( `returns the raw input for name: %s`, () => {
      for(const c of rawAllowed) {
        const actual = encoder.encodeName(c);

        expect(actual)
          .toEqual(c);
      }
    });

    it( `returns the raw input for value: %s`, () => {
      for(const c of rawAllowed) {
        const actual = encoder.encodeValue(c);

        expect(actual)
          .toEqual(c);
      }
    });
  });

  describe('using allowReserved = true', () => {
    const encoder = new URITeplateCompatibleEncoder({allowReserved: true});

    it.each(reserved)('passes all characters in name: %s', (raw, _ignored) => {
      const actual = encoder.encodeName(raw);

      expect(actual)
        .toEqual(raw);
    });

    it.each(reserved)('passes all characters in value', (raw, _ignored) => {
      const actual = encoder.encodeValue(raw);

      expect(actual)
        .toEqual(raw);
    });
  });

});
