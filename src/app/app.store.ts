import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {enableAllPlugins} from "immer"
import {chessboardReducer} from "features/chessboard/store"

// todo: remove, only for dev
if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  Map.prototype.toJSON = function () {
    var obj = {}
    // @ts-ignore
    this.forEach((value, key) => obj[key] = value)
    return obj
  }
}

enableAllPlugins()

export const store = configureStore({
  reducer: combineReducers({
    chessboard: chessboardReducer
  })
})
