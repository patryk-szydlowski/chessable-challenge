export function range(startInclusive: number, endExclusive: number): number[] {
  const length = endExclusive - startInclusive
  return new Array(length).fill(null).map((_, index) => startInclusive + index)
}

export function rangeFromZero(endExclusive: number): number[] {
  return range(0, endExclusive)
}

export function product<A, B>(first: A[], second: B[]): [A, B][] {
  return first.flatMap(a => second.map<[A, B]>(b => ([a, b])))
}

export function containsSome<A>(first: Set<A>, second: Set<A>): boolean {
  return [...second].some(value => first.has(value))
}
