export type SimpleResponse = {
  image?: {
    ext: string;
    contentType: string;
    data: string;
  };
  error?: string;
};
