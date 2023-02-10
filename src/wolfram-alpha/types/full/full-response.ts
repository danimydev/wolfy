import { DidYouMean } from "./did-you-mean";
import { FullPod } from "./pod";

export type FullResponse = {
  queryresult: {
    success: boolean;
    error: boolean;
    numpods: number;
    datatypes: string;
    timedout: string;
    timedoutpods: string;
    timing: number;
    parsetiming: number;
    parsetimedout: boolean;
    recalculate: string;
    id: string;
    host: string;
    server: string;
    related: string;
    version: string;
    inputstring: string;
    pods?: Array<FullPod>;
    didyoumeans: Array<DidYouMean>;
    tips?: {
      text: string;
    };
  };
};
