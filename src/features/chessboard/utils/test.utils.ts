import {Map} from "immutable"
import {ChessboardState, ChessboardStateSlice} from "features/chessboard/types"

export function chessboardSlice(state: Partial<ChessboardState>): ChessboardStateSlice {
  return {chessboard: chessboardState(state)}
}

export function chessboardState(state: Partial<ChessboardState>): ChessboardState {
  return {boardSize: 8, pieces: Map(), ...state}
}
