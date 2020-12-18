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
  moved?: boolean
}

export enum MoveScenario {
  MOVE = "move",
  FIRST_MOVE = "first-move",
  CAPTURE = "capture",
}

export type PieceMove = {
  xOffset: number
  yOffset: number
  scenarios: Set<MoveScenario>
}

export type PiecePosition = {
  row: number
  column: number
}
