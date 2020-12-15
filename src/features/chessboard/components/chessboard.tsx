import React from "react";
import styled from "styled-components";
import {rangeFromZero} from "common/utils";
import {ChessboardTileContainer} from "./chessboard-tile-container";

const TILE_SIZE = 50;
const TILES_PER_ROW = 8;
const TILES_RANGE = rangeFromZero(TILES_PER_ROW)

const ChessboardContainer = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Chessboard: React.VFC = () => (
  <ChessboardContainer size={TILE_SIZE * TILES_PER_ROW}>
    {TILES_RANGE.map(row => TILES_RANGE.map(column => (
      <ChessboardTileContainer row={row} column={column} size={TILE_SIZE}/>
    )))}
  </ChessboardContainer>
)
