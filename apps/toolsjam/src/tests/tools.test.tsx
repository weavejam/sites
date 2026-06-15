// Generic unit test that auto-discovers every tool that has a fixtures
// module and exercises each fixture's actions and assertions in jsdom.
//
// To opt a tool into this suite, add a sibling file:
//   src/tools/<id>.fixtures.ts → exports `fixtures: ToolFixture[]`

import * as React from "react";
import { describe, test, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { allTools } from "@/data/tools";
import type { ToolFixtureModule, FixtureAction, ToolFixture } from "@/tools/fixture";

// Load each tool's per-tool english bundle (messages/tool/<id>/en.json)
// eagerly so the test setup remains synchronous like before the split.
const toolEnMessages = import.meta.glob("../../messages/tool/*/en.json", {
  eager: true,
}) as Record<string, { default: Record<string, unknown> }>;
const enByToolId: Map<string, Record<string, unknown>> = new Map();
for (const [p, mod] of Object.entries(toolEnMessages)) {
  const m = p.match(/\/tool\/([^/]+)\/en\.json$/);
  if (m) enByToolId.set(m[1], mod.default);
}

// Lazy-import each tool + its fixtures via Vite's import.meta.glob (eager so
// jest-style `describe` registers synchronously).
const componentModules = import.meta.glob("../tools/*.tsx", { eager: true }) as Record<
  string,
  { default: React.ComponentType<{ locale: "en" }> }
>;
const fixtureModules = import.meta.glob("../tools/*.fixtures.ts", { eager: true }) as Record<
  string,
  ToolFixtureModule
>;

function toolIdFromPath(p: string): string {
  return p.replace(/.*\/tools\//, "").replace(/\.(tsx|fixtures\.ts)$/, "");
}

const fixtureByToolId: Map<string, ToolFixture[]> = new Map();
for (const [p, mod] of Object.entries(fixtureModules)) {
  fixtureByToolId.set(toolIdFromPath(p), mod.fixtures);
}
const componentByToolId: Map<string, React.ComponentType<{ locale: "en" }>> = new Map();
for (const [p, mod] of Object.entries(componentModules)) {
  componentByToolId.set(toolIdFromPath(p), mod.default);
}

function renderTool(toolId: string) {
  const Comp = componentByToolId.get(toolId);
  if (!Comp) throw new Error(`no component for ${toolId}`);
  const tMsgs = enByToolId.get(toolId);
  if (!tMsgs) throw new Error(`no en messages for ${toolId}`);
  const messages = { tool: { [toolId]: tMsgs } } as unknown as Record<string, unknown>;
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Comp locale="en" />
    </NextIntlClientProvider>,
  );
}

function applyAction(action: FixtureAction) {
  if (action.kind === "click") {
    const el = screen.getByRole("button", { name: action.label });
    fireEvent.click(el);
  } else {
    const el = screen.getByLabelText(action.label);
    fireEvent.change(el, { target: { value: action.value } });
  }
}

function assertText(needle: string | RegExp) {
  const body = document.body.textContent ?? "";
  if (typeof needle === "string") {
    expect(body).toContain(needle);
  } else {
    expect(body).toMatch(needle);
  }
}
function assertNotText(needle: string | RegExp) {
  const body = document.body.textContent ?? "";
  if (typeof needle === "string") {
    expect(body).not.toContain(needle);
  } else {
    expect(body).not.toMatch(needle);
  }
}

// Sanity check: every tool registered in the data layer has both a
// component and a fixtures module. This protects against silent skips.
describe("tool registry completeness", () => {
  for (const t of allTools) {
    test(`${t.id} has component + fixtures`, () => {
      expect(componentByToolId.has(t.id), `missing component for ${t.id}`).toBe(true);
      expect(fixtureByToolId.has(t.id), `missing fixtures for ${t.id}`).toBe(true);
    });
  }
});

describe("tool fixtures (unit)", () => {
  for (const [toolId, fixtures] of fixtureByToolId.entries()) {
    describe(toolId, () => {
      for (const fx of fixtures) {
        test(fx.name, () => {
          renderTool(toolId);
          for (const action of fx.actions) applyAction(action);
          const texts = Array.isArray(fx.expect.text)
            ? fx.expect.text
            : fx.expect.text != null
              ? [fx.expect.text]
              : [];
          const notTexts = Array.isArray(fx.expect.notText)
            ? fx.expect.notText
            : fx.expect.notText != null
              ? [fx.expect.notText]
              : [];
          for (const n of texts) assertText(n);
          for (const n of notTexts) assertNotText(n);
        });
      }
    });
  }
});

// Suppress "no test in suite" failure when registry is empty during early
// development.
test("harness loaded", () => {
  expect(true).toBe(true);
});

// Reference within to avoid unused-import lint; some fixtures may use it later.
void within;
