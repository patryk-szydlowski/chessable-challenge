import {TileOccupation} from "features/chessboard/types"
import {chessboardSlice} from "features/chessboard/utils"
import {Piece, PieceColor, PieceId, PieceType} from "features/piece/types"
import {
  selectBoardSize,
  selectNextAvailablePieceId,
  selectPieceById,
  selectPieceByPosition,
  selectPiecesById,
  selectPiecesByPosition,
  selectTileOccupation
} from "./chessboard.selectors"

describe('chessboard selectors', () => {
  describe('board size selector', () => {
    test('returns board size', () => {
      // given
      const boardSize = 10

      const state = chessboardSlice({boardSize})

      // expect
      expect(selectBoardSize(state)).toEqual(boardSize)
    })
  })

  describe('pieces by id selector', () => {
    test('returns chessboard pieces by their id', () => {
      // given
      const firstPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const secondPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 7},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [firstPiece.id, firstPiece],
        [secondPiece.id, secondPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPiecesById(state)).toEqual(pieces)
    })
  })

  describe('pieces by position selector', () => {
    test('returns chessboard pieces by their serialized position', () => {
      // given
      const firstPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const secondPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 7},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [firstPiece.id, firstPiece],
        [secondPiece.id, secondPiece],
      ])

      const expectedPiecesByPosition = new Map<string, Piece>([
        ['2-0', firstPiece],
        ['1-7', secondPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPiecesByPosition(state)).toEqual(expectedPiecesByPosition)
    })
  })

  describe('piece by id selector', () => {
    test('returns piece by id when exists on the chessboard', () => {
      // given
      const matchingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [matchingPiece.id, matchingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPieceById(state)(matchingPiece.id)).toEqual(matchingPiece)
    })

    test('returns undefined when piece by id does not exist on the chessboard', () => {
      // given
      const notMatchingPiece: Piece = {
        id: 10,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [notMatchingPiece.id, notMatchingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPieceById(state)(0)).toBeUndefined()
    })
  })

  describe('piece by position selector', () => {
    test('returns piece by position when exists on the chessboard', () => {
      // given
      const firstPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [firstPiece.id, firstPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPieceByPosition(state)(firstPiece.position)).toEqual(firstPiece)
    })

    test('returns undefined when piece by position does not exist on the chessboard', () => {
      // given
      const notMatchingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 5},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [notMatchingPiece.id, notMatchingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPieceByPosition(state)({x: 0, y: 0})).toBeUndefined()
    })
  })

  describe('tile occupation selector', () => {
    test('returns indication that tile is occupied by white', () => {
      // given
      const occupyingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [occupyingPiece.id, occupyingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectTileOccupation(state)(occupyingPiece.position)).toEqual(TileOccupation.OCCUPIED_BY_WHITE)
    })

    test('returns indication that tile is occupied by black', () => {
      // given
      const occupyingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [occupyingPiece.id, occupyingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectTileOccupation(state)(occupyingPiece.position)).toEqual(TileOccupation.OCCUPIED_BY_BLACK)
    })

    test('returns indication that tile is empty', () => {
      // given
      const position = {x: 0, y: 0}
      const notOccupyingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [notOccupyingPiece.id, notOccupyingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectTileOccupation(state)(position)).toEqual(TileOccupation.EMPTY)
    })
  })

  describe('next available piece id selector', () => {
    test('returns next available piece id', () => {
      // given
      const existingPiece: Piece = {
        id: 10,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: new Set()
      }

      const pieces = new Map<PieceId, Piece>([
        [existingPiece.id, existingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectNextAvailablePieceId(state)).toEqual(existingPiece.id + 1)
    })

    test('returns next available piece id when no pieces exist', () => {
      // given
      const state = chessboardSlice({})

      // expect
      expect(selectNextAvailablePieceId(state)).toEqual(1)
    })
  })
})
