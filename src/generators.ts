import { rnd } from "./ineternal-state";
import { oneFrom } from "./local";

const weighted = <T>(...weights: [weigth: number, value: () => T][]) => {
  const totalWeight = weights.reduce((acc, [weight]) => acc + weight, 0);
  const rndValue = rnd() * totalWeight;
  let acc = 0;
  for (const [weight, value] of weights) {
    acc += weight;
    if (rndValue < acc) {
      return value();
    }
  }
  throw new Error("Unreachable");
};

const numberBetween = (min: number, max: number) => {
  return weighted(
    [1, () => min],
    [1, () => max],
    [1000, () => min + (max - min) * rnd()]
  );
};

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

export const arrayOf = <T>(generator: () => T) => {
  const length = numberBetween(0, Math.pow(2, 10));
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result.push(generator());
  }
  return result;
};

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
