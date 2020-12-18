import {PiecePosition} from "features/piece/types";

export function serializePosition({x, y}: PiecePosition): string {
  return `${x}-${y}`
}
