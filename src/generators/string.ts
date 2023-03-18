import { numberBetween } from "./number";
import { weighted } from "./probabilities";

export const char = () => {
  const maxNum = weighted([1, () => 255], [1, () => 65535]);
  const charCode = numberBetween(0, maxNum + 1);
  return String.fromCharCode(charCode);
};

export const string = () => {
  const length = numberBetween(0, Math.pow(2, 10));
  let result = "";
  for (let i = 0; i < length; i++) {
    result += char();
  }
  return result;
};
