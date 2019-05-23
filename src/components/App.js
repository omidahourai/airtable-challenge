import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  grid-row-start: 1;
`
const Content = styled.div`
  height: 24px;
  grid-row-start: ${({row}) => row ? row + 2 : 2 };
  grid-column-end: span ${({col}) => col || 1};
  background-color: ${({bg}) => bg || '#CCC'};
  color: ${({color}) => color || '#000'};
`
const Column = styled.div`
  display: contents;
  &>* { grid-column-start: ${({col}) => col}; }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({col}) => col});
  grid-gap: 2px 10px;
  grid-auto-columns: 100px;
`

export default props => (
  <Grid col={props.timeline.length}>
      {props.timeline.map(({date, events}, idx) => (
        <Column key={date} col={idx+1}>
          <Header>
            <div>{props.formatDate(date)}</div>
            <div>{props.formatDay(date)}</div>
          </Header>
          {events.map(event => (
            <Content
              key={event.id}
              row={event.rowSpan}
              col={event.colSpan}
              bg={event.bg}
              color={event.color}>
                {event.name}
            </Content>
          ))}
        </Column>
      ))}
  </Grid>
)
