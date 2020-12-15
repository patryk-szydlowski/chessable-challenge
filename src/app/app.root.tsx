import React, {FC} from "react";
import {PieceColor, PieceType} from "features/piece/types";
import {Chessboard} from "../features/chessboard/components";

const colors: PieceColor[] = ["white", "black"]
const types: PieceType[] = ["bishop", "king", "knight", "pawn", "queen", "rook"]

export const AppRoot: FC = () => (
  <div>
    <Chessboard/>
  </div>
)
