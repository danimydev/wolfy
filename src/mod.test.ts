import { greet } from "@/mod.ts";
import { assertEquals } from "assert";

Deno.test("greet", () => {
  assertEquals(greet(), "Hello World");
});
