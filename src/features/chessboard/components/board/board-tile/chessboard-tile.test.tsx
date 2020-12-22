import {render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {Set} from "immutable"
import {Piece, PieceColor, PieceType} from "features/piece/types"
import {ChessboardTile} from "./chessboard-tile"

jest.mock("features/piece/components", () => ({
  Piece: () => <div data-testid="piece"/>
}))

jest.mock("./chessboard-tile-highlight", () => ({
  ChessboardTileHighlight: () => <div data-testid="highlight"/>
}))

describe("chessboard tile", () => {
  test("renders chessboard tile with black background on even tile position", () => {
    // given
    const {container} = render(
      <ChessboardTile
        row={0}
        column={0}
        highlighted={false}
        onClick={jest.fn()}
      />
    )

    // expect
    expect(container.firstChild).toHaveStyle(`background-color: #D18B47`)
  })

  test("renders chessboard tile with white background on odd tile position", () => {
    // given
    const {container} = render(
      <ChessboardTile
        row={1}
        column={0}
        highlighted={false}
        onClick={jest.fn()}
      />
    )

    // expect
    expect(container.firstChild).toHaveStyle("background-color: #FFCE9E")
  })

  test("renders piece on tile when piece property is provided", () => {
    // given
    const piece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set()
    }

    const {getByTestId} = render(
      <ChessboardTile
        row={0}
        column={0}
        highlighted={false}
        piece={piece}
        onClick={jest.fn()}
      />
    )

    // expect
    expect(getByTestId("piece")).toBeInTheDocument()
  })

  test("does not render piece on tile when piece property is not provided", async () => {
    // given
    const {queryByTestId} = render(
      <ChessboardTile
        row={0}
        column={0}
        highlighted={false}
        onClick={jest.fn()}
      />
    )

    // expect
    expect(queryByTestId("piece")).not.toBeInTheDocument()
  })

  test("renders chessboard tile with yellow highlight when highlighted", () => {
    // given
    const {getByTestId} = render(
      <ChessboardTile
        row={0}
        column={0}
        highlighted
        onClick={jest.fn()}
      />
    )

    // expect
    expect(getByTestId("highlight")).toBeInTheDocument()
  })

  test("does not render yellow highlight when not highlighted", () => {
    // given
    const {queryByTestId} = render(
      <ChessboardTile
        row={0}
        column={0}
        highlighted={false}
        onClick={jest.fn()}
      />
    )

    // expect
    expect(queryByTestId("highlight")).not.toBeInTheDocument()
  })

  test("triggers click callback when tile is clicked", () => {
    // given
    const clickCallback = jest.fn()

    const piece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set()
    }

    const {getByTestId} = render(
      <ChessboardTile
        row={0}
        column={0}
        highlighted={false}
        piece={piece}
        onClick={clickCallback}
      />
    )

    // when
    userEvent.click(getByTestId("piece"))

    // then
    expect(clickCallback).toBeCalledTimes(1)
  })
})
