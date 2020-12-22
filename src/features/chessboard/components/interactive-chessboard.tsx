import React from "react"
import styled from "styled-components"
import {ChessboardContainer} from "./board"
import {ChessboardButtons} from "./board-buttons"
import {BoardErrorNotificationContainer} from "./board-error-notification"

const StyledPositioner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 50px;
`

const Spacer = styled.div`
  height: 10px
`

const StyledInteractiveChessboard = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
`

export const InteractiveChessboard: React.VFC = () => (
  <StyledPositioner>
    <StyledInteractiveChessboard>
      <ChessboardContainer/>
      <Spacer/>
      <ChessboardButtons/>
      <Spacer/>
      <BoardErrorNotificationContainer/>
    </StyledInteractiveChessboard>
  </StyledPositioner>
)
