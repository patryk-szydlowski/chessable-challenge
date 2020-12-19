import {
  Piece,
  PieceColor,
  PieceId,
  PiecePosition,
  PieceType
} from "features/piece/types"

export type SpawnPiece = {
  type: PieceType
  color: PieceColor
  position: PiecePosition
}

export type SpawnedPiece = {
  spawnedPiece: Piece
}

export type MovePiece = {
  pieceId: PieceId
  movePosition: PiecePosition
}

export type MovedPiece = {
  movedPiece: Piece
}

export type CapturedPiece = {
  capturedPieceId: PieceId
}
