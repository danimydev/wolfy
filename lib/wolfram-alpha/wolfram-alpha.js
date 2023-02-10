"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WolframAlpha = void 0;
const node_http_1 = __importDefault(require("node:http"));
const enums_1 = require("./enums");
/**
 * Wolfram|Alpha API's npm library
 */
class WolframAlpha {
    /**
     * You may get your 'appid' at {@link https://developer.wolframalpha.com/portal/myapps/}.
     * Remember, this appID must be kept secret.
     * @param {string} appId - the appid, must be non-empty string.
     * @throws TypeError
     * @example
     * import WolframAlpha = from '@danimydev/wolfram-alpha-api';
     * const wa = new WolframAlpha('YOUR-APPID');
     */
    constructor(appId) {
        this.simpleBaseUrl = "http://api.wolframalpha.com/v1/simple";
        this.fullBaseUrl = "http://api.wolframalpha.com/v2/query";
        try {
            if (!appId)
                throw new TypeError("appid must be non-empty string");
            this.appId = appId;
        }
        catch (error) {
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
    getFull(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                options.output = enums_1.OUTPUTS.JSON;
                const url = this.buildUrl(this.fullBaseUrl, options);
                const { data } = yield this.sendHttpRequest(url);
                return JSON.parse(data);
            }
            catch (error) {
                throw error;
            }
        });
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
    getSimple(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = this.buildUrl(this.simpleBaseUrl, options);
                const { contentType, data } = yield this.sendHttpRequest(url);
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
            }
            catch (error) {
                throw error;
            }
        });
    }
    buildUrl(baseUrl, options) {
        try {
            const params = this.buildUrlSearchParams(options);
            return new URL(`${baseUrl}?${params.toString()}`);
        }
        catch (error) {
            throw error;
        }
    }
    buildUrlSearchParams(options) {
        try {
            const params = new URLSearchParams();
            params.append("appid", this.appId);
            const optionEntries = Object.entries(options);
            for (let i = 0; i < optionEntries.length; i++) {
                const [option, value] = optionEntries[i];
                params.append(option, String(value));
            }
            return params;
        }
        catch (error) {
            throw error;
        }
    }
    sendHttpRequest(url) {
        return new Promise((resolve, reject) => {
            const req = node_http_1.default.request(url, (res) => {
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
exports.WolframAlpha = WolframAlpha;
//# sourceMappingURL=wolfram-alpha.js.map