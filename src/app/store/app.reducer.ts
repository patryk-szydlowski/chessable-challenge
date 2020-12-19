import {combineReducers} from "redux"
import {chessboardReducer} from "features/chessboard/store"

export const appReducer = combineReducers({
  chessboard: chessboardReducer
})
