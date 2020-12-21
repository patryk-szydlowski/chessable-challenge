import styled from "styled-components"
import {TILE_SIZE} from "features/chessboard/utils"

export const ChessboardButton = styled.button`
  width: ${TILE_SIZE * 4}px;
  height: ${TILE_SIZE}px;
`
