// reserved characters as specified in https://www.rfc-editor.org/rfc/rfc6570
const genDelims = ':/?#[]@';
const subDelims = '!$&\'()*+,;=';

export const FOO_RESERVED_CHARACTERS = genDelims + subDelims;
