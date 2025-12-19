/**
 * @module utils
 *
 * A collection of utility functions for common tasks such as:
 * - Converting objects to URL query parameters
 * - Standardizing API error responses
 *
 * These helpers are intended to simplify handling HTTP requests
 * and working with URLs.
 */

/**
 * Converts a plain object into a `URLSearchParams` instance.
 *
 * - Primitive values (`string`, `number`, `boolean`) are converted to strings
 *   and set once per key.
 * - Array values result in multiple entries for the same key, appended in order.
 *
 * @example
 * ```ts
 * recordToUrlSearchParams({
 *   q: "search",
 *   page: 2,
 *   active: true,
 *   tags: ["news", "tech"],
 * }).toString();
 * // => "q=search&page=2&active=true&tags=news&tags=tech"
 * ```
 *
 * @param record - An object whose values will be serialized into query parameters.
 * @returns A `URLSearchParams` instance representing the record.
 */
export function recordToUrlSearchParams(
  record: Record<
    string,
    string | boolean | number | string[] | boolean[] | number[]
  >,
): URLSearchParams {
  const urlSearchParams = new URLSearchParams();
  const entries = Object.entries(record);

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];

    if (Array.isArray(value)) {
      for (let j = 0; j < value.length; j++) {
        urlSearchParams.append(key, String(value[j]));
      }
    } else {
      urlSearchParams.set(key, String(value));
    }
  }
  return urlSearchParams;
}

/**
 * Extracts a standardized error body from a `fetch` API `Response`.
 *
 * The response body is parsed based on its `Content-Type` header:
 *
 * - `application/json` → parsed and returned directly
 * - `text/plain` → returned as a message with the response status
 * - Any other or missing content type → returns a generic "Unknown error"
 *
 * This helper is intended for API error handling where responses may vary
 * in format.
 *
 * @example
 * ```ts
 * const response = await fetch("/api/data");
 *
 * if (!response.ok) {
 *   const error = await getApiErrorBody(response);
 *   console.error(error.status, error.message);
 * }
 * ```
 *
 * @param response - The `fetch` API `Response` object.
 * @returns A promise resolving to an error object containing a status and message.
 */
export async function getApiErrorBody(
  response: Response,
): Promise<{ status: number; message: string }> {
  const contentTypeHeader = response.headers.get("content-type");

  if (contentTypeHeader) {
    const contentType = contentTypeHeader.split(";").at(0);

    if (contentType) {
      if (contentType === "application/json") {
        return response.json() as Promise<{ status: number; message: string }>;
      }

      if (contentType === "text/plain") {
        return {
          status: response.status,
          message: await response.text(),
        };
      }
    }
  }

  return {
    status: 500,
    message: "Unknown error",
  };
}
