import { oneFrom } from "../local";
import { arrayOf } from "./internal/array";
import { weighted } from "./probabilities";
import { string } from "./internal/string";

const PARAMS_LIST = "SecLists/Discovery/Web-Content/burp-parameter-names.txt";
export const urlparam = () => {
  return weighted([100, () => oneFrom(PARAMS_LIST)], [1, string]);
};

export const urlparams = (params: Record<string, string>) => {
  const random = () =>
    arrayOf(() => [urlparam(), string()] as [string, string]);
  const empty = () => [];
  const duplicate = () => Object.entries(params);
  const extraKeys = weighted([100, empty], [1, random], [1, duplicate]);
  return new URLSearchParams([...Object.entries(params), ...extraKeys]);
};
