import {
  MoveScenario,
  PieceColor,
  PieceDefinition,
  PieceMove
} from "features/piece/types"

export function pawnMoves({color, moved}: PieceDefinition): PieceMove[] {
  return [
    standardMove(color),
    ...possibleFirstMove(color, moved),
    ...captureMoves(color)
  ]
}

function standardMove(pawnColor: PieceColor): PieceMove {
  return {
    xOffset: 0,
    yOffset: multiplyByColor(1, pawnColor),
    scenarios: new Set([MoveScenario.MOVE, MoveScenario.FIRST_MOVE])
  }
}

function possibleFirstMove(pawnColor: PieceColor, moved?: boolean): PieceMove[] {
  return moved ? [] : [firstMove(pawnColor)]
}

function firstMove(pawnColor: PieceColor): PieceMove {
  return {
    xOffset: 0,
    yOffset: multiplyByColor(2, pawnColor),
    scenarios: new Set([MoveScenario.FIRST_MOVE])
  }
}

function captureMoves(pawnColor: PieceColor): PieceMove[] {
  return [
    {
      xOffset: -1,
      yOffset: multiplyByColor(1, pawnColor),
      scenarios: new Set([MoveScenario.CAPTURE])
    },
    {
      xOffset: 1,
      yOffset: multiplyByColor(1, pawnColor),
      scenarios: new Set([MoveScenario.CAPTURE])
    },
  ]
}

function multiplyByColor(offset: number, pawnColor: PieceColor): number {
  switch (pawnColor) {
    case PieceColor.WHITE:
      return offset
    case PieceColor.BLACK:
      return -offset
  }
}
