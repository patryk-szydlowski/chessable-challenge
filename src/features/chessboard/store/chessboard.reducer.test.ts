import {Map, Set} from "immutable"
import {ChessboardError} from "features/chessboard/types"
import {chessboardState} from "features/chessboard/utils"
import {
  Piece,
  PieceColor,
  PieceSpecialState,
  PieceType
} from "features/piece/types"
import {
  capturePiece,
  dismissError,
  movePiece,
  resetBoard,
  selectPiece,
  spawnPiece,
  spawnPieceAtRandomPosition,
  unselectPiece
} from "./chessboard.actions"
import {chessboardReducer} from "./chessboard.reducer"
import {initialState} from "./chessboard.state"

describe("chessboard reducer", () => {
  test("spawns piece and unselects piece on spawn piece success action", () => {
    // given
    const spawnedPiece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set([PieceSpecialState.FIRST_MOVE])
    }

    const state = chessboardState({
      selectedPieceId: 1
    })

    const action = spawnPiece.success({spawnedPiece})

    const expectedState = chessboardState({
      pieces: Map([[spawnedPiece.id, spawnedPiece]]),
      selectedPieceId: undefined
    })

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test("moves piece and unselects piece on move piece success action", () => {
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
      pieces: Map([[piece.id, piece]]),
      selectedPieceId: 1
    })

    const action = movePiece.success({movedPiece})

    const expectedState = chessboardState({
      pieces: Map([[piece.id, movedPiece]]),
      selectedPieceId: undefined
    })

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test("captures piece on capture piece success action", () => {
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

  test("selects piece on select piece action", () => {
    // given
    const selectedPieceId = 1
    const state = chessboardState({})

    const action = selectPiece({selectedPieceId})

    const expectedState = chessboardState({selectedPieceId})

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test("unselects piece on unselect piece action", () => {
    // given
    const state = chessboardState({selectedPieceId: 1})

    const action = unselectPiece()

    const expectedState = chessboardState({selectedPieceId: undefined})

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test("returns to initial state on reset board action", () => {
    // given
    const state = chessboardState({
      boardSize: 4,
      pieces: Map(),
      selectedPieceId: 1
    })

    const action = resetBoard()

    const expectedState = chessboardState(initialState)

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test.each([
    ["spawn piece", spawnPiece.failure],
    ["spawn piece at random location", spawnPieceAtRandomPosition.failure],
    ["move piece", movePiece.failure]
  ])("stores error on %s failure action", (_, actionCreator) => {
    // given
    const error: ChessboardError = {message: "error message"}
    const state = chessboardState({})

    const action = actionCreator(error)

    const expectedState = chessboardState({error})

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })

  test("removes error on dismiss error action", () => {
    // given
    const error: ChessboardError = {message: "error message"}
    const state = chessboardState({error})

    const action = dismissError()

    const expectedState = chessboardState({})

    // when
    const nextState = chessboardReducer(state, action)

    // then
    expect(nextState).toEqual(expectedState)
  })
})
