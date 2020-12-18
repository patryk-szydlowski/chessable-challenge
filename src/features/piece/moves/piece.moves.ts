import {containsSome} from "common/utils";
import {
  MoveScenario,
  PieceDefinition,
  PieceMove,
  PiecePosition,
  PieceType
} from "features/piece/types"
import {pawnMoves} from "./pawn.moves"

// todo: for now it's only pawn moves since this challenge only works with pawns
export function pieceMoves(piece: PieceDefinition): PieceMove[] {
  switch (piece.type) {
    case PieceType.PAWN:
      return pawnMoves(piece)
    default:
      return []
  }
}

export function toMove(
  from: PiecePosition,
  to: PiecePosition,
  scenarios: Set<MoveScenario>
): PieceMove {
  return {
    xOffset: from.column - to.column,
    yOffset: from.row - to.row,
    scenarios
  }
}

export function isLegalMove(move: PieceMove, piece: PieceDefinition): boolean {
  return pieceMoves(piece).some(matchesLegalMove(move))
}

function matchesLegalMove(move: PieceMove): (legalMove: PieceMove) => boolean {
  return legalMove => legalMove.xOffset === move.xOffset
    && legalMove.yOffset === move.yOffset
    && containsSome(legalMove.scenarios, move.scenarios)
}
