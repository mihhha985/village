import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import ts from "typescript";

// Execute the actual TypeScript modules with the project's @/ alias.
const require = createRequire(import.meta.url);
const cache = new Map();
function load(path) {
  if (cache.has(path)) return cache.get(path);
  const source = readFileSync(resolve(path), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const loadedModule = { exports: {} };
  new Function("require", "module", "exports", outputText)(name => name.startsWith("@/") ? load(`${name.slice(2)}.ts`) : require(name), loadedModule, loadedModule.exports);
  cache.set(path, loadedModule.exports);
  return loadedModule.exports;
}
const { SearchDataSchema, OrderDataSchema, ContactDataSchema } = load("src/lib/validations/booking.ts");
const { receiveRequest } = load("src/lib/utils/receive-request.ts");
const room = { id: "room-1", index: 1, adults: { count: 2 }, children: { count: 1, ages: [5] } };
const search = { location: "prostor", checkIn: new Date(2099, 0, 1), checkOut: new Date(2099, 0, 2), guests: [room] };
const contact = { name: "Тест", phone: "+7 (900) 000-00-00", email: "test@example.com" };
const order = { ...search, ...contact, agreement: true };

test("valid booking and contact data", () => {
  assert.equal(SearchDataSchema.safeParse(search).success, true);
  assert.equal(OrderDataSchema.safeParse(order).success, true);
});
test("past dates and same-day checkout are rejected in both forms", () => {
  for (const schema of [SearchDataSchema, OrderDataSchema]) {
    assert.equal(schema.safeParse({ ...order, checkIn: new Date(2000, 0, 1) }).success, false);
    assert.equal(schema.safeParse({ ...order, checkOut: new Date(2099, 0, 1, 18) }).success, false);
  }
});
test("location must be one of the available resorts", () => {
  assert.equal(SearchDataSchema.safeParse({ ...search, location: "unknown" }).success, false);
});
test("room limits and unique room IDs are enforced", () => {
  assert.equal(SearchDataSchema.safeParse({ ...search, guests: Array.from({ length: 6 }, (_, i) => ({ ...room, id: String(i) })) }).success, false);
  assert.equal(SearchDataSchema.safeParse({ ...search, guests: [room, room] }).success, false);
});
test("guest counts must be integers and child ages must match the count", () => {
  for (const invalid of [{ ...room, adults: { count: 1.5 } }, { ...room, children: { count: 2, ages: [5] } }]) {
    assert.equal(SearchDataSchema.safeParse({ ...search, guests: [invalid] }).success, false);
  }
});
test("phone validation counts digits and names cannot be whitespace", () => {
  assert.equal(ContactDataSchema.safeParse({ ...contact, phone: "+ ( ) -     " }).success, false);
  assert.equal(ContactDataSchema.safeParse({ ...contact, name: "   " }).success, false);
});
test("booking requires consent", () => {
  assert.equal(OrderDataSchema.safeParse({ ...order, agreement: false }).success, false);
});

const payload = { ...order, type: "booking", checkIn: "2099-01-01", checkOut: "2099-01-02" };
const request = data => new Request("http://localhost/api/requests", { method: "POST", body: JSON.stringify(data) });
test("API rejects malformed JSON and invalid dates", async () => {
  assert.equal((await receiveRequest(new Request("http://localhost/api/requests", { method: "POST", body: "{" }))).status, 400);
  assert.equal((await receiveRequest(request({ ...payload, checkIn: "2099-02-30" }))).status, 400);
  assert.equal((await receiveRequest(request({ ...payload, checkIn: null }))).status, 400);
});
test("API never reports success without configured delivery", async () => {
  const previous = process.env.REQUESTS_WEBHOOK_URL;
  delete process.env.REQUESTS_WEBHOOK_URL;
  try { assert.equal((await receiveRequest(request(payload))).status, 503); }
  finally { if (previous !== undefined) process.env.REQUESTS_WEBHOOK_URL = previous; }
});
test("API forwards validated data, preserves calendar dates, handles upstream failure", async () => {
  const previous = process.env.REQUESTS_WEBHOOK_URL;
  const originalFetch = globalThis.fetch;
  process.env.REQUESTS_WEBHOOK_URL = "https://example.com/requests";
  try {
    globalThis.fetch = async (_url, options) => {
      const sent = JSON.parse(options.body);
      assert.equal(sent.checkIn, "2099-01-01");
      assert.equal(sent.untrusted, undefined);
      return new Response(null, { status: 204 });
    };
    const response = await receiveRequest(request({ ...payload, untrusted: "discard" }));
    assert.deepEqual(await response.json(), { success: true });
    globalThis.fetch = async () => new Response(null, { status: 500 });
    assert.equal((await receiveRequest(request(payload))).status, 502);
    globalThis.fetch = async () => { throw new Error("network failure"); };
    assert.equal((await receiveRequest(request(payload))).status, 502);
  } finally {
    globalThis.fetch = originalFetch;
    if (previous === undefined) delete process.env.REQUESTS_WEBHOOK_URL;
    else process.env.REQUESTS_WEBHOOK_URL = previous;
  }
});
