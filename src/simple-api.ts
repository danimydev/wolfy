type QueryOptions = {
  layout?: "divider" | "labelbar";
  background?: string;
  foreground?: "white" | "black";
  fontsize?: number;
  width?: number;
  units?: "metric" | "imperial";
  timeout?: number;
};

export class SimpleApi {
  private baseUrl: string;

  constructor({ appId }: { appId: string }) {
    this.baseUrl = `http://api.wolframalpha.com/v1/simple?appid=${appId}`;
  }

  async query(
    { input, options }: { input: string; options?: QueryOptions },
  ): Promise<Blob> {
    const queryParams = this.getOptionsAsParams(input, options || {});
    const res = await fetch(encodeURI(`${this.baseUrl}${queryParams}`));
    return await res.blob();
  }

  getOptionsAsParams(
    input: string,
    options?: QueryOptions,
  ): string {
    let parsedOptions = `&i=${input}`;
    const entries = Object.entries(options || {});
    for (const entry of entries) {
      parsedOptions += `&${entry.at(0)}=${entry.at(1)}`;
    }
    return parsedOptions;
  }
}
