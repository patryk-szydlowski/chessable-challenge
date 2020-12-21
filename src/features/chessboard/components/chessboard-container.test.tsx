import {render} from "@testing-library/react"
import configureStore from "redux-mock-store"
import {ChessboardStateSlice} from "../types"
import {Provider as StoreProvider} from "react-redux"
import {chessboardSlice} from "../utils"
import {ChessboardContainer} from "./chessboard-container"

jest.mock("./chessboard-tile-container", () => ({
  ChessboardTileContainer: () => <div data-testid="chessboard-tile"/>
}))

describe('chessboard container', () => {
  const mockStore = configureStore<ChessboardStateSlice>()

  test('renders chessboard with board size from state', () => {
    // given
    const boardSize = 8
    const store = mockStore(chessboardSlice({boardSize}))

    const {getAllByTestId} = render(
      <StoreProvider store={store}>
        <ChessboardContainer/>
      </StoreProvider>
    )

    // expect
    expect(getAllByTestId("chessboard-tile")).toHaveLength(boardSize * boardSize)
  })
})
