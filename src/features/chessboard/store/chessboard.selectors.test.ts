import {Map, Set} from "immutable"
import {chessboardSlice} from "features/chessboard/utils"
import {
  Piece,
  PieceColor,
  PieceSpecialState,
  PieceType,
  Position
} from "features/piece/types"
import {
  selectBoardSize,
  selectEmptyPositions,
  selectLegalMoveByPosition,
  selectLegalMovePositions,
  selectNextAvailablePieceId,
  selectPieceById,
  selectPieceByPosition,
  selectPiecesById,
  selectPiecesByPosition,
  selectSelectedPieceId,
  selectTileEmpty
} from "./chessboard.selectors"

describe("chessboard selectors", () => {
  describe("board size selector", () => {
    test("returns board size", () => {
      // given
      const boardSize = 10

      const state = chessboardSlice({boardSize})

      // expect
      expect(selectBoardSize(state)).toEqual(boardSize)
    })
  })

  describe("pieces by id selector", () => {
    test("returns chessboard pieces by their id", () => {
      // given
      const firstPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: Set()
      }

      const secondPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 7},
        specialStates: Set()
      }

      const pieces = Map([
        [firstPiece.id, firstPiece],
        [secondPiece.id, secondPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPiecesById(state)).toEqual(pieces)
    })
  })

  describe("selected piece id selector", () => {
    test("returns selected piece id", () => {
      // given
      const selectedPieceId = 1

      const state = chessboardSlice({selectedPieceId})

      // expect
      expect(selectSelectedPieceId(state)).toEqual(selectedPieceId)
    })
  })

  describe("pieces by position selector", () => {
    test("returns chessboard pieces by their serialized position", () => {
      // given
      const firstPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: Set()
      }

      const secondPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 7},
        specialStates: Set()
      }

      const pieces = Map([
        [firstPiece.id, firstPiece],
        [secondPiece.id, secondPiece],
      ])

      const expectedPiecesByPosition = Map([
        ["2-0", firstPiece],
        ["1-7", secondPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPiecesByPosition(state)).toEqual(expectedPiecesByPosition)
    })
  })

  describe("piece by id selector", () => {
    test("returns piece by id when exists on the chessboard", () => {
      // given
      const matchingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: Set()
      }

      const pieces = Map([
        [matchingPiece.id, matchingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPieceById(state)(matchingPiece.id)).toEqual(matchingPiece)
    })

    test("returns undefined when piece by id does not exist on the chessboard", () => {
      // given
      const notMatchingPiece: Piece = {
        id: 10,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: Set()
      }

      const pieces = Map([
        [notMatchingPiece.id, notMatchingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPieceById(state)(0)).toBeUndefined()
    })
  })

  describe("piece by position selector", () => {
    test("returns piece by position when exists on the chessboard", () => {
      // given
      const firstPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: Set()
      }

      const pieces = Map([
        [firstPiece.id, firstPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPieceByPosition(state)(firstPiece.position)).toEqual(firstPiece)
    })

    test("returns undefined when piece by position does not exist on the chessboard", () => {
      // given
      const notMatchingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 5},
        specialStates: Set()
      }

      const pieces = Map([
        [notMatchingPiece.id, notMatchingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectPieceByPosition(state)({x: 0, y: 0})).toBeUndefined()
    })
  })

  describe("tile occupation selector", () => {
    test("returns indication that tile is not empty", () => {
      // given
      const occupyingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: Set()
      }

      const pieces = Map([
        [occupyingPiece.id, occupyingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectTileEmpty(state)(occupyingPiece.position)).toEqual(false)
    })

    test("returns indication that tile is empty", () => {
      // given
      const position = {x: 0, y: 0}
      const notOccupyingPiece: Piece = {
        id: 0,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 2, y: 0},
        specialStates: Set()
      }

      const pieces = Map([
        [notOccupyingPiece.id, notOccupyingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectTileEmpty(state)(position)).toEqual(true)
    })
  })

  describe("next available piece id selector", () => {
    test("returns next available piece id", () => {
      // given
      const existingPiece: Piece = {
        id: 10,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 2, y: 0},
        specialStates: Set()
      }

      const pieces = Map([
        [existingPiece.id, existingPiece],
      ])

      const state = chessboardSlice({pieces})

      // expect
      expect(selectNextAvailablePieceId(state)).toEqual(existingPiece.id + 1)
    })

    test("returns next available piece id when no pieces exist", () => {
      // given
      const state = chessboardSlice({})

      // expect
      expect(selectNextAvailablePieceId(state)).toEqual(1)
    })
  })

  describe("empty positions selector", () => {
    test("returns all empty positions on the board", () => {
      // given
      const existingPiece: Piece = {
        id: 10,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 0, y: 0},
        specialStates: Set()
      }

      const expectedEmptyPositions: Position[] = [
        {x: 0, y: 1},
        {x: 1, y: 0},
        {x: 1, y: 1}
      ]

      const state = chessboardSlice({
        boardSize: 2,
        pieces: Map([[existingPiece.id, existingPiece]])
      })

      // expect
      expect(selectEmptyPositions(state)).toEqual(expectedEmptyPositions)
    })
  })


  describe("legal move positions selector", () => {
    test("returns legal moves for selected piece", () => {
      // given
      const selectedPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 0},
        specialStates: Set([PieceSpecialState.FIRST_MOVE])
      }

      const firstPieceToCapture: Piece = {
        id: 2,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 2, y: 1},
        specialStates: Set()
      }

      const secondPieceToCapture: Piece = {
        id: 3,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 0, y: 1},
        specialStates: Set()
      }

      const expectedLegalMovePositions: Set<Position> = Set([
        {...selectedPiece.position, y: selectedPiece.position.y + 1},
        {...selectedPiece.position, y: selectedPiece.position.y + 2},
        firstPieceToCapture.position,
        secondPieceToCapture.position
      ])

      const state = chessboardSlice({
        pieces: Map([
          [selectedPiece.id, selectedPiece],
          [firstPieceToCapture.id, firstPieceToCapture],
          [secondPieceToCapture.id, secondPieceToCapture]
        ]),
        selectedPieceId: selectedPiece.id
      })

      // expect
      expect(selectLegalMovePositions(state)).toEqual(expectedLegalMovePositions)
    })

    test("returns empty set when no piece is selected", () => {
      // given
      const existingPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 0},
        specialStates: Set([PieceSpecialState.FIRST_MOVE])
      }

      const state = chessboardSlice({
        pieces: Map([[existingPiece.id, existingPiece]]),
      })

      // expect
      expect(selectLegalMovePositions(state)).toEqual(Set())
    })

    test("filters out first move legal moves when selected piece already moved", () => {
      // given
      const selectedPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 0},
        specialStates: Set()
      }

      const firstPieceToCapture: Piece = {
        id: 2,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 2, y: 1},
        specialStates: Set()
      }

      const secondPieceToCapture: Piece = {
        id: 3,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 0, y: 1},
        specialStates: Set()
      }

      const expectedLegalMovePositions: Set<Position> = Set([
        {...selectedPiece.position, y: selectedPiece.position.y + 1},
        firstPieceToCapture.position,
        secondPieceToCapture.position
      ])

      const state = chessboardSlice({
        pieces: Map([
          [selectedPiece.id, selectedPiece],
          [firstPieceToCapture.id, firstPieceToCapture],
          [secondPieceToCapture.id, secondPieceToCapture]
        ]),
        selectedPieceId: selectedPiece.id
      })

      // expect
      expect(selectLegalMovePositions(state)).toEqual(expectedLegalMovePositions)
    })

    test("filters out first move legal moves when piece is blocking the path", () => {
      // given
      const selectedPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 0},
        specialStates: Set([PieceSpecialState.FIRST_MOVE])
      }

      const pathBlockingPiece: Piece = {
        id: 2,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 1, y: 1},
        specialStates: Set()
      }

      const state = chessboardSlice({
        pieces: Map([
          [selectedPiece.id, selectedPiece],
          [pathBlockingPiece.id, pathBlockingPiece],
        ]),
        selectedPieceId: selectedPiece.id
      })

      // expect
      expect(selectLegalMovePositions(state)).toEqual(Set())
    })

    test("filters out capture moves when capture piece is of same color", () => {
      // given
      const selectedPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 0},
        specialStates: Set([PieceSpecialState.FIRST_MOVE])
      }

      const firstPieceToCapture: Piece = {
        id: 2,
        type: PieceType.PAWN,
        color: PieceColor.BLACK,
        position: {x: 2, y: 1},
        specialStates: Set()
      }

      const sameColorPieceToCapture: Piece = {
        id: 3,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 0, y: 1},
        specialStates: Set()
      }

      const expectedLegalMovePositions: Set<Position> = Set([
        {...selectedPiece.position, y: selectedPiece.position.y + 1},
        {...selectedPiece.position, y: selectedPiece.position.y + 2},
        firstPieceToCapture.position,
      ])

      const state = chessboardSlice({
        pieces: Map([
          [selectedPiece.id, selectedPiece],
          [firstPieceToCapture.id, firstPieceToCapture],
          [sameColorPieceToCapture.id, sameColorPieceToCapture]
        ]),
        selectedPieceId: selectedPiece.id
      })

      // expect
      expect(selectLegalMovePositions(state)).toEqual(expectedLegalMovePositions)
    })
  })

  describe("legal move by position selector", () => {
    test("returns true when position is a legal move for selected piece", () => {
      // given
      const selectedPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 0},
        specialStates: Set()
      }

      const position: Position = {x: 1, y: 1}

      const state = chessboardSlice({
        pieces: Map([[selectedPiece.id, selectedPiece]]),
        selectedPieceId: selectedPiece.id
      })

      // expect
      expect(selectLegalMoveByPosition(state)(position)).toEqual(true)
    })

    test("returns false when position is not a legal move for selected piece", () => {
      // given
      const selectedPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 0},
        specialStates: Set()
      }

      const position: Position = {x: 2, y: 1}

      const state = chessboardSlice({
        pieces: Map([[selectedPiece.id, selectedPiece]]),
        selectedPieceId: selectedPiece.id
      })

      // expect
      expect(selectLegalMoveByPosition(state)(position)).toEqual(false)
    })

    test("returns false when no piece is selected", () => {
      // given
      const existingPiece: Piece = {
        id: 1,
        type: PieceType.PAWN,
        color: PieceColor.WHITE,
        position: {x: 1, y: 0},
        specialStates: Set([PieceSpecialState.FIRST_MOVE])
      }

      const state = chessboardSlice({
        pieces: Map([[existingPiece.id, existingPiece]]),
      })

      // expect
      expect(selectLegalMoveByPosition(state)(existingPiece.position)).toEqual(false)
    })
  })
})
