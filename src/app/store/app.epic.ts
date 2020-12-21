import {combineEpics, Epic} from "redux-observable"
import {chessboardEpics} from "features/chessboard/store"

export const appEpic: Epic = combineEpics(
  ...chessboardEpics,
)
