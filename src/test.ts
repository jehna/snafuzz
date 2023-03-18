import { resetSeed, seed } from "./ineternal-state";
import { getTagged, resetTagged } from "./tag";

const TIMEOUT_MS = 1_000;
const MIN_TESTS = 100;

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
        await testFn();
      }
      console.log(`✅ ${name}`);
    } catch (e) {
      console.error(
        `❌ ${name} (tagged: ${JSON.stringify(getTagged())}, seed: ${seed()})`
      );
    }
  }
};

Promise.resolve().then(runTests);
