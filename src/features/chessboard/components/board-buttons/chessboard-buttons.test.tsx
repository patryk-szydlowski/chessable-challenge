import {render} from "@testing-library/react"
import {Provider as StoreProvider} from "react-redux"
import configureStore from "redux-mock-store"
import {ChessboardStateSlice,} from "features/chessboard/types"
import {chessboardSlice} from "features/chessboard/utils"
import {ChessboardButtons} from "./chessboard-buttons"

describe("chessboard buttons", () => {
  const mockStore = configureStore<ChessboardStateSlice>()

  test("renders buttons to reset board and spawn white pawn", () => {
    // given
    const store = mockStore(chessboardSlice({}))

    const {getByText} = render(
      <StoreProvider store={store}>
        <ChessboardButtons/>
      </StoreProvider>
    )

    // expect
    expect(getByText("Reset board")).toBeInTheDocument()
    expect(getByText("Spawn white pawn")).toBeInTheDocument()
  })
})
