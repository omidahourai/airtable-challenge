import React from 'react'
import styled from 'styled-components'
import Event from 'containers/TimelineEvent'

const Header = styled.div`
  text-align: center;
  grid-row-start: 1;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
`
const Column = styled.div`
  display: contents;
  & > * {
    grid-column-start: ${({ col }) => col};
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col});
  grid-gap: 4px 10px;
  grid-auto-columns: ${({ zoom }) => `${zoom}px`};
  z-index: 1;
`

export default props => (
  <Wrapper zoom={props.zoom} col={props.timeline.length}>
    {props.timeline.map(({ date, events }, idx) => (
      <Column key={date} col={idx + 1}>
        <Header>
          <div>{props.formatDate(date)}</div>
          <div>{props.formatDay(date)}</div>
        </Header>
        {events.map(event => (
          <Event key={event.id} event={event} />
        ))}
      </Column>
    ))}
  </Wrapper>
)
