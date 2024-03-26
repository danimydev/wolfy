/**
 * This module contains classes to interact with Wolfram Alpha apis
 * @module
 */

/**
 * Options for configuring a query to the SimpleApi.
 */
export interface QueryOptions {
  layout?: "divider" | "labelbar";
  background?: string;
  foreground?: "white" | "black";
  fontsize?: number;
  width?: number;
  units?: "metric" | "imperial";
  timeout?: number;
}

/**
 * A class to interact with Wolfram Alpha's simple api.
 */
export class SimpleApi {
  /**
   * The base URL for the API.
   * @type {string}
   * @private
   */
  private baseUrl: string;

  /**
   * Constructs a SimpleApi object.
   * @param {Object} params - The parameters for constructing the SimpleApi.
   * @param {string} params.appId - The Wolfram Alpha app ID.
   */
  constructor({ appId }: { appId: string }) {
    this.baseUrl = `http://api.wolframalpha.com/v1/simple?appid=${appId}`;
  }

  /**
   * Queries the API with the provided input and options.
   * @param {Object} params - The parameters for the query.
   * @param {string} params.input - The input for the query.
   * @param {QueryOptions} [params.options] - The options for the query.
   * @returns {Promise<Blob>} A promise resolving to the query result as a Blob.
   */
  async query(
    { input, options }: { input: string; options?: QueryOptions },
  ): Promise<Blob> {
    let queryParams = `&i=${input}`;
    const entries = Object.entries(options || {});
    for (const entry of entries) {
      queryParams += `&${entry.at(0)}=${entry.at(1)}`;
    }
    const res = await fetch(encodeURI(`${this.baseUrl}${queryParams}`));

    return await res.blob();
  }
}
