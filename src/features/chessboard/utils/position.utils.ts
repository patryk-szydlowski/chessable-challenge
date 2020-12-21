import {Position} from "features/piece/types"

export function serializePosition({x, y}: Position): string {
  return `${x}-${y}`
}
