import {createAsyncAction} from "typesafe-actions"
import {
  CapturedPiece,
  CapturePiece,
  ChessboardError,
  MovedPiece,
  MovePiece,
  SpawnedPiece,
  SpawnPiece
} from "features/chessboard/types"

export const spawnPiece = createAsyncAction(
  '@chessboard/spawn-piece/request',
  '@chessboard/spawn-piece/success',
  '@chessboard/spawn-piece/failure',
)<SpawnPiece, SpawnedPiece, ChessboardError>()

export const movePiece = createAsyncAction(
  '@chessboard/move-piece/request',
  '@chessboard/move-piece/success',
  '@chessboard/move-piece/failure',
)<MovePiece, MovedPiece, ChessboardError>()

export const capturePiece = createAsyncAction(
  '@chessboard/capture-piece/request',
  '@chessboard/capture-piece/success',
  '@chessboard/capture-piece/failure',
)<CapturePiece, CapturedPiece, ChessboardError>()
