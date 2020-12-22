import {Map, Set} from "immutable"
import {
  LegalPieceMove,
  Piece,
  PieceColor,
  PieceMove,
  PieceType
} from "features/piece/types"
import {pawnMovesByColor} from "./pawn.moves"

const pieceMovesByType = Map([
  [PieceType.PAWN, pawnMovesByColor]
])

export function isLegalPieceMove(piece: Piece, move: PieceMove, boardSize: number): boolean {
  const {type, color} = piece
  const legalMoves = legalPieceMoves(type, color)
  return isMoveLegal(move, legalMoves) && isMoveWithinBoard(piece, move, boardSize)
}

export function legalPieceMoves(type: PieceType, color: PieceColor): Set<LegalPieceMove> {
  return pieceMovesByType.get(type)?.get(color) ?? Set()
}

function isMoveLegal(move: PieceMove, legalMoves: Set<LegalPieceMove>): boolean {
  return legalMoves.some(moveIsAllowed(move))
}

function moveIsAllowed(move: PieceMove): (legalMove: LegalPieceMove) => boolean {
  return legalMove => legalMove.xOffset === move.xOffset
    && legalMove.yOffset === move.yOffset
    && legalMove.legalScenarios.has(move.scenario)
}

function isMoveWithinBoard(piece: Piece, move: PieceMove, boardSize: number): boolean {
  const {position: {x, y}} = piece
  const {xOffset, yOffset} = move
  return x + xOffset >= 0 && x + xOffset < boardSize
    && y + yOffset >= 0 && y + yOffset < boardSize
}
