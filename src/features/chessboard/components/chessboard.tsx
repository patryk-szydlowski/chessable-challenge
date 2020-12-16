import React from "react"
import styled from "styled-components"
import {
  CHESSBOARD_SIZE,
  CHESSBOARD_TILES,
  TILE_SIZE
} from "features/chessboard/utils"
import {ChessboardTileContainer} from "./chessboard-tile-container"

const StyledChessboard = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Chessboard: React.VFC = () => (
  <StyledChessboard size={TILE_SIZE * CHESSBOARD_SIZE}>
    {CHESSBOARD_TILES.map(([row, column]) => (
      <ChessboardTileContainer row={row} column={column} size={TILE_SIZE}/>
    ))}
  </StyledChessboard>
)
