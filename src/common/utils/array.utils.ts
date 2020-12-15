export function range(startInclusive: number, endExclusive: number): number[] {
  const length = endExclusive - startInclusive
  return new Array(length).fill(null).map((_, index) => startInclusive + index)
}

export function rangeFromZero(endExclusive: number): number[] {
  return range(0, endExclusive)
}
