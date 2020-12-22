import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  interactWithTile,
  selectPieceByPosition,
  selectLegalMoveByPosition
} from "features/chessboard/store"
import {Position} from "features/piece/types"
import {ChessboardTile} from "./chessboard-tile"

type Props = {
  row: number
  column: number
}

export const ChessboardTileContainer: React.VFC<Props> = ({row, column}) => {
  const position: Position = {x: column, y: row}
  const piece = useSelector(selectPieceByPosition)(position)
  const highlighted = useSelector(selectLegalMoveByPosition)(position)

  const dispatch = useDispatch()
  const interactWithTileOnClick = () => dispatch(interactWithTile(position))

  return (
    <ChessboardTile
      row={row}
      column={column}
      highlighted={highlighted}
      piece={piece}
      onClick={interactWithTileOnClick}
    />
  )
}
