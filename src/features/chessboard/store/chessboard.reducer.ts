import {createReducer} from "@reduxjs/toolkit";
import {initialState} from "./chessboard.state";

export const chessboardReducer = createReducer(initialState, builder => builder)
