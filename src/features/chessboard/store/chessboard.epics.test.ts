import {Map, Set} from "immutable"
import {of} from "rxjs"
import {marbles} from "rxjs-marbles/jest"
import {actions, state} from "common/utils"
import {MovePiece, SpawnPiece} from "features/chessboard/types"
import {chessboardSlice} from "features/chessboard/utils"
import {
  Piece,
  PieceColor,
  PieceSpecialState,
  PieceType
} from "features/piece/types"
import {movePieceEpic, spawnPieceEpic} from "./chessboard.epics"
import {capturePiece, movePiece, spawnPiece} from "./chessboard.actions"

describe("chessboard epics", () => {
  describe("spawn piece epic", () => {
    test("returns spawn piece success when spawn position is not occupied", marbles((context) => {
      // given
      const existingPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1},
        specialStates: Set()
      }

      const slice = chessboardSlice({
        pieces: Map([[existingPiece.id, existingPiece]])
      })

      const payload: SpawnPiece = {
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 0, y: 0}
      }

      const spawnedPiece: Piece = {
        id: 2,
        ...payload,
        specialStates: Set([PieceSpecialState.FIRST_MOVE])
      }


      const actions$ = actions(context.hot("a", {a: spawnPiece.request(payload)}))
      const state$ = state(of(slice))

      const expected = context.hot("a", {a: spawnPiece.success({spawnedPiece})})

      // when
      const result = spawnPieceEpic(actions$, state$, {})

      // then
      context.expect(result).toBeObservable(expected)
    }))

    test("returns spawn piece failure when spawn position is occupied", marbles((context) => {
      // given
      const existingPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1},
        specialStates: Set()
      }

      const slice = chessboardSlice({
        pieces: Map([[existingPiece.id, existingPiece]])
      })

      const payload: SpawnPiece = {
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1}
      }


      const actions$ = actions(context.hot("a", {a: spawnPiece.request(payload)}))
      const state$ = state(of(slice))

      const expected = context.hot("a", {a: spawnPiece.failure({})})

      // when
      const result = spawnPieceEpic(actions$, state$, {})

      // then
      context.expect(result).toBeObservable(expected)
    }))
  })

  describe("move piece epic", () => {
    test("returns move piece success when move position is not occupied and move is legal", marbles((context) => {
      // given
      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1},
        specialStates: Set()
      }

      const slice = chessboardSlice({
        pieces: Map([[pieceToMove.id, pieceToMove]])
      })

      const payload: MovePiece = {
        pieceId: pieceToMove.id,
        movePosition: {x: 1, y: 2}
      }

      const movedPiece: Piece = {
        ...pieceToMove,
        position: payload.movePosition
      }

      const actions$ = actions(context.hot("a", {a: movePiece.request(payload)}))
      const state$ = state(of(slice))

      const expected = context.hot("a", {a: movePiece.success({movedPiece})})

      // when
      const result = movePieceEpic(actions$, state$, {})

      // then
      context.expect(result).toBeObservable(expected)
    }))

    test("returns move piece success when move is a first-move scenario", marbles((context) => {
      // given
      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1},
        specialStates: Set([PieceSpecialState.FIRST_MOVE])
      }

      const slice = chessboardSlice({
        pieces: Map([[pieceToMove.id, pieceToMove]])
      })

      const payload: MovePiece = {
        pieceId: pieceToMove.id,
        movePosition: {x: 1, y: 3}
      }

      const movedPiece: Piece = {
        ...pieceToMove,
        position: payload.movePosition,
        specialStates: Set()
      }

      const actions$ = actions(context.hot("a", {a: movePiece.request(payload)}))
      const state$ = state(of(slice))

      const expected = context.hot("a", {a: movePiece.success({movedPiece})})

      // when
      const result = movePieceEpic(actions$, state$, {})

      // then
      context.expect(result).toBeObservable(expected)
    }))

    test("returns move piece success and piece capture when move position is occupied by different color", marbles((context) => {
      // given
      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1},
        specialStates: Set()
      }

      const pieceToCapture: Piece = {
        id: 2,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 2, y: 2},
        specialStates: Set()
      }

      const slice = chessboardSlice({
        pieces: Map([
          [pieceToMove.id, pieceToMove],
          [pieceToCapture.id, pieceToCapture],
        ])
      })

      const payload: MovePiece = {
        pieceId: pieceToMove.id,
        movePosition: pieceToCapture.position
      }

      const movedPiece: Piece = {
        ...pieceToMove,
        position: payload.movePosition
      }

      const actions$ = actions(context.hot("a", {a: movePiece.request(payload)}))
      const state$ = state(of(slice))

      const expected = context.hot("(ab)", {
        a: movePiece.success({movedPiece}),
        b: capturePiece({capturedPieceId: pieceToCapture.id})
      })

      // when
      const result = movePieceEpic(actions$, state$, {})

      // then
      context.expect(result).toBeObservable(expected)
    }))

    test("returns move piece failure when piece does not exist on the chessboard", marbles((context) => {
      // given
      const existingPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1},
        specialStates: Set()
      }

      const slice = chessboardSlice({
        pieces: Map([[existingPiece.id, existingPiece]])
      })

      const payload: MovePiece = {
        pieceId: 2,
        movePosition: {x: 1, y: 2}
      }

      const actions$ = actions(context.hot("a", {a: movePiece.request(payload)}))
      const state$ = state(of(slice))

      const expected = context.hot("a", {a: movePiece.failure({})})

      // when
      const result = movePieceEpic(actions$, state$, {})

      // then
      context.expect(result).toBeObservable(expected)
    }))

    test("returns move piece failure when move is illegal", marbles((context) => {
      // given
      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1},
        specialStates: Set()
      }

      const slice = chessboardSlice({
        pieces: Map([[pieceToMove.id, pieceToMove]])
      })

      const payload: MovePiece = {
        pieceId: pieceToMove.id,
        movePosition: {x: 7, y: 1}
      }

      const actions$ = actions(context.hot("a", {a: movePiece.request(payload)}))
      const state$ = state(of(slice))

      const expected = context.hot("a", {a: movePiece.failure({})})

      // when
      const result = movePieceEpic(actions$, state$, {})

      // then
      context.expect(result).toBeObservable(expected)
    }))

    test("returns move piece failure when move position is occupied by same color", marbles((context) => {
      // given
      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1},
        specialStates: Set()
      }

      const existingPiece: Piece = {
        id: 2,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 2},
        specialStates: Set()
      }

      const slice = chessboardSlice({
        pieces: Map([
          [pieceToMove.id, pieceToMove],
          [existingPiece.id, existingPiece],
        ])
      })

      const payload: MovePiece = {
        pieceId: pieceToMove.id,
        movePosition: existingPiece.position
      }

      const actions$ = actions(context.hot("a", {a: movePiece.request(payload)}))
      const state$ = state(of(slice))

      const expected = context.hot("a", {a: movePiece.failure({})})

      // when
      const result = movePieceEpic(actions$, state$, {})

      // then
      context.expect(result).toBeObservable(expected)
    }))
  })
})
