import styled from "styled-components"
import {TILE_SIZE} from "features/chessboard/utils"

export const DismissErrorButton = styled.div`
  width: ${TILE_SIZE / 2}px;
  height: ${TILE_SIZE / 2}px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 3px;
    background-color: #8D0000;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`
