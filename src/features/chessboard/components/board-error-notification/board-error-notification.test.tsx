import {render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {ChessboardError} from "features/chessboard/types"
import {BoardErrorNotification} from "./board-error-notification"

jest.mock("./dismiss-error-button", () => ({
  DismissErrorButton: () => <div data-testid="dismiss-button"/>
}))

describe("board error notification", () => {
  test("renders error message", () => {
    // given
    const error: ChessboardError = {message: "error message"}

    const {getByText} = render(
      <BoardErrorNotification error={error} onClose={jest.fn()}/>
    )

    // expect
    expect(getByText(error.message)).toBeInTheDocument()
  })

  test("triggers close callback when clicked", () => {
    // given
    const error: ChessboardError = {message: "error message"}
    const closeCallback = jest.fn()

    const {getByTestId} = render(
      <BoardErrorNotification error={error} onClose={closeCallback}/>
    )

    // when
    userEvent.click(getByTestId("dismiss-button"))

    // then
    expect(closeCallback).toBeCalledTimes(1)
  })
})
