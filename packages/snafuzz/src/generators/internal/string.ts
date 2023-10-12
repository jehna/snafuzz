import { array } from "./array";
import { map } from "./generator";
import { integer } from "./integer";

export const letter = () =>
  map(
    integer(0, 25),
    (v) => String.fromCharCode(v + 97),
    (v) => v.charCodeAt(0) - 97
  );

export const utf8 = () =>
  map(
    integer(0, 65535),
    (v) => String.fromCharCode(v),
    (v) => v.charCodeAt(0)
  );

export const string = (charGenerator = utf8) =>
  map(
    array(charGenerator()),
    (chars) => chars.join(""),
    (str) => str.split("")
  );
