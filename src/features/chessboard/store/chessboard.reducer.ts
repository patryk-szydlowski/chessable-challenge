import {Action, createReducer} from "typesafe-actions"
import {ChessboardState} from "features/chessboard/types"
import {
  capturePiece,
  dismissError,
  movePiece,
  resetBoard,
  selectPiece,
  spawnPiece,
  spawnPieceAtRandomPosition,
  unselectPiece
} from "./chessboard.actions"
import {initialState} from "./chessboard.state"

export const chessboardReducer = createReducer<ChessboardState, Action>(initialState)
  .handleAction(spawnPiece.success, (state, {payload: {spawnedPiece}}) => ({
    ...state,
    pieces: state.pieces.set(spawnedPiece.id, spawnedPiece),
    selectedPieceId: undefined,
  }))
  .handleAction(movePiece.success, (state, {payload: {movedPiece}}) => ({
    ...state,
    pieces: state.pieces.set(movedPiece.id, movedPiece),
    selectedPieceId: undefined,
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
  .handleAction([
    spawnPiece.failure,
    spawnPieceAtRandomPosition.failure,
    movePiece.failure
  ], (state, {payload: error}) => ({
    ...state,
    error
  }))
  .handleAction(dismissError, (state) => ({
    ...state,
    error: undefined
  }))
