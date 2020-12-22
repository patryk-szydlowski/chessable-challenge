import React from "react"
import styled from "styled-components"
import {ChessboardError} from "features/chessboard/types"
import {TILE_SIZE} from "features/chessboard/utils"
import {DismissErrorButton} from "./dismiss-error-button"

const StyledBoardErrorNotification = styled.div`
  height: ${TILE_SIZE}px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;

  border-radius: 10px;

  background-color: #ffb8b8;
  color: #8D0000;
`

type Props = {
  error: ChessboardError
  onClose: () => void
}

export const BoardErrorNotification: React.VFC<Props> = ({error, onClose}) => (
  <StyledBoardErrorNotification>
    <p>{error.message}</p>
    <div onClick={onClose}>
      <DismissErrorButton/>
    </div>
  </StyledBoardErrorNotification>
)
