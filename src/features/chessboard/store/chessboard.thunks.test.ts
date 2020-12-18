import {MovePiece, SpawnPiece} from "features/chessboard/types"
import {chessboardSlice} from "features/chessboard/utils"
import {Piece, PieceColor, PiecePosition, PieceType} from "features/piece/types"
import {movePiece, spawnPiece} from "./chessboard.actions"

describe('chessboard thunks', () => {
  describe('spawn piece thunk', () => {
    test('successfully spawns piece when spawn position is not occupied', async () => {
      // given
      const existingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([[existingPiece.id, existingPiece]])
      })

      const piecePayload: SpawnPiece = {
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 1}
      }

      const thunk = spawnPiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(spawnPiece.fulfilled.type)
      expect(result.payload).toEqual(piecePayload)
    })

    test('rejects piece spawn when spawn position is occupied', async () => {
      // given
      const spawnPosition: PiecePosition = {x: 3, y: 3}

      const existingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: spawnPosition,
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([[existingPiece.id, existingPiece]])
      })

      const piecePayload: SpawnPiece = {
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: spawnPosition
      }

      const thunk = spawnPiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(spawnPiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })
  })

  describe('move piece thunk', () => {
    test('successfully moves piece when target position is not occupied', async () => {
      // given
      const existingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 5, y: 3},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([
          [existingPiece.id, existingPiece],
          [pieceToMove.id, pieceToMove]
        ])
      })

      const piecePayload: MovePiece = {
        piece: pieceToMove,
        toPosition: {x: 5, y: 4}
      }

      const thunk = movePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(movePiece.fulfilled.type)
      expect(result.payload).toEqual(piecePayload)
    })

    test('rejects piece move when target position is occupied', async () => {
      // given
      const existingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 5, y: 3},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([
          [existingPiece.id, existingPiece],
          [pieceToMove.id, pieceToMove]
        ])
      })

      const piecePayload: MovePiece = {
        piece: pieceToMove,
        toPosition: existingPiece.position
      }

      const thunk = movePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(movePiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })

    test('rejects piece move when move is not legal', async () => {
      // given
      const existingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 5, y: 3},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([
          [existingPiece.id, existingPiece],
          [pieceToMove.id, pieceToMove]
        ])
      })

      const piecePayload: MovePiece = {
        piece: pieceToMove,
        toPosition: {x: 4, y: 4}
      }

      const thunk = movePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(movePiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })

    test('rejects piece move when piece does not exist on the chessboard', async () => {
      // given
      const pieceToMove: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 5, y: 3},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map()
      })

      const piecePayload: MovePiece = {
        piece: pieceToMove,
        toPosition: {x: 4, y: 4}
      }

      const thunk = movePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(movePiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })
  })
})
