import {render} from "@testing-library/react"
import {Set} from "immutable"
import {Piece, PieceColor, PieceType} from "features/piece/types"
import {ChessboardTile} from "./chessboard-tile"

jest.mock("features/piece/components", () => ({
  Piece: () => <div data-testid="piece"/>
}))

describe("chessboard tile", () => {
  test("renders chessboard tile with black background on even tile position", () => {
    // given
    const {container} = render(<ChessboardTile row={0} column={0}/>)

    // expect
    expect(container.firstChild).toHaveStyle("background-color: black")
  })

  test("renders chessboard tile with white background on odd tile position", () => {
    // given
    const {container} = render(<ChessboardTile row={1} column={0}/>)

    // expect
    expect(container.firstChild).toHaveStyle("background-color: white")
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
      <ChessboardTile row={0} column={0} piece={piece}/>
    )

    // expect
    expect(getByTestId("piece")).toBeInTheDocument()
  })

  test("does not render piece on tile when piece property is not provided", async () => {
    // given
    const {queryByTestId} = render(<ChessboardTile row={0} column={0}/>)

    // expect
    expect(queryByTestId("piece")).not.toBeInTheDocument()
  })
})
