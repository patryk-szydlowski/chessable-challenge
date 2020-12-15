export type PieceColor =
  | "white"
  | "black"

export type PieceType =
  | "king"
  | "queen"
  | "rook"
  | "bishop"
  | "knight"
  | "pawn"

export type PieceDefinition = {
  color: PieceColor
  type: PieceType
}
