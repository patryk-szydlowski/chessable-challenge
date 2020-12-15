import React from "react"
import styled from "styled-components"
import {rangeFromZero} from "common/utils"
import {ChessboardTileContainer} from "./chessboard-tile-container"

const StyledChessboard = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

type Props = {
  chessboardSize: number
  tileSize: number
}

export const Chessboard: React.VFC<Props> = ({chessboardSize, tileSize}) => {
  const tilesRange = rangeFromZero(chessboardSize)
  return (
    <StyledChessboard size={tileSize * chessboardSize}>
      {tilesRange.map(row => tilesRange.map(column => (
        <ChessboardTileContainer row={row} column={column} size={tileSize}/>
      )))}
    </StyledChessboard>
  )
}
