import {PieceDefinition} from "features/piece/types"
import {TilePosition} from "./domain.types"

export type SpawnPiece = {
  piece: PieceDefinition
  position: TilePosition
}

export type MovePiece = {
  piece: PieceDefinition
  fromPosition: TilePosition
  toPosition: TilePosition
}
