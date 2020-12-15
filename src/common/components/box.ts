import styled from "styled-components"

type Props = {
  size: number
}

export const Box = styled.div<Props>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`
