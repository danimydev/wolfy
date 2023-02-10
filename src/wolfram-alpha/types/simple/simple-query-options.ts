import { LAYOUTS, FOREGROUNDS, UNITS } from "../../enums";

export type SimpleQueryOptions = {
  i: string;
  layout?: LAYOUTS;
  background?: string;
  foreground?: FOREGROUNDS;
  fontSize?: number;
  widht?: number;
  units?: UNITS;
  timeout?: number;
};
