import React from "react"
import styled from "styled-components"
import {Box} from "common/components"
import {TILE_SIZE} from "features/chessboard/utils"
import {Piece as PieceComponent} from "features/piece/components"
import {Piece} from "features/piece/types"

const TileBackground = styled(Box)<{ position: number }>`
  background-color: ${props => props.position % 2 === 0 ? "#D18B47" : "#FFCE9E"};
  position: relative;
`

const TilePieceContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const TileHighLight = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: yellow;
  opacity: 0.35;
`

type Props = {
  row: number
  column: number
  highlighted: boolean
  onClick: () => void
  piece?: Piece
}

export const ChessboardTile: React.VFC<Props> = (
  {row, column, highlighted, piece, onClick}
) => (
  <TileBackground position={row + column} size={TILE_SIZE} onClick={onClick}>
    {highlighted && <TileHighLight/>}
    {piece && (
      <TilePieceContainer>
        <PieceComponent
          color={piece.color}
          type={piece.type}
          size={TILE_SIZE}
        />
      </TilePieceContainer>
    )}
  </TileBackground>
)
