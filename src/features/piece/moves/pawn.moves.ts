import {Map, Set} from "immutable"
import {
  LegalPieceMove,
  PieceColor,
  PieceMoveScenario
} from "features/piece/types"

const firstMove: LegalPieceMove = {
  offset: {xOffset: 0, yOffset: 2},
  requiredFreeOffsets: Set([{xOffset: 0, yOffset: 1}]),
  legalScenarios: Set([PieceMoveScenario.FIRST_MOVE])
}

const move: LegalPieceMove = {
  offset: {xOffset: 0, yOffset: 1},
  requiredFreeOffsets: Set(),
  legalScenarios: Set([PieceMoveScenario.MOVE, PieceMoveScenario.FIRST_MOVE])
}

const rightSideCapture: LegalPieceMove = {
  offset: {xOffset: 1, yOffset: 1},
  requiredFreeOffsets: Set(),
  legalScenarios: Set([PieceMoveScenario.CAPTURE])
}

const leftSideCapture: LegalPieceMove = {
  offset: {xOffset: -1, yOffset: 1},
  requiredFreeOffsets: Set(),
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
        return {
          ...move,
          offset: {...move.offset, yOffset: -move.offset.yOffset}
        }
    }
  }
}
