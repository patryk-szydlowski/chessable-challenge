import {product, rangeFromZero} from "common/utils"

export const CHESSBOARD_SIZE = 8

export const CHESSBOARD_TILES = product(
  rangeFromZero(CHESSBOARD_SIZE),
  rangeFromZero(CHESSBOARD_SIZE)
)

export const TILE_SIZE = 50
