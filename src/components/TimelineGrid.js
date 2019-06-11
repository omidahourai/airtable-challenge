import React from 'react'
import styled from 'styled-components'
import Event from 'containers/TimelineEvent'
import Draggable from 'containers/Draggable'

const DragGridItem = styled(Draggable)`
  grid-column-start: ${({ col }) => col};
  grid-row-start: ${({ rowSpan }) => (rowSpan ? rowSpan + 2 : 2)};
  grid-column-end: span ${({ colSpan }) => colSpan || 1};
`

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
  position: relative;
  display: grid;
  grid-template-columns: repeat(${({ col }) => col});
  grid-gap: 4px 10px;
  grid-auto-columns: ${({ zoom }) => `${zoom}px`};
  z-index: 1;
`

export default props => (
  <Wrapper zoom={props.zoom} col={props.timeline.length} data-test={'timeline-grid'}>
    {props.timeline.map(({ date, events }, idx) => (
      <Column key={date} data-test-date={props.formatDate(date)} col={idx + 1} data-test={'grid-column'}>
        <Header
          col={idx+1}
          data-test={'col-header'}
        >
          <div>{props.formatDate(date)}</div>
          <div>{props.formatDay(date)}</div>
        </Header>
        {events.map(event => (
          <DragGridItem
            key={event.id}
            col={idx+1}
            colSpan={event.colSpan}
            rowSpan={event.rowSpan}
            data-test={'drag-item'}
          >
            <Event event={event} />
          </DragGridItem>
        ))}
      </Column>
    ))}
  </Wrapper>
)
