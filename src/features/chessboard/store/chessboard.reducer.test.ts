import {
  CapturedPiece,
  CapturePiece,
  MovePiece,
  SpawnPiece
} from "features/chessboard/types";
import {chessboardState} from "features/chessboard/utils"
import {
  Piece,
  PieceColor,
  PieceSpecialState,
  PieceType
} from "features/piece/types"
import {chessboardReducer} from "./chessboard.reducer"
import {capturePiece, movePiece, spawnPiece} from "./chessboard.actions"

describe('chessboard reducer', () => {
  test('spawns piece on spawn piece fulfilled action', () => {
    // given
    const state = chessboardState({})

    const piecePayload: SpawnPiece = {
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0}
    }

    const action = spawnPiece.fulfilled(piecePayload, '', piecePayload)

    const expectedPiece: Piece = {
      id: 0,
      ...piecePayload,
      specialStates: new Set([PieceSpecialState.FIRST_MOVE])
    }

    const expectedState = chessboardState({
      pieces: new Map([[expectedPiece.id, expectedPiece]])
    })

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test('moves piece on move piece fulfilled action', () => {
    // given
    const existingPiece: Piece = {
      id: 0,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: new Set([PieceSpecialState.FIRST_MOVE])
    }

    const state = chessboardState({
      pieces: new Map([[existingPiece.id, existingPiece]])
    })

    const piecePayload: MovePiece = {
      piece: existingPiece,
      toPosition: {x: 0, y: 2}
    }

    const action = movePiece.fulfilled(piecePayload, '', piecePayload)

    const expectedMovedPiece: Piece = {
      ...existingPiece,
      position: piecePayload.toPosition,
      specialStates: new Set([])
    }

    const expectedState = chessboardState({
      pieces: new Map([[expectedMovedPiece.id, expectedMovedPiece]])
    })

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test('captures piece on capture piece fulfilled action', () => {
    // given
    const piece: Piece = {
      id: 0,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: new Set()
    }

    const capturedPiece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.BLACK,
      position: {x: 1, y: 1},
      specialStates: new Set()
    }

    const state = chessboardState({
      pieces: new Map([
        [piece.id, piece],
        [capturedPiece.id, capturedPiece]
      ])
    })

    const piecePayload: CapturePiece = {
      piece,
      capturePosition: capturedPiece.position
    }

    const resultPayload: CapturedPiece = {
      piece,
      capturedPiece
    }

    const action = capturePiece.fulfilled(resultPayload, '', piecePayload)

    const expectedMovedPieceAfterCapture: Piece = {
      ...piece,
      position: capturedPiece.position
    }

    const expectedState = chessboardState({
      pieces: new Map([
        [expectedMovedPieceAfterCapture.id, expectedMovedPieceAfterCapture]
      ])
    })

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })
})
