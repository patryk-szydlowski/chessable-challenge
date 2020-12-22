import React from "react"
import {Map} from "immutable"
import styled from "styled-components"
import {Box} from "common/components"
import {PieceColor, PieceType} from "features/piece/types"
import {Pawn} from "./pawn"

const pieces = Map([
  [PieceType.PAWN, Pawn]
])

const StyledPiece = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  color: PieceColor
  type: PieceType
  size: number
}

export const Piece: React.FC<Props> = React.memo(({color, type, size}) => {
  const PieceComponent = pieces.get(type)
  return (
    <StyledPiece size={size}>
      {PieceComponent && (
        <PieceComponent color={color} size={size}/>
      )}
    </StyledPiece>
  );
})
