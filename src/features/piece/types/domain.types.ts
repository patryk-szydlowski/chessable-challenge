export enum PieceColor {
  WHITE = "white",
  BLACK = "black",
}

export enum PieceType {
  KING = "king",
  QUEEN = "queen",
  ROOK = "rook",
  BISHOP = "bishop",
  KNIGHT = "knight",
  PAWN = "pawn",
}

export type PieceDefinition = {
  color: PieceColor
  type: PieceType
}

export enum MoveScenario {
  FIRST_MOVE_ONLY = "first-move-only",
  CAPTURE_ONLY = "capture-only",
  NON_CAPTURE_ONLY = "non-capture-only",
}

export type PieceMove = {
  xOffset: number
  yOffset: number
  scenarios?: MoveScenario[]
}
