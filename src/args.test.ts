import assert from "node:assert/strict";
import test from "node:test";
import { parseTarget, UsageError } from "./args.js";

test("accepts owner/repo and a pull request number", () => {
  assert.deepEqual(parseTarget("Asemeit/fixloop", "12"), {
    repository: "Asemeit/fixloop",
    pullRequestNumber: 12,
  });
});

test("rejects a repository that is not owner/repo", () => {
  for (const bad of ["fixloop", "a/b/c", "", "owner/", "/repo", "own er/repo"]) {
    assert.throws(() => parseTarget(bad, "1"), UsageError);
  }
});

test("rejects pull request numbers that are not positive integers", () => {
  for (const bad of ["0", "-1", "1.5", "abc", "", "012", "99999999999999999999"]) {
    assert.throws(() => parseTarget("a/b", bad), UsageError);
  }
});

test("rejects trailing line terminators in either argument", () => {
  for (const suffix of ["\n", "\r\n", "\r"]) {
    assert.throws(() => parseTarget(`a/b${suffix}`, "1"), UsageError);
    assert.throws(() => parseTarget("a/b", `1${suffix}`), UsageError);
  }
});
test("rejects trailing line terminators in either argument", () => {
  for (const suffix of ["\n", "\r\n", "\r"]) {
    assert.throws(() => parseTarget(`a/b${suffix}`, "1"), UsageError);
    assert.throws(() => parseTarget("a/b", `1${suffix}`), UsageError);
  }
});