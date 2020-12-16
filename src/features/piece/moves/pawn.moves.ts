import {MoveScenario, PieceColor, PieceMove} from "features/piece/types"

export function pawnMoves(pawnColor: PieceColor): PieceMove[] {
  return [
    standardMove(pawnColor),
    firstMove(pawnColor),
    ...captureMoves(pawnColor)
  ]
}

function standardMove(pawnColor: PieceColor): PieceMove {
  return {
    xOffset: 0,
    yOffset: multiplyByColor(1, pawnColor),
    scenarios: [MoveScenario.NON_CAPTURE_ONLY]
  }
}

function firstMove(pawnColor: PieceColor): PieceMove {
  return {
    xOffset: 0,
    yOffset: multiplyByColor(2, pawnColor),
    scenarios: [MoveScenario.NON_CAPTURE_ONLY, MoveScenario.FIRST_MOVE_ONLY]
  }
}

function captureMoves(pawnColor: PieceColor): PieceMove[] {
  return [
    {
      xOffset: -1,
      yOffset: multiplyByColor(1, pawnColor),
      scenarios: [MoveScenario.CAPTURE_ONLY]
    },
    {
      xOffset: 1,
      yOffset: multiplyByColor(1, pawnColor),
      scenarios: [MoveScenario.CAPTURE_ONLY]
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
