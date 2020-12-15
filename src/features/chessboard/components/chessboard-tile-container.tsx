import React from "react";
import {PieceDefinition} from "features/piece/types";
import {ChessboardTile} from "./chessboard-tile";

type Props = {
  row: number
  column: number
  size: number
}

export const ChessboardTileContainer: React.VFC<Props> = (props) => {
  // todo: get piece from store
  const piece: PieceDefinition | undefined = undefined
  return <ChessboardTile {...props} piece={piece}/>
}
