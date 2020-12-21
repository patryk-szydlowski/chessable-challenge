import React from "react"
import {ResetBoardButton} from "./reset-board-button"
import {SpawnPawnButton} from "./spawn-pawn-button"
import styled from "styled-components"

const StyledChessboardButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ChessboardButtons: React.VFC = () => (
  <StyledChessboardButtons>
    <SpawnPawnButton/>
    <ResetBoardButton/>
  </StyledChessboardButtons>
)
