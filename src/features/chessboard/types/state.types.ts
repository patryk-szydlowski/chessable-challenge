import {PieceDefinition} from "features/piece/types"

export type ChessboardState = {
  pieces: Map<string, PieceDefinition | undefined>
}

export type ChessboardStateSlice = {
  chessboard: ChessboardState
}
