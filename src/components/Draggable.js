import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div.attrs({
  style: ({ nextPos: {x, y} }) => ({
    transform: `translate(${x}px, ${y}px)`
  }),
})`
  cursor: grab;
  z-index: 1;
  ${({ isDragging }) => isDragging && css`
    opacity: 0.8;
    cursor: grabbing;
    position: absolute;
    z-index: 100;
    width: ${({width}) => `${width}px`};
  `};
`;

export default props => (
  <Container {...props}>
    {props.children}
  </Container>
)