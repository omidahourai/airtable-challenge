import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  grid-row-start: 1;
`
const Content = styled.div`
  height: 24px;
  grid-row-start: 2;
  grid-column-end: span ${({span}) => span || 1};
  background-color: #CCC;
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
      {props.timeline.map((item, idx) => (
        <Column key={item.dateStr} col={idx+1}>
          <Header>
            <div>{item.month} {item.dayNum}</div>
            <div>{item.dayOfWeek}</div>
          </Header>
          <Content>
            {item.events && item.events.map(event => (
              <div>{event.start} - {event.end}</div>
            ))}
          </Content>
        </Column>
      ))}
  </Grid>
)
