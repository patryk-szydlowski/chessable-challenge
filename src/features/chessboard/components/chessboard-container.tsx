import React from "react";
import {useSelector} from "react-redux";
import {selectChessboardSize} from "features/chessboard/store";
import {Chessboard} from "./chessboard";

export const ChessboardContainer: React.VFC = () => {
  const chessboardSize = useSelector(selectChessboardSize)
  return <Chessboard chessboardSize={chessboardSize} tileSize={50}/>
}
