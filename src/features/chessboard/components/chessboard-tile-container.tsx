import React from "react"
import {useSelector} from "react-redux"
import {selectPieceByPosition} from "features/chessboard/store"
import {ChessboardTile} from "./chessboard-tile"

type Props = {
  row: number
  column: number
  size: number
}

export const ChessboardTileContainer: React.VFC<Props> = (props) => {
  const {column: x, row: y} = props
  const piece = useSelector(selectPieceByPosition)({x, y})
  return <ChessboardTile {...props} piece={piece}/>
}
