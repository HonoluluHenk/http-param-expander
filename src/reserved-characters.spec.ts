import {FOO_RESERVED_CHARACTERS} from './reserved-characters';

describe('encoder', () => {
  it('contains restricted characters as defined in RFC 6570', () => {
    expect(FOO_RESERVED_CHARACTERS)
      .toEqual(':/?#[]@!$&\'()*+,;=');
  })
});
