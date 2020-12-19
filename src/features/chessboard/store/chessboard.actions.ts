import {createAsyncThunk} from "@reduxjs/toolkit"
import {
  capturePieceThunk,
  moveOrCapturePieceThunk,
  movePieceThunk,
  spawnPieceThunk
} from "./chessboard.thunks"

export const spawnPiece = createAsyncThunk('@chessboard/spawn-piece', spawnPieceThunk)
export const moveOrCapturePiece = createAsyncThunk('@chessboard/move-or-capture-piece', moveOrCapturePieceThunk)
export const movePiece = createAsyncThunk('@chessboard/move-piece', movePieceThunk)
export const capturePiece = createAsyncThunk('@chessboard/capture-piece', capturePieceThunk)
