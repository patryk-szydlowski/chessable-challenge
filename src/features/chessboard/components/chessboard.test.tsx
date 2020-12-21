import {render} from "@testing-library/react";
import {Chessboard} from "./chessboard";

jest.mock("./chessboard-tile-container", () => ({
  ChessboardTileContainer: () => <div data-testid="chessboard-tile"/>
}))

describe('chessboard', () => {
  test('renders chessboard with provided board size', () => {
    // given
    const boardSize = 8
    const {getAllByTestId} = render(<Chessboard boardSize={boardSize}/>)

    // expect
    expect(getAllByTestId("chessboard-tile")).toHaveLength(boardSize * boardSize)
  })
})
