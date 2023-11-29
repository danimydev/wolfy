import { assertEquals } from "assert";
import { returnsNext, stub } from "mock";

import { SimpleApi } from "@/simple-api.ts";

const api = new SimpleApi({ appId: "" });

stub(
  globalThis,
  "fetch",
  returnsNext([
    new Promise((resolve, _reject) => {
      resolve(new Response());
    }),
  ]),
);

Deno.test("SimpleApi", async (t) => {
  await t.step("fetch resolves", async () => {
    const blob = await api.query({
      input: "hello",
    });

    assertEquals(blob.type, "");
  });

  await t.step("get options as params", () => {
    const params = api.getOptionsAsParams("test", {
      background: "F5F5F5",
    });

    assertEquals(params, "&i=test&background=F5F5F5");
  });

  await t.step("get options as params with empty options", () => {
    const params = api.getOptionsAsParams("test");

    assertEquals(params, "&i=test");
  });
});
