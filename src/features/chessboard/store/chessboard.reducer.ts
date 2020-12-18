import {createReducer} from "@reduxjs/toolkit"
import {serializePosition} from "features/chessboard/utils"
import {movePiece, spawnPiece} from "./chessboard.actions"
import {initialState} from "./chessboard.state"

export const chessboardReducer = createReducer(initialState, builder => builder
  .addCase(spawnPiece.fulfilled, ({pieces}, action) => {
    const {piece, position} = action.payload
    pieces.set(serializePosition(position), piece)
  })
  .addCase(movePiece.fulfilled, ({pieces}, action) => {
    const {piece, fromPosition, toPosition} = action.payload
    pieces.delete(serializePosition(fromPosition))
    pieces.set(serializePosition(toPosition), piece)
  })
)
