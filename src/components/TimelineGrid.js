import React from 'react'
import styled from 'styled-components'
import Event from 'containers/TimelineEvent'
import Draggable from 'components/Draggable'

const Header = styled.div`
  text-align: center;
  grid-row-start: 1;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  grid-column-start: ${({ col }) => col};
`
const Column = styled.div`
  display: contents;
  & > * {
    grid-column-start: ${({ col }) => col};
  }
`
const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${({ col }) => col});
  grid-gap: 4px 10px;
  grid-auto-columns: ${({ zoom }) => `${zoom}px`};
  z-index: 1;
`

export default props => (
  <Wrapper zoom={props.zoom} col={props.timeline.length}>
    {props.timeline.map(({ date, events }, idx) => (
      <React.Fragment key={date}>
      {/*
      <Column key={date} col={idx + 1}>
      */}
        <Header col={idx+1}>
          <div>{props.formatDate(date)}</div>
          <div>{props.formatDay(date)}</div>
        </Header>
        {events.map(event => (
          <Draggable
          colSpan={event.colSpan}
          rowSpan={event.rowSpan}
          col={idx+1} key={event.id}>
            <Event
              key={event.id}
              event={event}
            />
          </Draggable>
        ))}
      {/*
        </Column>
      */}
      </React.Fragment>

    ))}
  </Wrapper>
)
