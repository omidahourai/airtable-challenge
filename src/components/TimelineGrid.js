import React from 'react'
import styled from 'styled-components'
import Event from 'containers/TimelineEvent'
import { Input } from 'components/Base'

const Header = styled.div`
  text-align: center;
  grid-row-start: 1;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
`
const Content = styled.div`
  height: 24px;
  grid-row-start: ${({ row }) => (row ? row + 2 : 2)};
  grid-column-end: span ${({ col }) => col || 1};
  padding: 6px 0;
  border-radius: 4px;
  background-color: ${({ bg }) => bg || '#CCC'};
  color: ${({ color }) => color || '#000'};
  font-size: 14px;
  display: flex;
  align-items: center;
  z-index: 1;
  ${({isEditing}) => isEditing && `
    width: min-content;
    min-width: 100%;
  `}
  ${Input} {
    width: 100%;
  }
  & p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 12px;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
    width: min-content;
    min-width: 100%;
  }
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
          <Event event={event} />
        ))}
      </Column>
    ))}
  </Wrapper>
)
