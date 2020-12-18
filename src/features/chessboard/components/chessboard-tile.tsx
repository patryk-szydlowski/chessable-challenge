import React from "react"
import styled from "styled-components"
import {Box} from "common/components"
import {Piece as PieceComponent} from "features/piece/components"
import {Piece} from "features/piece/types"

const TileBackground = styled(Box)<{ position: number }>`
  background-color: ${props => props.position % 2 === 0 ? 'black' : 'white'};
  position: relative;
`

const TilePieceContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

type Props = {
  row: number
  column: number
  size: number
  piece?: Piece
}

export const ChessboardTile: React.VFC<Props> = (
  {row, column, size, piece}
) => (
  <TileBackground position={row + column} size={size}>
    {piece && (
      <TilePieceContainer>
        <PieceComponent
          color={piece.color}
          type={piece.type}
          size={size}
        />
      </TilePieceContainer>
    )}
  </TileBackground>
)
