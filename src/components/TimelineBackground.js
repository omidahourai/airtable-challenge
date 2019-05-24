import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  height: 24px;
  padding: 8px 10px !important;
  z-index: 0;
  border-radius: 0;
  grid-row-start: ${({ row }) => (row ? row + 2 : 2)};
  grid-column-end: span ${({ col }) => col || 1};
  padding: 6px 0;
  background-color: ${({ bg }) => bg};
`
const Header = styled.div`
  height: 42px;
  padding: 10px;
  text-align: center;
  grid-row-start: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 0;
  border-radius: 0;
  background-color: ${({ bg }) => bg} !important;
`
const Column = styled.div`
  display: contents;
  & > * { grid-column-start: ${({ col }) => col}; }
`
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: -5px;
  display: grid;
  grid-template-columns: repeat(${({ col }) => col});
  grid-auto-columns: ${({ zoom }) => `${zoom + 10}px`};
  border: 1px solid #CCC;
`

export default props => (
  <Wrapper zoom={props.zoom} col={props.timeline.length}>
    {props.timeline.map((_, idx) => (
      <Column key={idx} col={idx + 1}>
        <Header bg={idx % 2 === 0 ? '#FFF' : '#F6F6F6'}>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </Header>
        {Array(7).fill().map((_, i) => (
          <Content key={i} bg={idx % 2 === 0 ? '#FFF' : '#EEE'} row={i}>
            <p />
          </Content>
        ))}
      </Column>
    ))}
  </Wrapper>
)
