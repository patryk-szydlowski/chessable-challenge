import {Epic} from "redux-observable"
import {Action} from "typesafe-actions"
import {ChessboardStateSlice} from "./state.types"

export type ChessboardEpic = Epic<Action, Action, ChessboardStateSlice>
