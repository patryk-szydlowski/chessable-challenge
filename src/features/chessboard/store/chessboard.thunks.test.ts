import {
  CapturedPiece,
  CapturePiece,
  MoveOrCapturePiece,
  MovePiece,
  SpawnPiece
} from "features/chessboard/types"
import {chessboardSlice} from "features/chessboard/utils"
import {Piece, PieceColor, PiecePosition, PieceType} from "features/piece/types"
import {
  capturePiece,
  moveOrCapturePiece,
  movePiece,
  spawnPiece
} from "./chessboard.actions"

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

  // todo: fix this
  describe.skip('move or capture piece thunk', () => {
    test('moves piece when target position is not occupied', async () => {
      // given
      const dispatchMock = jest.fn()

      const piece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([[piece.id, piece]])
      })

      const piecePayload: MoveOrCapturePiece = {
        piece,
        position: {x: 4, y: 3}
      }

      const expectedMovePiecePayload: MovePiece = {
        piece,
        movePosition: piecePayload.position
      }

      const thunk = moveOrCapturePiece(piecePayload)

      // when
      const result = await thunk(dispatchMock, () => state, undefined)

      // then
      expect(result.type).toEqual(moveOrCapturePiece.fulfilled.type)
      expect(dispatchMock).toBeCalledTimes(3)
      expect(dispatchMock.mock.calls[0].type).toEqual(moveOrCapturePiece.pending.type)
      expect(dispatchMock.mock.calls[0].type).toEqual(moveOrCapturePiece.pending.type)
      expect(dispatchMock.mock.calls[2].type).toEqual(moveOrCapturePiece.fulfilled.type)
      const call = dispatchMock.mock.calls[1];
      expect(call).toBeDefined()
    })

    test('captures piece when target position is occupied', async () => {

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
        movePosition: {x: 5, y: 4}
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
        movePosition: existingPiece.position
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
        movePosition: {x: 4, y: 4}
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
        movePosition: {x: 4, y: 4}
      }

      const thunk = movePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(movePiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })
  })

  describe('capture piece thunk', () => {
    test('successfully captures piece when target position is occupied by different color', async () => {
      // given
      const piece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const pieceToCapture: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 4, y: 4},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([
          [piece.id, piece],
          [pieceToCapture.id, pieceToCapture]
        ])
      })

      const piecePayload: CapturePiece = {
        piece,
        capturePosition: pieceToCapture.position
      }

      const expectedPayload: CapturedPiece = {
        piece,
        capturedPiece: pieceToCapture
      }

      const thunk = capturePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(capturePiece.fulfilled.type)
      expect(result.payload).toEqual(expectedPayload)
    })

    test('rejects piece capture when target position is not occupied', async () => {
      // given
      const piece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const existingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 4, y: 4},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([
          [piece.id, piece],
          [existingPiece.id, existingPiece]
        ])
      })

      const piecePayload: CapturePiece = {
        piece,
        capturePosition: {x: 2, y: 2}
      }

      const thunk = capturePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(capturePiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })

    test('rejects piece capture when target position is occupied by same color', async () => {
      // given
      const piece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const pieceToCapture: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 4, y: 4},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([
          [piece.id, piece],
          [pieceToCapture.id, pieceToCapture]
        ])
      })

      const piecePayload: CapturePiece = {
        piece,
        capturePosition: pieceToCapture.position
      }

      const thunk = capturePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(capturePiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })

    test('rejects piece capture when move is not legal', async () => {
      // given
      const piece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const pieceToCapture: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 5, y: 4},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([
          [piece.id, piece],
          [pieceToCapture.id, pieceToCapture]
        ])
      })

      const piecePayload: CapturePiece = {
        piece,
        capturePosition: pieceToCapture.position
      }

      const thunk = capturePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(capturePiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })

    test('rejects piece capture when piece does not exist on the chessboard', async () => {
      // given
      const piece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 3, y: 3},
        specialStates: new Set()
      }

      const existingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 4, y: 4},
        specialStates: new Set()
      }

      const state = chessboardSlice({
        pieces: new Map([
          [existingPiece.id, existingPiece]
        ])
      })

      const piecePayload: CapturePiece = {
        piece,
        capturePosition: {x: 2, y: 2}
      }

      const thunk = capturePiece(piecePayload)

      // when
      const result = await thunk(jest.fn(), () => state, undefined)

      // then
      expect(result.type).toEqual(capturePiece.rejected.type)
      expect(result.payload).toEqual(piecePayload)
    })
  })
})
