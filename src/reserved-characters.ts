// character classes as specified in https://www.rfc-editor.org/rfc/rfc6570

export const RFC6570_GEN_DELIMS = ':/?#[]@';
export const RFC6570_SUB_DELIMS = '!$&\'()*+,;=';
export const RFC6570_RESERVED = RFC6570_GEN_DELIMS + RFC6570_SUB_DELIMS;

export const RFC6570_ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const RFC6570_DIGIT = "0123456789";
export const RFC6570_UNRESERVED = RFC6570_ALPHA + RFC6570_DIGIT + "-._~";
