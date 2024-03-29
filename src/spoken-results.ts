import * as utils from "@/utils.ts";

/**
 * Options for configuring a query to the SpokenResultsApi.
 */
interface QueryOptions {
  units?: "metric" | "imperial";
  timeout?: number;
}

/**
 * A class to interact with Wolfram Alpha's spoken results api.
 */
export class SpokenResults {
  /**
   * The base URL for the API.
   * @type {string}
   * @private
   */
  private baseUrl: string;

  /**
   * The app Id from Wolfram Alpha.
   * @type {string}
   * @private
   */
  private appId: string;

  /**
   * Constructs a SpokenResults instance.
   * @param {Object} params - The parameters for constructing the SpokenResults class.
   * @param {string} params.appId - The Wolfram Alpha app ID.
   */
  constructor(args: { appId: string }) {
    this.baseUrl = "http://api.wolframalpha.com/v1/spoken";
    this.appId = args.appId;
  }

  /**
   * Queries the API with the provided input and options.
   * @param {Object} params - The parameters for the query.
   * @param {string} params.input - The input for the query.
   * @param {QueryOptions} [params.options] - The options for the query.
   * @returns {Promise<string>} A promise resolving to the query result as a string.
   */
  async query(
    args: { input: string; options?: QueryOptions },
  ): Promise<string> {
    const searchParams = utils.objectToUrlSearchParams({
      appid: this.appId,
      i: args.input,
      ...args.options,
    });

    const res = await fetch(
      encodeURI(`${this.baseUrl}?${encodeURI(searchParams.toString())}`),
    );

    return await res.text();
  }
}
