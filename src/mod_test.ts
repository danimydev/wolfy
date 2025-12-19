import { assertEquals } from "@std/assert";
import { server } from "./mocks.ts";
import Wolfy from "./mod.ts";

server.listen();

Deno.test("simple", async () => {
  const result = await Wolfy.simple({ input: "", appId: "" });
  assertEquals(typeof result.byteLength, "number");
});

Deno.test("shortAnswers", async () => {
  const result = await Wolfy.shortAnswers({ input: "", appId: "" });
  assertEquals(result, "short answers result");
});

Deno.test("spokenResults", async () => {
  const result = await Wolfy.spokenResults({ input: "", appId: "" });
  assertEquals(result, "spoken result");
});
