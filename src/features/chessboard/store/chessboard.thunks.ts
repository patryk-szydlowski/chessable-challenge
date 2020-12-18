import {ChessboardThunk, MovePiece, SpawnPiece} from "features/chessboard/types"
import {isLegalMove, toMove} from "features/piece/moves";
import {MoveScenario} from "features/piece/types";
import {selectTileNotOccupied} from "./chessboard.selectors"

export const spawnPieceThunk: ChessboardThunk<SpawnPiece, SpawnPiece> =
  (spawnPiece, {getState, rejectWithValue}) => {
    const {position} = spawnPiece
    const tileNotOccupied = selectTileNotOccupied(getState())(position)
    return tileNotOccupied
      ? spawnPiece
      : rejectWithValue(spawnPiece)
  }

export const movePieceThunk: ChessboardThunk<MovePiece, MovePiece> =
  (movePiece, {getState, rejectWithValue}) => {
    const {piece, fromPosition, toPosition} = movePiece
    const moveScenarios = new Set([MoveScenario.MOVE])
    const pieceMove = toMove(fromPosition, toPosition, moveScenarios)

    const isPieceMoveLegal = isLegalMove(pieceMove, piece)
    const moveTileNotOccupied = selectTileNotOccupied(getState())(toPosition)

    return isPieceMoveLegal && moveTileNotOccupied
      ? movePiece
      : rejectWithValue(movePiece)
  }
