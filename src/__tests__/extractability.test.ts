import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// The classifier (the "label" actor). Pure: it maps a unit's state to a
// Disposition, depending only on zod — never on pr-state, github, or any store.
// It sits below surface-sync, which calls it. The harness proves that edge (zod
// only) and that prod files hold no ambient authority.
test("@bounded-systems/disposition upholds its seam claim", () => {
  assertSeam({
    root: SRC,
    prod: ["zod"],
    test: ["@bounded-systems/disposition", "@bounded-systems/seam-check"],
  });
});
