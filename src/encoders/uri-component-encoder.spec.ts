import {URIComponentEncoder} from './uri-component-encoder';

describe('URIComponentEncoder', () => {
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  const rawAllowed = Array.from('abcdefghijklmnopqrstuvwxyz'
  + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  + '0123456789'
  + '-_.!~*\'()');

  const allTestedChars = Array(255)
    .fill(0)
    .map((_, i) => String.fromCharCode(i));

  const encodingRequired = allTestedChars.filter(c => !rawAllowed.includes(c));

  const encoder = new URIComponentEncoder();

  it('is a correct test setup', () => {
    // noinspection MagicNumberJS
    expect(rawAllowed)
      .toHaveLength(71);
  })

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

  it('escapes non-allowed characters in name', () => {
    for(const c of encodingRequired) {
      const actual = encoder.encodeName(c);

      expect(actual)
        .toMatch(/^%[A-Z0-9]{2}/);
    }
  })

  it('escapes non-allowed characters in value', () => {
    for(const c of encodingRequired) {
      const actual = encoder.encodeValue(c);

      expect(actual)
        .toMatch(/^%[A-Z0-9]{2}/);
    }
  })

});
