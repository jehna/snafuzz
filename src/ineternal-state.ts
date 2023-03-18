import MersenneTwister from "mersenne-twister";

let _seed: number;
let pseudoRandomGenerator: MersenneTwister;
export const resetSeed = () => {
  setSeed(Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER));
};

export const setSeed = (seed: number) => {
  _seed = seed;
  pseudoRandomGenerator = new MersenneTwister(_seed);
};

export const rnd = () => {
  return pseudoRandomGenerator.random();
};

export const seed = () => _seed;
