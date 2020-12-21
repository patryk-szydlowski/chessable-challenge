import {Action, createReducer} from "typesafe-actions"
import {ChessboardState} from "features/chessboard/types"
import {
  capturePiece,
  movePiece,
  resetBoard,
  selectPiece,
  spawnPiece,
  unselectPiece
} from "./chessboard.actions"
import {initialState} from "./chessboard.state"

export const chessboardReducer = createReducer<ChessboardState, Action>(initialState)
  .handleAction(spawnPiece.success, (state, {payload: {spawnedPiece}}) => ({
    ...state,
    pieces: state.pieces.set(spawnedPiece.id, spawnedPiece)
  }))
  .handleAction(movePiece.success, (state, {payload: {movedPiece}}) => ({
    ...state,
    pieces: state.pieces.set(movedPiece.id, movedPiece)
  }))
  .handleAction(capturePiece, (state, {payload: {capturedPieceId}}) => ({
    ...state,
    pieces: state.pieces.delete(capturedPieceId)
  }))
  .handleAction(selectPiece, (state, {payload: {selectedPieceId}}) => ({
    ...state,
    selectedPieceId
  }))
  .handleAction(unselectPiece, (state) => ({
    ...state,
    selectedPieceId: undefined
  }))
  .handleAction(resetBoard, () => initialState)
