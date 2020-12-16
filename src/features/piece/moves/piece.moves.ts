import {PieceDefinition, PieceMove, PieceType} from "features/piece/types";
import {pawnMoves} from "./pawn.moves";

// todo: for now it's only pawn moves since this challenge only works with pawns
export function pieceMoves({type, color}: PieceDefinition): PieceMove[] {
  switch (type) {
    case PieceType.PAWN:
      return pawnMoves(color)
    default:
      return []
  }
}
