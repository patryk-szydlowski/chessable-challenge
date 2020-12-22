import {Map, Set} from "immutable"
import configureStore from "redux-mock-store"
import {ChessboardStateSlice} from "features/chessboard/types"
import {Piece, PieceColor, PieceType} from "features/piece/types"
import {chessboardSlice} from "../../../utils"
import {render} from "@testing-library/react"
import {Provider as StoreProvider} from "react-redux"
import {ChessboardTileContainer} from "./chessboard-tile-container"
import {interactWithBoard} from "../../../store";
import userEvent from "@testing-library/user-event";

jest.mock("features/piece/components", () => ({
  Piece: () => <div data-testid="piece"/>
}))

jest.mock("./chessboard-tile-highlight", () => ({
  ChessboardTileHighlight: () => <div data-testid="highlight"/>
}))

describe("chessboard tile container", () => {
  const mockStore = configureStore<ChessboardStateSlice>()

  test("renders chessboard tile with piece placed at tile position", () => {
    // given
    const piece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set()
    }

    const store = mockStore(
      chessboardSlice({
        pieces: Map([[piece.id, piece]])
      })
    )

    const {getByTestId} = render(
      <StoreProvider store={store}>
        <ChessboardTileContainer row={0} column={0}/>
      </StoreProvider>
    )

    // expect
    expect(getByTestId("piece")).toBeInTheDocument()
  })

  test("renders empty chessboard tile when no piece is placed at tile position", () => {
    // given
    const store = mockStore(chessboardSlice({}))

    const {queryByTestId} = render(
      <StoreProvider store={store}>
        <ChessboardTileContainer row={0} column={0}/>
      </StoreProvider>
    )

    // expect
    expect(queryByTestId("piece")).not.toBeInTheDocument()
  })

  test("renders chessboard tile with highlight when tile position is a legal move for selected piece", () => {
    // given
    const piece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set()
    }

    const store = mockStore(
      chessboardSlice({
        pieces: Map([[piece.id, piece]]),
        selectedPieceId: piece.id
      })
    )

    const {getByTestId} = render(
      <StoreProvider store={store}>
        <ChessboardTileContainer row={1} column={0}/>
      </StoreProvider>
    )

    // expect
    expect(getByTestId("highlight")).toBeInTheDocument()
  })

  test("renders chessboard tile without highlight when tile position is not a legal move for selected piece", () => {
    // given
    const piece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set()
    }

    const store = mockStore(
      chessboardSlice({
        pieces: Map([[piece.id, piece]]),
        selectedPieceId: piece.id
      })
    )

    const {queryByTestId} = render(
      <StoreProvider store={store}>
        <ChessboardTileContainer row={5} column={5}/>
      </StoreProvider>
    )

    // expect
    expect(queryByTestId("highlight")).not.toBeInTheDocument()
  })

  test("dispatches action to interact with board when chessboard tile is clicked", () => {
    // given
    const piece: Piece = {
      id: 1,
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
      position: {x: 0, y: 0},
      specialStates: Set()
    }

    const store = mockStore(chessboardSlice({
      pieces: Map([[piece.id, piece]]),
    }))

    const {getByTestId} = render(
      <StoreProvider store={store}>
        <ChessboardTileContainer row={0} column={0}/>
      </StoreProvider>
    )

    // when
    userEvent.click(getByTestId("piece"))

    // then
    expect(store.getActions()).toEqual([interactWithBoard({interactionPosition: piece.position})])
  })
})
