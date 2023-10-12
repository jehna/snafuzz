import { rnd } from "./state/random";

export const weighted = <T>(...weights: [weigth: number, value: () => T][]) => {
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
