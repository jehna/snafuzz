import { rnd } from "./random";
import { tag } from "./tag";
import { Generator } from "../generator";
import { tuple } from "../tuple";

let topLevelGenerators: Generator<any>[] = [];
let index = 0;

export const resetProperties = () => {
  topLevelGenerators = [];
  index = 0;
  globalState = undefined;
};

export const registerProperty = <T>(generator: () => Generator<T>): T => {
  const generate = () => {
    if (!topLevelGenerators[index]) {
      topLevelGenerators[index] = generator();
    }
    if (globalState) return globalState[index++];

    return topLevelGenerators[index++].generate(rnd);
  };
  return tag(generate());
};

let globalState: any[] | undefined = undefined;

export const shrinkGlobalState = () => {
  const globalStateGenerator: Generator<any[]> = tuple(...topLevelGenerators);
  if (!globalState) globalState = globalStateGenerator.generate(rnd);
  return globalStateGenerator.shrink(globalState);
};

export const setGlobalState = (state: any[]) => {
  globalState = state;
  index = 0;
};
