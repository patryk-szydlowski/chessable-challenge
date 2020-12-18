import {createAsyncThunk} from "@reduxjs/toolkit"
import {movePieceThunk, spawnPieceThunk} from "./chessboard.thunks";

export const spawnPiece = createAsyncThunk('@chessboard/spawn-piece', spawnPieceThunk)
export const movePiece = createAsyncThunk('@chessboard/move-piece', movePieceThunk)
