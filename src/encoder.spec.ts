import {RESERVED_CHARACTERS} from './encoder';

describe('encoder', () => {
  it('contains restricted characters as defined in RFC 6570', () => {
    expect(RESERVED_CHARACTERS)
      .toEqual(':/?#[]@!$&\'()*+,;=');
  })
});
