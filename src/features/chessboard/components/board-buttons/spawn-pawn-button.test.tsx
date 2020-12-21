import {render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {Provider as StoreProvider} from "react-redux"
import configureStore from "redux-mock-store"
import {spawnPieceAtRandomPosition} from "features/chessboard/store"
import {
  ChessboardStateSlice,
  SpawnPieceAtRandomPosition
} from "features/chessboard/types"
import {chessboardSlice} from "features/chessboard/utils"
import {PieceColor, PieceType} from "features/piece/types"
import {SpawnPawnButton} from "./spawn-pawn-button"

describe("spawn pawn button", () => {
  const mockStore = configureStore<ChessboardStateSlice>()

  test("dispatches spawn piece at random position action on click", () => {
    // given
    const store = mockStore(chessboardSlice({}))

    const {getByText} = render(
      <StoreProvider store={store}>
        <SpawnPawnButton/>
      </StoreProvider>
    )

    const expectedPiecePayload: SpawnPieceAtRandomPosition = {
      type: PieceType.PAWN,
      color: PieceColor.WHITE
    }

    // when
    userEvent.click(getByText("Spawn white pawn"))

    // then
    expect(store.getActions()).toEqual([spawnPieceAtRandomPosition.request(expectedPiecePayload)])
  })
})
