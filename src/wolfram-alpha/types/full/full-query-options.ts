import { FORMATS, OUTPUTS, UNITS } from "../../enums";

export type FullQueryOptions = {
  input: string;
  formats?: Array<FORMATS>;
  output?: OUTPUTS;
  location?: {
    ip?: string;
    latlong?: string;
    location?: string;
  };
  size?: {
    width?: number;
    maxWidth?: number;
    plotWidth?: number;
    mag?: number;
  };
  reinterpret?: boolean;
  translation?: boolean;
  ignoreCase?: boolean;
  units?: UNITS;
};
