export const getSafeNextUrl = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const nextUrl = value.trim();
  if (!nextUrl) return null;
  if (!nextUrl.startsWith("/")) return null;
  if (nextUrl.startsWith("//")) return null;
  return nextUrl;
};

