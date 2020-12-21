import React from "react"
import {useSelector} from "react-redux"
import {selectPieceByPosition} from "features/chessboard/store"
import {ChessboardTile} from "./chessboard-tile"

type Props = {
  row: number
  column: number
}

export const ChessboardTileContainer: React.VFC<Props> = ({row, column}) => {
  const piece = useSelector(selectPieceByPosition)({x: column, y: row})
  return <ChessboardTile row={row} column={column} piece={piece}/>
}
