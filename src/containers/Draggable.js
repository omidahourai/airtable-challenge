import React from 'react';
import styled, { css } from 'styled-components';
import { compose, lifecycle, withState, withProps, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import * as actions from 'actions'
import Draggable from 'components/Draggable'

export default compose(
  connect(state => ({
    zoom: state.zoom
  }), dispatch => ({
    offsetEvent: ({offset, id}) => dispatch(actions.setMoveEvent({offset, id})),
    activateColumn: col => dispatch(actions.activateColumn(col)),
  })),
  withState('isDragging', 'setDragging', false),
  withState('initPos', 'setInitPos', {x: 0, y:0}),
  withState('nextPos', 'setNextPos', {x: 0, y:0}),
  withState('prevPos', 'setPrevPos', {x: 0, y:0}),
  withState('activeCol', 'setActiveCol', props => props.col),
  withState('width', 'setWidth', 0),
  withState('id', 'setId', null),
  withHandlers({
    onMouseDown: props => e => {
      const { clientX: x, clientY: y, currentTarget: {scrollWidth, children} } = e
      window.addEventListener('mousemove', props.onMouseMove)
      window.addEventListener('mouseup', props.onMouseUp)
      props.setInitPos({x, y})
      props.setDragging(true)
      props.setWidth(scrollWidth)
      props.activateColumn(props.col)
      props.setId(children[0].id)
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
      const colWidth = (props.zoom / 100) * 110
      const dCol = Math.floor(x / colWidth)
      const col = props.col + dCol
      if (col !== props.activeCol) {
        props.setActiveCol(col)
        props.activateColumn(col)
      }
    },
    onMouseUp: props => e => {
      window.removeEventListener('mousemove', props.onMouseMove)
      window.removeEventListener('mouseup', props.onMouseUp)
      props.setInitPos({x:0, y:0})
      props.setPrevPos({...props.nextPos})
      props.setNextPos({x:0, y:0})
      props.setDragging(false)
      props.activateColumn(null)
      props.offsetEvent({
        col: props.activeCol,
        offset: props.activeCol - props.col,
        id: parseInt(props.id),
      })
    },
  }),
  lifecycle({
    componentWillUnmount() {
      const { props } = this
      window.removeEventListener('mousemove', props.onMouseMove)
      window.removeEventListener('mouseup', props.onMouseUp)
    },
  }),
)(Draggable)