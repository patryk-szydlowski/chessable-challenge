import React from "react";
import {useSelector} from "react-redux"
import {selectTilePiece} from "features/chessboard/store";
import {ChessboardTile} from "./chessboard-tile";

type Props = {
  row: number
  column: number
  size: number
}

export const ChessboardTileContainer: React.VFC<Props> = (
  {row, column, size}
) => {
  const piece = useSelector(selectTilePiece)({row, column})
  return <ChessboardTile row={row} column={column} size={size} piece={piece}/>
}
