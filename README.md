# SnafuSeeker
> An asynchronous, property based fuzzing tool

SnafuSeeker is a tool that you can use to fuzz your code or project with random
data and wordlists (à la [SecLists][seclists]). When a test fails, SnafuSeeker
will automatically search for the minimal input that causes the test to fail.

[seclists]: https://github.com/danielmiessler/SecLists

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
git submodule update --init --recursive # fetches SecLists
```

While you can use the tool without SecLists, there are some built in helper
functions that utilize lists from SecLists.

When you have everything installed, you can run the example test suite:

```shell
yarn dummy & # starts the dummy server
yarn test # runs the test suite
```

Dummy server is just for illustrative purposes. You should implement your own
tests to `src/index.ts`.

## Features

SnafuSeeker is meant to make asynchronous property based fuzzing easy:
* It tries to get out of your way as much as possible
* React has made it OK to use hooks, and SnafuSeeker uses hook-like global API
  to describe test cases (properties)
* SnafuSeeker is asynchronous, so you can use it to test your web applications
  or other asynchronous code

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
