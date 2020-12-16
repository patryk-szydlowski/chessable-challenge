import {ChessboardState} from "features/chessboard/types"
import {serializePosition} from "features/chessboard/utils"
import {PieceColor, PieceType} from "features/piece/types"

export const initialState: ChessboardState = {
  pieces: new Map([
    [
      serializePosition({row: 1, column: 2}),
      {type: PieceType.PAWN, color: PieceColor.BLACK}
    ],
  ])
}
