import React from "react";
import {ChessboardContainer} from "./board";
import {ChessboardButtons} from "./board-buttons";
import styled from "styled-components";

const StyledPositioner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 50px;
`

const Spacer = styled.div`
  height: 5px
`

const StyledInteractiveChessboard = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;

  padding: 10px;

  background-color: lightgray;
`

export const InteractiveChessboard: React.VFC = () => (
  <StyledPositioner>
    <StyledInteractiveChessboard>
      <ChessboardContainer/>
      <Spacer/>
      <ChessboardButtons/>
    </StyledInteractiveChessboard>
  </StyledPositioner>
)
