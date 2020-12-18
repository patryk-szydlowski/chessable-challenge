import {createSelector} from "@reduxjs/toolkit"
import {
  ChessboardState,
  ChessboardStateSlice,
  TileOccupation
} from "features/chessboard/types"
import {serializePosition} from "features/chessboard/utils";
import {PieceColor, PieceId, PiecePosition} from "features/piece/types";

const selectChessboardFeature = (state: ChessboardStateSlice): ChessboardState =>
  state.chessboard

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
  (piecesById) => new Map(
    [...piecesById.values()].map(piece => ([serializePosition(piece.position), piece]))
  )
)

export const selectPieceById = createSelector(
  selectPiecesById,
  (piecesById) => (id: PieceId) => piecesById.get(id)
)

export const selectPieceByPosition = createSelector(
  selectPiecesByPosition,
  (piecesByPosition) => (position: PiecePosition) =>
    piecesByPosition.get(serializePosition(position))
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
