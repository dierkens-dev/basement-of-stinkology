export function invariant(
  condition: any,
  error: Error | string
): asserts condition {
  if (condition) {
    return;
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error(error);
}
