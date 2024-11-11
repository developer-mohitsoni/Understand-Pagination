// Default pagination limit
export const DEFAULT_LIMIT = 5;

export function getPaginationParams(searchParams: URLSearchParams) {
  const cursor = searchParams.get("cursor");
  const limit = parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT));
  return { cursor: cursor ? parseInt(cursor) : undefined, limit };
}
