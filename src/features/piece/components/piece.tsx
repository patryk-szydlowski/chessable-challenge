import React from "react"
import styled from "styled-components"
import {Box} from "common/components"
import {PieceColor, PieceType} from "features/piece/types"

const textColor = {
  white: '#FFFFFF',
  black: '#000000'
}

const strokeColor = {
  white: '#000000',
  black: '#FFFFFF'
}

// todo: replace with actual piece SVGs
const PieceText = styled.div<{ pieceColor: PieceColor, size: number }>`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => textColor[props.pieceColor]};
  -webkit-text-stroke: 1px ${props => strokeColor[props.pieceColor]};

  font-size: ${props => props.size}px;
`

type Props = {
  color: PieceColor
  type: PieceType
  size: number
}

export const Piece: React.FC<Props> = ({color, type, size}) => (
  <Box size={size}>
    <PieceText pieceColor={color} size={size}>
      {type.charAt(0).toUpperCase()}
    </PieceText>
  </Box>
)
