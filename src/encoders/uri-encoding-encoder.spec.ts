import {DefaultEncoder} from './default-encoder';

describe('DefaultEncoder', () => {
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

  describe('parses default options', () => {
    const encoder = new DefaultEncoder();
    const actual = encoder.opts;

    expect(actual)
      .toEqual({allowReserved: false});
  });

  describe('using allowReserved = false', () => {
    const encoder = new DefaultEncoder({allowReserved: false});

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
  });

  describe('using allowReserved = true', () => {
    const encoder = new DefaultEncoder({allowReserved: true});

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
