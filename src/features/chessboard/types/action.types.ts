import {
  Piece,
  PieceColor,
  PieceId,
  Position,
  PieceType
} from "features/piece/types"

export type SpawnPiece = {
  type: PieceType
  color: PieceColor
  position: Position
}

export type SpawnedPiece = {
  spawnedPiece: Piece
}

export type SpawnPieceAtRandomPosition = {
  type: PieceType
  color: PieceColor
}

export type MovePiece = {
  pieceId: PieceId
  movePosition: Position
}

export type MovedPiece = {
  movedPiece: Piece
}

export type CapturedPiece = {
  capturedPieceId: PieceId
}

export type SelectPiece = {
  selectedPieceId: PieceId
}
