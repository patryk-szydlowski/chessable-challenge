import React from "react"
import {useDispatch} from "react-redux"
import {resetBoard} from "features/chessboard/store"
import {ChessboardButton} from "./chessboard-button"

export const ResetBoardButton: React.VFC = () => {
  const dispatch = useDispatch()
  const resetBoardState = () => dispatch(resetBoard())

  return (
    <ChessboardButton onClick={resetBoardState}>
      Reset board
    </ChessboardButton>
  )
}
