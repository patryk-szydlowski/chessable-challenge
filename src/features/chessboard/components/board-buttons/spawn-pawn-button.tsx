import React from "react"
import {useDispatch} from "react-redux"
import {spawnPieceAtRandomPosition} from "features/chessboard/store"
import {PieceColor, PieceType} from "features/piece/types"
import {ChessboardButton} from "./chessboard-button"

export const SpawnPawnButton: React.VFC = () => {
  const dispatch = useDispatch()
  const spawnWhitePawn = () => dispatch(
    spawnPieceAtRandomPosition.request({
      type: PieceType.PAWN,
      color: PieceColor.WHITE,
    })
  )

  return (
    <ChessboardButton onClick={spawnWhitePawn}>
      Spawn white pawn
    </ChessboardButton>
  )
}
