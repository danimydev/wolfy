import http from "node:http";
import { OUTPUTS } from "./enums";
import {
  FullQueryOptions,
  FullResponse,
  QueryOptions,
  SimpleQueryOptions,
  SimpleResponse,
} from "./types";

/**
 * Wolfram|Alpha API's npm library
 */
export class WolframAlpha {
  private appId: string;
  private simpleBaseUrl: string = "http://api.wolframalpha.com/v1/simple";
  private fullBaseUrl: string = "http://api.wolframalpha.com/v2/query";

  /**
   * You may get your 'appid' at {@link https://developer.wolframalpha.com/portal/myapps/}.
   * Remember, this appID must be kept secret.
   * @param {string} appId - the appid, must be non-empty string.
   * @throws TypeError
   * @example
   * import WolframAlpha = from '@danimydev/wolfram-alpha-api';
   * const wa = new WolframAlpha('YOUR-APPID');
   */
  constructor(appId: string) {
    try {
      if (!appId) throw new TypeError("appid must be non-empty string");
      this.appId = appId;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns an FullResponse object witch contains the query result from Wolfram|Alpha, you can use helper enums to customize these options.
   * @param {FullQueryOptions} options
   * @returns {Promise<FullResponse>}
   * @see https://products.wolframalpha.com/api/documentation/
   * @example
   * import WolframAlpha = from '@danimydev/wolfram-alpha-api';
   * const wa = new WolframAlpha('YOUR-APPID');
   *
   * wa.getFull({
   *  input:'hello world',
   *  units:UNITS.METRIC,
   * })
   *  .then(data => {})
   *  .catch(error => {})
   */
  public async getFull(options: FullQueryOptions): Promise<FullResponse> {
    try {
      options.output = OUTPUTS.JSON;
      const url = this.buildUrl(this.fullBaseUrl, options);
      const { data } = await this.sendHttpRequest(url);
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns an SimpleResponse object witch contains an image with data, ext (default:gif) and a contentType directly from Wolfram|Alpha, , you can use helper enums to customize these options.
   * @param {SimpleQueryOptions} options
   * @returns {Promise<SimpleResponse>}
   * @see https://products.wolframalpha.com/simple-api/documentation/
   * @example
   * import WolframAlpha = from '@danimydev/wolfram-alpha-api';
   * const wa = new WolframAlpha('YOUR-APPID');
   *
   * wa.getSimple({
   *  i:'hello world',
   *  fontSize:15,
   * })
   *  .then(data => {})
   *  .catch(error => {})
   */
  public async getSimple(options: SimpleQueryOptions): Promise<SimpleResponse> {
    try {
      const url = this.buildUrl(this.simpleBaseUrl, options);

      const { contentType, data }: { contentType: string; data: any } =
        await this.sendHttpRequest(url);

      if (contentType === "text/plain;charset=utf-8") {
        return {
          error: data,
        };
      }

      return {
        image: {
          data: `data:${contentType};base64,${data}`,
          ext: contentType.split("/")[1],
          contentType,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  private buildUrl(baseUrl: string, options: QueryOptions): URL {
    try {
      const params = this.buildUrlSearchParams(options);
      return new URL(`${baseUrl}?${params.toString()}`);
    } catch (error) {
      throw error;
    }
  }

  private buildUrlSearchParams(options: QueryOptions): URLSearchParams {
    try {
      const params = new URLSearchParams();
      params.append("appid", this.appId);

      const optionEntries = Object.entries(options);
      for (let i = 0; i < optionEntries.length; i++) {
        const [option, value] = optionEntries[i];
        params.append(option, String(value));
      }
      return params;
    } catch (error) {
      throw error;
    }
  }

  private sendHttpRequest(url: URL): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = http.request(url, (res) => {
        const { headers, statusCode } = res;
        const contentType = headers["content-type"];

        if (contentType === "image/gif" && statusCode === 200) {
          res.setEncoding("base64");
        }

        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve({
            contentType,
            data,
          });
        });

        res.on("error", (error) => {
          reject(error);
        });
      });

      req.end();
    });
  }
}
