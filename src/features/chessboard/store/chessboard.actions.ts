import {createAction, createAsyncAction} from "typesafe-actions"
import {
  CapturedPiece,
  ChessboardError,
  MovedPiece,
  MovePiece,
  SelectPiece,
  SpawnedPiece,
  SpawnPiece,
  SpawnPieceAtRandomPosition
} from "features/chessboard/types"
import {Position} from "features/piece/types"

export const spawnPiece = createAsyncAction(
  "@chessboard/spawn-piece/request",
  "@chessboard/spawn-piece/success",
  "@chessboard/spawn-piece/failure",
)<SpawnPiece, SpawnedPiece, ChessboardError>()

export const spawnPieceAtRandomPosition = createAsyncAction(
  "@chessboard/spawn-piece-at-random-position/request",
  "@chessboard/spawn-piece-at-random-position/success",
  "@chessboard/spawn-piece-at-random-position/failure",
)<SpawnPieceAtRandomPosition, void, ChessboardError>()

export const movePiece = createAsyncAction(
  "@chessboard/move-piece/request",
  "@chessboard/move-piece/success",
  "@chessboard/move-piece/failure",
)<MovePiece, MovedPiece, ChessboardError>()

export const capturePiece = createAction(
  "@chessboard/capture-piece",
)<CapturedPiece>()

export const selectPiece = createAction(
  "@chessboard/select-piece",
)<SelectPiece>()

export const unselectPiece = createAction(
  "@chessboard/unselect-piece",
)<void>()

export const resetBoard = createAction(
  "@chessboard/reset-board"
)<void>()

export const interactWithTile = createAction(
  "@chessboard/interact-with-tile"
)<Position>()
