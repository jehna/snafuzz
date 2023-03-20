import {
  resetProperties,
  setGlobalState,
  shrinkGlobalState,
} from "./generators/internal/state/properties";
import { resetSeed, seed, setSeed } from "./ineternal-state";
import { getTagged, resetTagged } from "./tag";

const TIMEOUT_MS = 1_000;
const MIN_TESTS = 10000;

let tests: [name: string, testFn: () => Promise<void>][] = [];

export const test = async (name: string, testFn: () => Promise<void>) => {
  tests.push([name, testFn]);
};

export const expect = (turthyTest: boolean) => {
  if (!turthyTest) {
    throw new Error(`Negative test case found!`);
  }
};

export const runTests = async () => {
  for (const [name, testFn] of tests) {
    try {
      let startTime = Date.now();
      let i = 0;
      while (Date.now() - startTime < TIMEOUT_MS || i++ < MIN_TESTS) {
        resetSeed();
        resetTagged();
        resetProperties();
        await testFn();
      }
      console.log(`✅ ${name}`);
    } catch (e) {
      console.error(`❌ ${name}`);
      console.log(`   seed: ${seed()}`);
      console.log(`   initial: ${JSON.stringify(getTagged())}`);
      await shrink(name, testFn);
    }
  }
};

const shrink = async (
  name: string,
  testFn: () => Promise<void>
): Promise<void> => {
  const lastSuccessfulTagged = getTagged();
  const startSeed = seed();
  for (const globalState of (setSeed(startSeed), shrinkGlobalState())) {
    setGlobalState(globalState);
    try {
      resetTagged();
      await testFn();
    } catch (e) {
      return shrink(name, testFn);
    }
  }
  console.error(`   shrunk: ${JSON.stringify(lastSuccessfulTagged)}`);
};

Promise.resolve().then(runTests);
