export function getMinMaxOfLength(x: number): { min: number; max: number } {
  if (x <= 0) {
    throw new Error("Length must be a positive integer.");
  }

  const min = x === 1 ? 0 : 10 ** (x - 1);
  const max = 10 ** x - 1;

  return { min, max };
}
