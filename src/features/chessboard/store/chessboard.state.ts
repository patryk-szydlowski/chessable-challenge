import {ChessboardState} from "features/chessboard/types"
import {PieceColor, PieceType} from "features/piece/types";

export const initialState: ChessboardState = {
  chessboardSize: 8,
  pieces: new Map([
    [10, {type: PieceType.PAWN, color: PieceColor.BLACK}],
  ])
}
