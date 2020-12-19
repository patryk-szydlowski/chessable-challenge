import {Map, Set} from "immutable"
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
  test('spawns piece on spawn piece success action', () => {
    // given
    const spawnedPiece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set([PieceSpecialState.FIRST_MOVE])
    }

    const state = chessboardState({})

    const action = spawnPiece.success({spawnedPiece})

    const expectedState = chessboardState({
      pieces: Map([[spawnedPiece.id, spawnedPiece]])
    })

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test('moves piece on move piece success action', () => {
    // given
    const piece: Piece = {
      id: 0,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set([PieceSpecialState.FIRST_MOVE])
    }

    const movedPiece: Piece = {
      ...piece,
      position: {x: 1, y: 1}
    }

    const state = chessboardState({
      pieces: Map([[piece.id, piece]])
    })

    const action = movePiece.success({movedPiece})

    const expectedState = chessboardState({
      pieces: Map([[piece.id, movedPiece]])
    })

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test('captures piece on capture piece success action', () => {
    // given
    const capturedPiece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.BLACK,
      position: {x: 1, y: 1},
      specialStates: Set()
    }

    const state = chessboardState({
      pieces: Map([[capturedPiece.id, capturedPiece]])
    })

    const action = capturePiece({capturedPieceId: capturedPiece.id})

    const expectedState = chessboardState({
      pieces: Map()
    })

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })
})
