import {createSelector} from "@reduxjs/toolkit"
import {
  ChessboardState,
  ChessboardStateSlice,
  TilePosition
} from "features/chessboard/types";

const selectChessboardFeature = (state: ChessboardStateSlice): ChessboardState =>
  state.chessboard

export const selectPieces = createSelector(
  selectChessboardFeature,
  ({pieces}) => pieces
)

export const selectChessboardSize = createSelector(
  selectChessboardFeature,
  ({chessboardSize}) => chessboardSize
)

export const selectTilePiece = createSelector(
  selectPieces,
  selectChessboardSize,
  (pieces, chessboardSize) => ({row, column}: TilePosition) =>
    pieces.get(row * chessboardSize + column)
)
