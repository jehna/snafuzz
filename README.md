# Snafuzz
> An asynchronous, property based fuzzing tool

Snafuzz is a tool that you can use to fuzz your code or project with random
data. When a test fails, Snafuzz will automatically search for the minimal
input that causes the test to fail.

A simple example:

```typescript
test("should find a SQL injection", async () => {
  const params = new URLSearchParams({ q: string() });
  const result = await fetch(tag("http://localhost:3000/?" + params));
  expect(result.ok);
});
```

Note that:

* A single `test()` is ran for N times or for N seconds until it fails
* `string()` function retunrs a different random value each run
* If `expect()` fails, the test will begin to shrink the input until it finds the minimal input that causes the test to fail

## Installing / Getting started

Clone the project and install the dependencies:

```shell
yarn # installs node dependencies
```

When you have everything installed, you can run the example test suites from
under `packages/example-*`.

## Features

Snafuzz is meant to make asynchronous property based fuzzing easy:
* It tries to get out of your way as much as possible
* React has made it OK to use hooks, and Snafuzz uses hook-like global API to
  describe test cases (properties)
* Snafuzz is asynchronous, so you can use it to test your web applications or
  other asynchronous code
* Need throttling? Just use `await sleep(1000)` in your test case, it's "just
  code"

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
