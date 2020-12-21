import {Set} from "immutable"
import {
  Piece,
  PieceColor,
  PieceMove,
  PieceMoveScenario,
  Position,
  PieceType
} from "features/piece/types"
import {isLegalPieceMove} from "./piece.moves"

describe("piece moves", () => {
  test("move is legal when scenario is allowed and within board", () => {
    // given
    const piece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set()
    }

    const move: PieceMove = {
      xOffset: 0,
      yOffset: 1,
      scenario: PieceMoveScenario.MOVE
    }

    const boardSize = 8

    // expect
    expect(isLegalPieceMove(piece, move, boardSize)).toEqual(true)
  })

  test.each<[string, PieceColor, Position, PieceMove]>([
    [
      "x and y move offset do not match any legal moves",
      PieceColor.WHITE,
      {x: 0, y: 0},
      {xOffset: 10, yOffset: 1, scenario: PieceMoveScenario.CAPTURE}
    ],
    [
      "x and y move offset do not match any legal moves",
      PieceColor.BLACK,
      {x: 0, y: 0},
      {xOffset: 10, yOffset: 1, scenario: PieceMoveScenario.CAPTURE}
    ],
    [
      "x and y move offset do match a legal move for different color",
      PieceColor.WHITE,
      {x: 0, y: 0},
      {xOffset: 0, yOffset: -1, scenario: PieceMoveScenario.CAPTURE}
    ],
    [
      "x and y move offset do match a legal move for different color",
      PieceColor.BLACK,
      {x: 0, y: 0},
      {xOffset: 0, yOffset: 1, scenario: PieceMoveScenario.CAPTURE}
    ],
    [
      "x and y move offset are not allowed for move scenario",
      PieceColor.WHITE,
      {x: 0, y: 0},
      {xOffset: 0, yOffset: 2, scenario: PieceMoveScenario.MOVE}
    ],
    [
      "x and y move offset are not allowed for move scenario",
      PieceColor.BLACK,
      {x: 0, y: 0},
      {xOffset: 0, yOffset: -2, scenario: PieceMoveScenario.MOVE}
    ],
    [
      "x and y move offset are not allowed for first move scenario",
      PieceColor.WHITE,
      {x: 0, y: 0},
      {xOffset: 1, yOffset: 1, scenario: PieceMoveScenario.FIRST_MOVE}
    ],
    [
      "x and y move offset are not allowed for first move scenario",
      PieceColor.BLACK,
      {x: 7, y: 7},
      {xOffset: -1, yOffset: -1, scenario: PieceMoveScenario.FIRST_MOVE}
    ],
    [
      "x and y move offset are not allowed for capture scenario",
      PieceColor.WHITE,
      {x: 0, y: 0},
      {xOffset: 0, yOffset: 1, scenario: PieceMoveScenario.CAPTURE}
    ],
    [
      "x and y move offset are not allowed for capture scenario",
      PieceColor.BLACK,
      {x: 0, y: 0},
      {xOffset: 0, yOffset: -1, scenario: PieceMoveScenario.CAPTURE}
    ],
    [
      "move is not within board",
      PieceColor.WHITE,
      {x: 7, y: 7},
      {xOffset: 1, yOffset: 1, scenario: PieceMoveScenario.CAPTURE}
    ],
    [
      "move is not within board",
      PieceColor.BLACK,
      {x: 0, y: 0},
      {xOffset: -1, yOffset: -1, scenario: PieceMoveScenario.CAPTURE}
    ],
    [
      "move is not within board",
      PieceColor.WHITE,
      {x: 0, y: 7},
      {xOffset: 0, yOffset: 1, scenario: PieceMoveScenario.MOVE}
    ],
    [
      "move is not within board",
      PieceColor.BLACK,
      {x: 0, y: 0},
      {xOffset: 0, yOffset: -1, scenario: PieceMoveScenario.MOVE}
    ],
    [
      "move is not within board",
      PieceColor.WHITE,
      {x: 0, y: 6},
      {xOffset: 0, yOffset: 2, scenario: PieceMoveScenario.FIRST_MOVE}
    ],
    [
      "move is not within board",
      PieceColor.BLACK,
      {x: 0, y: 1},
      {xOffset: 0, yOffset: -2, scenario: PieceMoveScenario.FIRST_MOVE}
    ],
  ])("pawn move is illegal when %s", (_, color, position, move) => {
    // given
    const piece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color,
      position,
      specialStates: Set()
    }

    const boardSize = 8

    // expect
    expect(isLegalPieceMove(piece, move, boardSize)).toEqual(false)
  })
})
