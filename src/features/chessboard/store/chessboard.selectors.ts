import {Set} from "immutable"
import {createSelector} from "reselect"
import {matrix} from "common/utils"
import {ChessboardStateSlice} from "features/chessboard/types"
import {serializePosition} from "features/chessboard/utils"
import {isLegalPieceMove, legalPieceMoves} from "features/piece/moves"
import {
  PieceId,
  PieceMove,
  PieceMoveScenario,
  PieceSpecialState,
  Position
} from "features/piece/types"

const selectChessboardFeature = (state: ChessboardStateSlice) => state.chessboard

export const selectBoardSize = createSelector(
  selectChessboardFeature,
  ({boardSize}) => boardSize
)

export const selectPiecesById = createSelector(
  selectChessboardFeature,
  ({pieces}) => pieces
)

export const selectSelectedPieceId = createSelector(
  selectChessboardFeature,
  ({selectedPieceId}) => selectedPieceId
)

export const selectPiecesByPosition = createSelector(
  selectPiecesById,
  (piecesById) => piecesById.mapKeys((_, {position}) => serializePosition(position))
)

export const selectPieceById = createSelector(
  selectPiecesById,
  (piecesById) => (id: PieceId) => piecesById.get(id)
)

export const selectPieceByPosition = createSelector(
  selectPiecesByPosition,
  (piecesByPosition) => (position: Position) =>
    piecesByPosition.get(serializePosition(position))
)

export const selectTileEmpty = createSelector(
  selectPieceByPosition,
  (pieceByPositionSelector) => (position: Position) =>
    !pieceByPositionSelector(position)
)

export const selectNextAvailablePieceId = createSelector(
  selectPiecesById,
  (pieces) => Math.max(0, ...pieces.keys()) + 1
)

export const selectEmptyPositions = createSelector(
  selectBoardSize,
  selectPieceByPosition,
  (boardSize, pieceByPositionSelector): Position[] =>
    matrix(boardSize)
      .map(([x, y]) => ({x, y}))
      .filter(position => !pieceByPositionSelector(position))
)

export const selectSelectedPiece = createSelector(
  selectSelectedPieceId,
  selectPieceById,
  (selectedPieceId, pieceByIdSelector) =>
    !!selectedPieceId ? pieceByIdSelector(selectedPieceId) : undefined
)

export const selectLegalMovePositions = createSelector(
  selectBoardSize,
  selectSelectedPiece,
  selectPieceByPosition,
  (boardSize, selectedPiece, pieceByPositionSelector) =>
    !!selectedPiece
      ? legalPieceMoves(selectedPiece.type, selectedPiece.color)
        .map(legalMove => ({
            legalMove,
            pieceAtPosition: pieceByPositionSelector({
              x: selectedPiece.position.x + legalMove.xOffset,
              y: selectedPiece.position.y + legalMove.yOffset
            })
          })
        )
        .filter(({pieceAtPosition}) => !pieceAtPosition || pieceAtPosition.color !== selectedPiece.color)
        .map<PieceMove>(({legalMove: {xOffset, yOffset}, pieceAtPosition}) => ({
          offset: {xOffset, yOffset},
          scenario: !!pieceAtPosition
            ? PieceMoveScenario.CAPTURE
            : selectedPiece.specialStates.has(PieceSpecialState.FIRST_MOVE)
              ? PieceMoveScenario.FIRST_MOVE
              : PieceMoveScenario.MOVE
        }))
        .filter(move => isLegalPieceMove(selectedPiece, move, boardSize))
        .map(({offset: {xOffset, yOffset}}) => ({
          x: selectedPiece.position.x + xOffset,
          y: selectedPiece.position.y + yOffset
        }))
      : Set()
)

export const selectLegalMoveByPosition = createSelector(
  selectLegalMovePositions,
  (highlightedPositions) => (position: Position) =>
    highlightedPositions.some(({x, y}) => x === position.x && y === position.y)
)
