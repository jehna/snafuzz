import { intBetween } from "./number";
import { weighted } from "./probabilities";

export const byte = () => {
  const charCode = intBetween(0, 256);
  if (charCode > 255) console.log(charCode);
  return String.fromCharCode(charCode);
};

export const utf8 = () => {
  const charCode = intBetween(0, 65536);
  return String.fromCharCode(charCode);
};

export const alphanumeric = () => {
  const charCode = intBetween(0, 62);
  if (charCode < 10) {
    return String.fromCharCode(charCode + 48);
  } else if (charCode < 36) {
    return String.fromCharCode(charCode + 55);
  } else {
    return String.fromCharCode(charCode + 61);
  }
};

export const char = () => weighted([1, byte], [1, utf8]);

export const bytestring = () => string({ generator: byte });

export const string = ({ generator = char, minLength = 0 } = {}) => {
  const length = intBetween(minLength, Math.pow(2, 10));
  let result = "";
  for (let i = 0; i < length; i++) {
    result += generator();
  }
  return result;
};
