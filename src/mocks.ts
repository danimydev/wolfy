import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  http.get(
    "https://api.wolframalpha.com/v1/simple",
    () => HttpResponse.arrayBuffer(),
  ),
  http.get(
    "https://api.wolframalpha.com/v1/result",
    () => HttpResponse.text("short answers result"),
  ),
  http.get(
    "https://api.wolframalpha.com/v1/spoken",
    () => HttpResponse.text("spoken result"),
  ),
);
