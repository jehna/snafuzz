import { resetSeed, seed } from "./ineternal-state";

const TIMEOUT_MS = 1_000;

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
      while (Date.now() - startTime < TIMEOUT_MS) {
        resetSeed();
        await testFn();
      }
      console.log(`✅ ${name}`);
    } catch (e) {
      console.error(`❌ ${name} (seed: ${seed()})`);
    }
  }
};

Promise.resolve().then(runTests);
