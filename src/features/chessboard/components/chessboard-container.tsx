import React from "react"
import {useSelector} from "react-redux"
import {selectBoardSize} from "features/chessboard/store"
import {Chessboard} from "./chessboard";

export const ChessboardContainer: React.VFC = () => {
  const boardSize = useSelector(selectBoardSize)
  return <Chessboard boardSize={boardSize}/>
}
