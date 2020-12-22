import {render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {Provider as StoreProvider} from "react-redux"
import configureStore from "redux-mock-store"
import {dismissError} from "features/chessboard/store"
import {ChessboardError, ChessboardStateSlice} from "features/chessboard/types"
import {chessboardSlice} from "features/chessboard/utils"
import {BoardErrorNotificationContainer} from "./board-error-notification-container"

jest.mock("./dismiss-error-button", () => ({
  DismissErrorButton: () => <div data-testid="dismiss-button"/>
}))

describe("board error notification container", () => {
  const mockStore = configureStore<ChessboardStateSlice>()

  test("renders error notification when error is present", () => {
    // given
    const error: ChessboardError = {message: "error message"}

    const store = mockStore(chessboardSlice({error}))

    const {getByText} = render(
      <StoreProvider store={store}>
        <BoardErrorNotificationContainer/>
      </StoreProvider>
    )

    // expect
    expect(getByText(error.message)).toBeInTheDocument()
  })

  test("does not render error notification when error is not present", () => {
    // given
    const error: ChessboardError = {message: "error message"}

    const store = mockStore(chessboardSlice({}))

    const {queryByText} = render(
      <StoreProvider store={store}>
        <BoardErrorNotificationContainer/>
      </StoreProvider>
    )

    // expect
    expect(queryByText(error.message)).not.toBeInTheDocument()
  })

  test("dispatches action to dismiss error when notification close button is clicked", () => {
    // given
    const error: ChessboardError = {message: "error message"}

    const store = mockStore(chessboardSlice({error}))

    const {getByTestId} = render(
      <StoreProvider store={store}>
        <BoardErrorNotificationContainer/>
      </StoreProvider>
    )

    // when
    userEvent.click(getByTestId("dismiss-button"))

    // then
    expect(store.getActions()).toEqual([dismissError()])
  })
})
