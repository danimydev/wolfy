/**
 * Converts an object into URLSearchParams object.
 * @param {object} obj - The object to be converted into URLSearchParams.
 * @returns {URLSearchParams} The URLSearchParams object representing the provided object.
 */
export const objectToUrlSearchParams = (obj: object) => {
  const urlSearchParams = new URLSearchParams();
  const entries = Object.entries(obj);
  for (const entry of entries) {
    urlSearchParams.set(entry.at(0), entry.at(1));
  }
  return urlSearchParams;
};
