import {render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {Provider as StoreProvider} from "react-redux"
import configureStore from "redux-mock-store"
import {resetBoard} from "features/chessboard/store"
import {ChessboardStateSlice} from "features/chessboard/types"
import {chessboardSlice} from "features/chessboard/utils"
import {ResetBoardButton} from "./reset-board-button"

describe("reset board button", () => {
  const mockStore = configureStore<ChessboardStateSlice>()

  test("dispatches reset board action on click", () => {
    // given
    const store = mockStore(chessboardSlice({}))

    const {getByText} = render(
      <StoreProvider store={store}>
        <ResetBoardButton/>
      </StoreProvider>
    )

    // when
    userEvent.click(getByText("Reset board"))

    // then
    expect(store.getActions()).toEqual([resetBoard()])
  })
})
