import {createSelector} from "reselect"
import {matrix} from "common/utils"
import {ChessboardStateSlice} from "features/chessboard/types"
import {serializePosition} from "features/chessboard/utils"
import {PieceId, Position} from "features/piece/types"

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
  (piecesByPosition) => (position: Position) => {
    return piecesByPosition.get(serializePosition(position))
  }
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
