import React from 'react';
import styled, { css } from 'styled-components';
import { compose, lifecycle, withState, withProps, withHandlers } from 'recompose'

const Container = styled.div.attrs({
  style: ({ nextPos: {x, y} }) => ({
    transform: `translate(${x}px, ${y}px)`
  }),
})`
  cursor: grab;
  z-index: 1;
  grid-column-start: ${({ col }) => col};
  grid-row-start: ${({ rowSpan }) => (rowSpan ? rowSpan + 2 : 2)};
  grid-column-end: span ${({ colSpan }) => colSpan || 1};
  ${({ isDragging }) => isDragging && css`
    opacity: 0.8;
    cursor: grabbing;
    position: absolute;
    z-index: 100;
    width: ${({width}) => `${width}px`};
  `};
`;

// const Container = styled.div`
//   cursor: grab;
//   z-index: 1;
//   grid-column-start: ${({ col }) => col};
//   grid-row-start: ${({ rowSpan }) => (rowSpan ? rowSpan + 2 : 2)};
//   grid-column-end: span ${({ colSpan }) => colSpan || 1};
//   ${({ isDragging }) => isDragging && css`
//     transform: ${({x,y}) => `translate(${x}px, ${y}px)`};
//     opacity: 0.8;
//     cursor: grabbing;
//     position: absolute;
//     z-index: 100;
//     width: ${({width}) => `${width}px`};
//   `};
// `;


export default compose(
  withState('isDragging', 'setDragging', false),
  withState('initPos', 'setInitPos', {x: 0, y:0}),
  withState('nextPos', 'setNextPos', {x: 0, y:0}),
  withState('prevPos', 'setPrevPos', {x: 0, y:0}),
  withState('width', 'setWidth', 0),
  withProps(() => ({
    _ref: React.createRef(),
  })),
  withHandlers({
    onMouseDown: props => e => {
      const { clientX: x, clientY: y, currentTarget: {scrollWidth} } = e
      window.addEventListener('mousemove', props.onMouseMove)
      window.addEventListener('mouseup', props.onMouseUp)
      if (props.onDragStart) {
        props.onDragStart()
      }
      props.setInitPos({x, y})
      props.setDragging(true)
      props.setWidth(scrollWidth)
    },
    onMouseMove: props => e => {
      e.preventDefault()
      if (!props.isDragging) {
        return;
      }
      const {initPos, prevPos} = props
      const x = e.clientX - initPos.x + prevPos.x
      const y = e.clientY - initPos.y + prevPos.y
      props.setNextPos({x, y})
    },
    onMouseUp: props => e => {
      window.removeEventListener('mousemove', props.onMouseMove)
      window.removeEventListener('mouseup', props.onMouseUp)
      props.setInitPos({x:0, y:0})
      props.setPrevPos({...props.nextPos})
      props.setDragging(false)
    },
  }),
  lifecycle(props => ({
    componentWillUnmount() {
      window.removeEventListener('mousemove', props.onMouseMove)
      window.removeEventListener('mouseup', props.onMouseUp)
    },
    componentDidMount() {
      props.setWidth(props._ref.current.scrollWidth)
    },
  })),
  withProps(props => console.log('draggg',props))
)(props => (
  <Container {...props}>
    {props.children}
  </Container>
))