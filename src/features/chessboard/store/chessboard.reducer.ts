import {createReducer} from "@reduxjs/toolkit"
import {Piece, PieceSpecialState} from "features/piece/types"
import {capturePiece, movePiece, spawnPiece} from "./chessboard.actions"
import {initialState} from "./chessboard.state"

export const chessboardReducer = createReducer(initialState, builder => builder
  .addCase(spawnPiece.fulfilled, ({pieces}, action) => {
    const {payload: piecePayload} = action
    const pieceId = Math.max(-1, ...pieces.keys()) + 1
    const piece: Piece = {
      ...piecePayload,
      id: pieceId,
      specialStates: new Set([PieceSpecialState.FIRST_MOVE])
    }
    pieces.set(pieceId, piece)
  })
  .addCase(movePiece.fulfilled, ({pieces}, action) => {
    const {piece, toPosition} = action.payload

    const updatedStates = new Set([...piece.specialStates])
    updatedStates.delete(PieceSpecialState.FIRST_MOVE)

    const movedPiece: Piece = {
      ...piece,
      position: toPosition,
      specialStates: updatedStates
    }

    pieces.set(piece.id, movedPiece)
  })
  .addCase(capturePiece.fulfilled, ({pieces}, action) => {
    const {piece, capturedPiece} = action.payload

    const movedPiece: Piece = {
      ...piece,
      position: capturedPiece.position
    }

    pieces.set(piece.id, movedPiece)
    pieces.delete(capturedPiece.id)
  })
)
