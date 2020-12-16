import {createSelector} from "@reduxjs/toolkit"
import {
  ChessboardState,
  ChessboardStateSlice,
  TilePosition
} from "features/chessboard/types"
import {serializePosition} from "features/chessboard/utils"

const selectChessboardFeature = (state: ChessboardStateSlice): ChessboardState =>
  state.chessboard

export const selectPieces = createSelector(
  selectChessboardFeature,
  ({pieces}) => pieces
)

export const selectPieceByPosition = createSelector(
  selectPieces,
  (pieces) => (position: TilePosition) => pieces.get(serializePosition(position))
)
