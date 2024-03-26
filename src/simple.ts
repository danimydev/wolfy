import * as utils from "@/utils.ts";

/**
 * Options for configuring a query to the SimpleApi.
 */
interface QueryOptions {
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
export class Simple {
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
   * Constructs a SimpleApi object.
   * @param {Object} params - The parameters for constructing the Simple class.
   * @param {string} params.appId - The Wolfram Alpha app ID.
   */
  constructor(args: { appId: string }) {
    this.baseUrl = "http://api.wolframalpha.com/v1/simple";
    this.appId = args.appId;
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
    const searchParams = utils.objectToUrlSearchParams({
      appid: this.appId,
      i: input,
      ...options,
    });

    const res = await fetch(
      encodeURI(`${this.baseUrl}?${encodeURI(searchParams.toString())}`),
    );

    return await res.blob();
  }
}
