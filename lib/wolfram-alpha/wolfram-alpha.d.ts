import { FullQueryOptions, FullResponse, SimpleQueryOptions, SimpleResponse } from "./types";
/**
 * Wolfram|Alpha API's npm library
 */
export declare class WolframAlpha {
    private appId;
    private simpleBaseUrl;
    private fullBaseUrl;
    /**
     * You may get your 'appid' at {@link https://developer.wolframalpha.com/portal/myapps/}.
     * Remember, this appID must be kept secret.
     * @param {string} appId - the appid, must be non-empty string.
     * @throws TypeError
     * @example
     * import WolframAlpha = from '@danimydev/wolfram-alpha-api';
     * const wa = new WolframAlpha('YOUR-APPID');
     */
    constructor(appId: string);
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
    getFull(options: FullQueryOptions): Promise<FullResponse>;
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
    getSimple(options: SimpleQueryOptions): Promise<SimpleResponse>;
    private buildUrl;
    private buildUrlSearchParams;
    private sendHttpRequest;
}
//# sourceMappingURL=wolfram-alpha.d.ts.map