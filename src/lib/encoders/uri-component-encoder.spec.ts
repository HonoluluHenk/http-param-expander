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

  it(`returns the raw input for: %s`, () => {
    for (const c of rawAllowed) {
      const actual = encoder.encode(c);

      expect(actual)
        .toEqual(c);
    }
  });

  it('escapes non-allowed characters', () => {
    for (const c of encodingRequired) {
      const actual = encoder.encode(c);

      expect(actual)
        .toMatch(/^%[A-Z0-9]{2}/);
    }
  })

  it.each([
    ['🇯🇵', '%F0%9F%87%AF%F0%9F%87%B5'],
    ['😀︎', '%F0%9F%98%80%EF%B8%8E'],
    ['😀️', '%F0%9F%98%80%EF%B8%8F'],
    ['👨‍👩‍👧‍👦', '%F0%9F%91%A8%E2%80%8D%F0%9F%91%A9%E2%80%8D%F0%9F%91%A7%E2%80%8D%F0%9F%91%A6'],
  ])('encodes multi-codepoint-characters: %s', (input, expected) => {
    const actual = encoder.encode(input);

    expect(actual)
      .toEqual(expected);
  })
});
