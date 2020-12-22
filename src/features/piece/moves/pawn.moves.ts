import {Map, Set} from "immutable"
import {
  LegalPieceMove,
  PieceColor,
  PieceMoveScenario
} from "features/piece/types"

const firstMove: LegalPieceMove = {
  xOffset: 0,
  yOffset: 1,
  legalScenarios: Set([PieceMoveScenario.MOVE, PieceMoveScenario.FIRST_MOVE])
}

const move: LegalPieceMove = {
  xOffset: 0,
  yOffset: 2,
  legalScenarios: Set([PieceMoveScenario.FIRST_MOVE])
}

const rightSideCapture: LegalPieceMove = {
  xOffset: 1,
  yOffset: 1,
  legalScenarios: Set([PieceMoveScenario.CAPTURE])
}

const leftSideCapture: LegalPieceMove = {
  xOffset: -1,
  yOffset: 1,
  legalScenarios: Set([PieceMoveScenario.CAPTURE])
}

const pawnMoves = Set([firstMove, move, rightSideCapture, leftSideCapture])

export const pawnMovesByColor = Map([
  [PieceColor.WHITE, pawnMoves.map(offsetByPawnColor(PieceColor.WHITE))],
  [PieceColor.BLACK, pawnMoves.map(offsetByPawnColor(PieceColor.BLACK))],
])

function offsetByPawnColor(color: PieceColor): (move: LegalPieceMove) => LegalPieceMove {
  return move => {
    switch (color) {
      case PieceColor.WHITE:
        return move
      case PieceColor.BLACK:
        return {...move, yOffset: -move.yOffset}
    }
  }
}
