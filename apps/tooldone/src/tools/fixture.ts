// Per-tool test fixtures. Each fixture describes a sequence of UI actions
// (click/fill) and an assertion on the resulting visible text. Both the
// Vitest unit harness and the Playwright e2e harness drive off the same
// fixture file, so adding a fixture extends both suites at once.

export type FixtureAction =
  | { kind: "click"; label: string | RegExp } // click button whose visible text matches
  | { kind: "fill"; label: string | RegExp; value: string }; // fill input by associated <Label>

export interface ToolFixture {
  name: string;
  actions: FixtureAction[];
  expect: {
    // visible text must contain ALL of these (string or RegExp).
    text?: (string | RegExp) | (string | RegExp)[];
    // visible text must NOT contain any of these.
    notText?: (string | RegExp) | (string | RegExp)[];
  };
}

export interface ToolFixtureModule {
  fixtures: ToolFixture[];
}
