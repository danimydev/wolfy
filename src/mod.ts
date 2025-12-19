import * as Utils from "./utils.ts";

/**
 * A lightweight TypeScript wrapper for the Wolfram Alpha API.
 *
 * Wolfy provides convenient access to three Wolfram Alpha endpoints:
 *
 * - {@link simple} — retrieve visual result images.
 * - {@link shortAnswers} — retrieve concise text answers.
 * - {@link spokenResults} — retrieve conversational responses.
 *
 * All API errors are surfaced as {@link ApiError}.
 *
 * @example
 * ```ts
 * import Wolfy from "@danimydev/wolfy";
 *
 * try {
 *   const result = await Wolfy.shortAnswers({
 *     appId: "YOUR_APP_ID",
 *     input: "2+2",
 *   });
 *
 *   console.log(result); // "4"
 * } catch (err) {
 *   if (err instanceof ApiError) {
 *     console.error(err.status, err.message);
 *   }
 * }
 * ```
 *
 * @module Wolfy
 */

/**
 * Represents an error returned by the Wolfram Alpha API.
 *
 * This error is thrown whenever the API responds with a non-OK HTTP status.
 */
export class ApiError extends Error {
  /** The HTTP status code returned by the API. */
  status: number;

  /**
   * Create a new APIError instance.
   *
   * @param status - HTTP status code returned by Wolfram Alpha.
   * @param message - Human-readable error message.
   */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const BASE_URL = "https://api.wolframalpha.com/v1";

/**
 * Retrieve a full Wolfram Alpha result page as an image.
 *
 * This uses the Wolfram Alpha **Simple API** and returns the rendered output
 * as an `ArrayBuffer`.
 *
 * @example
 * ```ts
 * const image = await Wolfy.simple({
 *   appId: "YOUR_APP_ID",
 *   input: "integrate x^2",
 *   width: 400,
 * });
 * ```
 *
 * @param args - Query parameters for the request
 * @param args.appId - Your Wolfram Alpha APP ID
 * @param args.input - The query string to evaluate
 * @returns A promise resolving to the raw image data
 * @throws {ApiError} If the API returns an error response
 */
async function simple(args: {
  /** Your Wolfram Alpha APP Id (Identifies your app within Wolfram Alpha). */
  appId: string;
  /** The query string to send to the Wolfram Alpha API. */
  input: string;
  /** For API types that return full Wolfram|Alpha output, the layout parameter defines how content is presented. The default setting is divider (shown in previous queries), which specifies a series of pods with horizontal dividers. The other option, labelbar, specifies a series of separate content sections with label bar headings. */
  layout?: "divider" | "labelbar";
  /** This parameter allows you to change the overall background color for visual results. Here is the sample result from above, but with a light grey background (#F5F5F5). Colors can be expressed as HTML names (e.g. "white"), hexadecimal RGB values (e.g. "00AAFF") or comma-separated decimal RGB values (e.g. "0,100,200"). You can also add an alpha channel to RGB values (e.g. "0,100,200,200") or specify "transparent" or "clear" for a transparent background. The default background color is white. */
  background?: string;
  /** Use this parameter to select a foreground color—either "black" (default) or "white"—for text elements. The foreground parameter is useful for making text more readable against certain background colors. For instance, black text would not show up well against a dark blue background, but setting "foreground=white" makes the text easily visible. */
  foreground?: "white" | "black";
  /** Specify the display size of text elements in points, with a default setting of 14. Oversized text (i.e. anything too wide to fit inside your "width" setting) will automatically be hyphenated. This is what our sample result looks like with 16-point font. */
  fontSize?: number;
  /** This parameter specifies the desired width (in pixels) for output images, with a default setting of "500". In order to display text and images optimally, the actual output size may vary slightly. Any text too large to fit will be hyphenated, so it's best to use this in conjunction with the fontsize parameter. Here is the sample result with a 400-pixel width. */
  width?: number;
  /** Use this parameter to manually select what system of units to use for measurements and quantities (either "metric" or "imperial"). By default, the system will use your location to determine this setting. Adding "units=metric" to our sample query displays the resulting altitudes in meters instead of feet. */
  units?: "metric" | "imperial";
  /** This parameter specifies the maximum amount of time (in seconds) allowed to process a query, with a default value of "5". It is primarily used to optimize response times in applications, although it may also affect the number and type of results returned by the Simple API. */
  timeout?: number;
}): Promise<ArrayBuffer> {
  const { appId, input, ...restArgs } = args;

  const searchParams = Utils.recordToUrlSearchParams({
    appid: appId,
    i: input,
    ...restArgs,
  });

  const response = await fetch(
    `${BASE_URL}/simple?${searchParams.toString()}`,
  );

  if (!response.ok) {
    const errorBody = await Utils.getApiErrorBody(response);
    throw new ApiError(errorBody.status, errorBody.message);
  }

  return response.arrayBuffer();
}

/**
 * Retrieve a short textual answer from Wolfram Alpha.
 *
 * This uses the **Short Answers API** and is ideal for chatbots,
 * search boxes, and quick lookups.
 *
 * @example
 * ```ts
 * const answer = await Wolfy.shortAnswers({
 *   appId: "YOUR_APP_ID",
 *   input: "population of Japan",
 * });
 * ```
 *
 * @param args - Query parameters for the request
 * @param args.appId - Your Wolfram Alpha APP ID
 * @param args.input - The query string to evaluate
 * @returns A promise resolving to a short text answer
 * @throws {ApiError} If the API returns an error response
 */
async function shortAnswers(args: {
  /** Your Wolfram Alpha APP Id (Identifies your app within Wolfram Alpha). */
  appId: string;
  /** The query string to send to the Wolfram Alpha API. */
  input: string;
  /** Use this parameter to manually select what system of units to use for measurements and quantities (either "metric" or "imperial"). By default, the system will use your location to determine this setting. Adding "units=metric" to our sample query displays the resulting distance in kilometers instead of miles. */
  units?: "metric" | "imperial";
  /** This parameter specifies the maximum amount of time (in seconds) allowed to process a query, with a default value of "5". Although it is primarily used to optimize response times in applications, the timeout parameter may occasionally affect what value is returned by the Short Answers API. */
  timeout?: number;
}): Promise<string> {
  const { appId, input, ...restArgs } = args;

  const searchParams = Utils.recordToUrlSearchParams({
    appid: appId,
    i: input,
    ...restArgs,
  });

  const response = await fetch(
    `${BASE_URL}/result?${searchParams.toString()}`,
  );

  if (!response.ok) {
    const errorBody = await Utils.getApiErrorBody(response);
    throw new ApiError(errorBody.status, errorBody.message);
  }

  return response.text();
}

/**
 * Retrieve a conversational, spoken response.
 *
 * This uses the **Spoken Results API** and returns responses optimized
 * for audio playback or voice assistants.
 *
 * @example
 * ```ts
 * const spoken = await Wolfy.spokenResults({
 *   appId: "YOUR_APP_ID",
 *   input: "What is recursion?",
 * });
 * ```
 *
 * @param args - Query parameters for the request
 * @param args.appId - Your Wolfram Alpha APP ID
 * @param args.input - The query string to evaluate
 * @returns A promise resolving to the spoken response text
 * @throws {ApiError} If the API returns an error response
 */
async function spokenResults(args: {
  /** Your Wolfram Alpha APP Id (Identifies your app within Wolfram Alpha). */
  appId: string;
  /** The query string to send to the Wolfram Alpha API. */
  input: string;
  /** Use this parameter to manually select what system of units to use for measurements and quantities (either "metric" or "imperial"). By default, the system will use your location to determine this setting. Adding "units=metric" to our sample query displays the resulting distance in kilometers instead of miles. */
  units?: "metric" | "imperial";
  /** This parameter specifies the maximum amount of time (in seconds) allowed to process a query, with a default value of "5". Although it is primarily used to optimize response times in applications, the timeout parameter may occasionally affect what value is returned by the Spoken Results API. */
  timeout?: number;
}): Promise<string> {
  const { appId, input, ...restArgs } = args;

  const searchParams = Utils.recordToUrlSearchParams({
    appid: appId,
    i: input,
    ...restArgs,
  });

  const response = await fetch(`${BASE_URL}/spoken?${searchParams.toString()}`);

  if (!response.ok) {
    const errorBody = await Utils.getApiErrorBody(response);
    throw new ApiError(errorBody.status, errorBody.message);
  }

  return response.text();
}

/**
 * Default export containing Wolfram Alpha endpoints.
 */
export default {
  simple,
  shortAnswers,
  spokenResults,
};
