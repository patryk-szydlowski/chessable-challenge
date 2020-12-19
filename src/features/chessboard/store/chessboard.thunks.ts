import {
  CapturedPiece,
  CapturePiece,
  ChessboardThunk,
  MoveOrCapturePiece,
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
import {capturePiece, movePiece} from "./chessboard.actions";
import {
  selectBoardSize,
  selectPieceById,
  selectPieceByPosition,
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

export const moveOrCapturePieceThunk: ChessboardThunk<MoveOrCapturePiece> =
  (pieceMove, {getState, dispatch}) => {
    const {piece, position} = pieceMove
    const state = getState()
    const tileOccupation = selectTileOccupation(state)(position)

    if (tileOccupation === TileOccupation.EMPTY) {
      dispatch(movePiece({piece, movePosition: position}))
    } else {
      dispatch(capturePiece({piece, capturePosition: position}))
    }
  }

export const movePieceThunk: ChessboardThunk<MovePiece, MovePiece> =
  (movePiece, {getState, rejectWithValue}) => {
    const {piece, movePosition} = movePiece
    const state = getState()
    const boardSize = selectBoardSize(state)
    const tileOccupation = selectTileOccupation(state)(movePosition)
    const pieceExists = !!selectPieceById(state)(piece.id)

    const move: PieceMove = {
      xOffset: movePosition.x - piece.position.x,
      yOffset: movePosition.y - piece.position.y,
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

export const capturePieceThunk: ChessboardThunk<CapturePiece, CapturedPiece> =
  (capturePiece, {getState, rejectWithValue}) => {
    const {piece, capturePosition} = capturePiece
    const state = getState()
    const boardSize = selectBoardSize(state)
    const pieceToCapture = selectPieceByPosition(state)(capturePosition)
    const pieceExists = !!selectPieceById(state)(piece.id)

    const move: PieceMove = {
      xOffset: capturePosition.x - piece.position.x,
      yOffset: capturePosition.y - piece.position.y,
      scenario: PieceMoveScenario.CAPTURE
    }

    return pieceExists
    && !!pieceToCapture
    && piece.color !== pieceToCapture.color
    && isLegalPieceMove(piece, move, boardSize)
      ? {piece, capturedPiece: pieceToCapture}
      : rejectWithValue(capturePiece)
  }
