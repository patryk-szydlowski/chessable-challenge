import {TilePosition} from "features/chessboard/types"

export function serializePosition({row, column}: TilePosition): string {
  return `${row}-${column}`
}
