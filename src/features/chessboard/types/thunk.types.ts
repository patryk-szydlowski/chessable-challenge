import {Dispatch} from "redux"
import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit"
import {ChessboardStateSlice} from "./state.types"

export type ChessboardThunkConfig = {
  state: ChessboardStateSlice
  dispatch: Dispatch<any>
}

export type ChessboardThunk<A = void, R = void> = AsyncThunkPayloadCreator<R, A, ChessboardThunkConfig>
