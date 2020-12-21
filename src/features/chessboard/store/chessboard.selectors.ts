import {createSelector} from "reselect"
import {ChessboardStateSlice, TileOccupation} from "features/chessboard/types"
import {serializePosition} from "features/chessboard/utils"
import {PieceColor, PieceId, PiecePosition} from "features/piece/types"

const selectChessboardFeature = (state: ChessboardStateSlice) => state.chessboard

export const selectBoardSize = createSelector(
  selectChessboardFeature,
  ({boardSize}) => boardSize
)

export const selectPiecesById = createSelector(
  selectChessboardFeature,
  ({pieces}) => pieces
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
  (piecesByPosition) => (position: PiecePosition) => {
    return piecesByPosition.get(serializePosition(position))
  }
)

export const selectTileOccupation = createSelector(
  selectPieceByPosition,
  (pieceByPositionSelector) => (position: PiecePosition) => {
    const piece = pieceByPositionSelector(position)
    if (!!piece) {
      switch (piece.color) {
        case PieceColor.WHITE:
          return TileOccupation.OCCUPIED_BY_WHITE
        case PieceColor.BLACK:
          return TileOccupation.OCCUPIED_BY_BLACK
      }
    }
    return TileOccupation.EMPTY
  }
)

export const selectNextAvailablePieceId = createSelector(
  selectPiecesById,
  (pieces) => Math.max(0, ...pieces.keys()) + 1
)
