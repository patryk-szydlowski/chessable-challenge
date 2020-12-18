import {Dispatch} from "redux"
import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit"
import {ChessboardStateSlice} from "./state.types"

export type ChessboardThunkConfig = {
  state: ChessboardStateSlice
  dispatch: Dispatch
}

export type ChessboardThunk<R, A = void> = AsyncThunkPayloadCreator<R, A, ChessboardThunkConfig>
