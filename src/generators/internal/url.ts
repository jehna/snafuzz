import { array } from "./array";
import { map } from "./generator";
import { oneFrom } from "./local";
import { letter, string } from "./string";
import { tuple } from "./tuple";

const PARAMS_LIST = "SecLists/Discovery/Web-Content/burp-parameter-names.txt";

const urlparam = () => oneFrom(PARAMS_LIST);

export const urlparams = (params: Record<string, string>) =>
  map(
    array(tuple(urlparam(), string(letter))),
    (extraParams) =>
      new URLSearchParams([...extraParams, ...Object.entries(params)]),
    (v) => [...v.entries()].filter(([k]) => !Object.keys(params).includes(k))
  );
