import { assertEquals } from "@std/assert";
import * as Utils from "./utils.ts";

Deno.test("recordToUrlSearchParams", () => {
  assertEquals(Utils.recordToUrlSearchParams({}), new URLSearchParams());
  assertEquals(Utils.recordToUrlSearchParams({}).getAll(""), []);

  const searchParams = Utils.recordToUrlSearchParams({
    appid: "app_id",
    messages: ["testing", "wolfy"],
    numberOfWorkers: 2,
    crossPlatformEnabled: true,
  });

  assertEquals(searchParams.getAll("appid"), ["app_id"]);
  assertEquals(searchParams.getAll("messages"), ["testing", "wolfy"]);
  assertEquals(searchParams.getAll("numberOfWorkers"), ["2"]);
  assertEquals(searchParams.getAll("crossPlatformEnabled"), ["true"]);
});

Deno.test("getApiErrorBody", async () => {
  assertEquals(
    await Utils.getApiErrorBody({
      ok: false,
      headers: new Map<string, string>([[
        "content-type",
        "some/invalid; format",
      ]]),
    } as unknown as Response),
    {
      status: 500,
      message: "Unknown error",
    },
  );

  assertEquals(
    await Utils.getApiErrorBody({
      ok: false,
      status: 501,
      headers: new Map<string, string>([[
        "content-type",
        "application/json;",
      ]]),
      json: () => Promise.resolve({ status: 501, message: "message" }),
    } as unknown as Response),
    {
      status: 501,
      message: "message",
    },
  );

  assertEquals(
    await Utils.getApiErrorBody({
      ok: false,
      status: 400,
      headers: new Map<string, string>([[
        "content-type",
        "text/plain; format",
      ]]),
      text: () => Promise.resolve("message"),
    } as unknown as Response),
    {
      status: 400,
      message: "message",
    },
  );
});
