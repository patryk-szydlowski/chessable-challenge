import {createSelector} from "@reduxjs/toolkit"
import {
  ChessboardState,
  ChessboardStateSlice,
  TilePosition
} from "features/chessboard/types"
import {serializePosition} from "features/chessboard/utils"
import {PieceDefinition} from "features/piece/types";

const selectChessboardFeature = (state: ChessboardStateSlice): ChessboardState =>
  state.chessboard

export const selectPieces = createSelector(
  selectChessboardFeature,
  ({pieces}) => pieces
)

export const selectPieceByPosition = createSelector(
  selectPieces,
  (pieces) => (position: TilePosition): PieceDefinition | undefined =>
    pieces.get(serializePosition(position))
)

export const selectTileOccupied = createSelector(
  selectPieceByPosition,
  (pieceByPositionSelector) => (position: TilePosition): boolean =>
    !!pieceByPositionSelector(position)
)

export const selectTileNotOccupied = createSelector(
  selectTileOccupied,
  (tileOccupiedSelector) => (position: TilePosition): boolean =>
    !tileOccupiedSelector(position)
)
