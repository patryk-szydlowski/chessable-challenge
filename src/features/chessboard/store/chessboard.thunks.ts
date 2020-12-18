import {
  ChessboardThunk,
  MovePiece,
  SpawnPiece,
  TileOccupation
} from "features/chessboard/types"
import {isLegalPieceMove} from "features/piece/moves"
import {
  PieceMove,
  PieceMoveScenario,
  PieceSpecialState
} from "features/piece/types";
import {
  selectBoardSize,
  selectPieceById,
  selectTileOccupation
} from "./chessboard.selectors"


export const spawnPieceThunk: ChessboardThunk<SpawnPiece, SpawnPiece> =
  (spawnPiece, {getState, rejectWithValue}) => {
    const {position} = spawnPiece
    const state = getState()
    const tileOccupation = selectTileOccupation(state)(position)

    return tileOccupation === TileOccupation.EMPTY
      ? spawnPiece
      : rejectWithValue(spawnPiece);
  }

export const movePieceThunk: ChessboardThunk<MovePiece, MovePiece> =
  (movePiece, {getState, rejectWithValue}) => {
    const {piece, toPosition} = movePiece
    const state = getState()
    const boardSize = selectBoardSize(state)
    const tileOccupation = selectTileOccupation(state)(toPosition)
    const pieceExists = !!selectPieceById(state)(piece.id)

    const move: PieceMove = {
      xOffset: toPosition.x - piece.position.x,
      yOffset: toPosition.y - piece.position.y,
      scenario: piece.specialStates.has(PieceSpecialState.FIRST_MOVE)
        ? PieceMoveScenario.FIRST_MOVE
        : PieceMoveScenario.MOVE
    }

    return pieceExists
    && tileOccupation === TileOccupation.EMPTY
    && isLegalPieceMove(piece, move, boardSize)
      ? movePiece
      : rejectWithValue(movePiece)
  }
