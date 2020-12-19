import {Set} from "immutable"

export enum PieceColor {
  WHITE = "white",
  BLACK = "black"
}

export enum PieceType {
  PAWN = "pawn"
}

export enum PieceSpecialState {
  FIRST_MOVE = "first-move"
}

export type PiecePosition = {
  x: number
  y: number
}

export type PieceId = number

export type Piece = {
  id: PieceId
  type: PieceType
  color: PieceColor
  position: PiecePosition
  specialStates: Set<PieceSpecialState>
}

export enum PieceMoveScenario {
  MOVE = "move",
  FIRST_MOVE = "first-move",
  CAPTURE = "capture"
}

export type PieceMove = {
  xOffset: number
  yOffset: number
  scenario: PieceMoveScenario
}

export type LegalPieceMove = {
  xOffset: number
  yOffset: number
  legalScenarios: Set<PieceMoveScenario>
}
