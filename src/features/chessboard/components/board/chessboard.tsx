import React from "react"
import styled from "styled-components"
import {matrix} from "common/utils"
import {TILE_SIZE} from "features/chessboard/utils"
import {ChessboardTileContainer} from "./chessboard-tile-container"

const StyledChessboard = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
`

type Props = {
  boardSize: number
}

export const Chessboard: React.VFC<Props> = ({boardSize}) => (
  <StyledChessboard size={TILE_SIZE * boardSize}>
    {matrix(boardSize).map(([row, column]) => (
      <ChessboardTileContainer
        key={row * boardSize + column}
        row={row}
        column={column}
      />
    ))}
  </StyledChessboard>
)
