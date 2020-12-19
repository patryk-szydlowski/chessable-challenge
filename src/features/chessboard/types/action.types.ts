import {Piece, PieceColor, PiecePosition, PieceType} from "features/piece/types"

export type SpawnPiece = {
  type: PieceType
  color: PieceColor
  position: PiecePosition
}

export type SpawnedPiece = {
  spawnedPiece: Piece
}

export type MovePiece = {
  piece: Piece
  movePosition: PiecePosition
}

export type MovedPiece = {
  movedPiece: Piece
}

export type CapturePiece = {
  piece: Piece
  capturePosition: PiecePosition
}

export type CapturedPiece = {
  capturedPiece: Piece
}
