/** Reads optional text filters from the URL, dropping empty or non-text values. */
export function pickStrings<K extends string>(
  search: Record<string, unknown>,
  keys: readonly K[],
): Partial<Record<K, string>> {
  const out: Partial<Record<K, string>> = {};
  for (const key of keys) {
    const value = search[key];
    if (typeof value === "string" && value) out[key] = value;
  }
  return out;
}
