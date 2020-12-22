import React from "react"
import {Map} from "immutable"
import styled from "styled-components"
import {PieceColor} from "features/piece/types"
import {WhitePawn} from "./pawn-white"
import {BlackPawn} from "./pawn-black"

const BASE_PAWN_SIZE = 45

const pawns = Map([
  [PieceColor.WHITE, WhitePawn],
  [PieceColor.BLACK, BlackPawn],
])

const StyledPawn = styled.svg<{ size: number }>`
  transform: scale(${props => props.size / BASE_PAWN_SIZE});
`

type Props = {
  color: PieceColor
  size: number
}

export const Pawn: React.VFC<Props> = React.memo(({color, size}) => {
  const PawnComponent = pawns.get(color)
  return (
    <StyledPawn size={size} width={BASE_PAWN_SIZE} height={BASE_PAWN_SIZE}>
      {PawnComponent && <PawnComponent/>}
    </StyledPawn>
  )
})
