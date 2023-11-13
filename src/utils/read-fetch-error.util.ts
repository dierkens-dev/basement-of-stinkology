import { FetchError } from "ofetch";

export function readFetchError<T>(
  fetchError: FetchError<{ data: T }>,
): T | undefined {
  const { data: response }: FetchError<{ data?: T }> = fetchError;

  return response?.data;
}
