import React from 'react'
import styled from 'styled-components'
import { Button } from 'components/Base'

const Header = styled.div`
text-align: center;
  grid-row-start: 1;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const BaseContent = styled.div`
  height: 24px;
  grid-row-start: ${({row}) => row ? row + 2 : 2 };
  grid-column-end: span ${({col}) => col || 1};
  padding: 6px 0;
`
const Content = styled(BaseContent)`
  border-radius: 4px;
  background-color: ${({bg}) => bg || '#CCC'};
  color: ${({color}) => color || '#000'};
  font-size: 14px;
  display: flex;
  align-items: center;
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
  &>* { grid-column-start: ${({col}) => col}; }
`
const BaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({col}) => col});
`
const Grid = styled(BaseGrid)`
  grid-gap: 4px 10px;
  grid-auto-columns: ${({zoomWidth}) => `${zoomWidth}px`};
  /* grid-auto-columns: 100px; */
  z-index: 1;
  ${Content},
  ${Header} {
    z-index: 1;
  }
`
const Content2 = styled(BaseContent)`
  background-color: ${({bg}) => bg} !important;
`
const Header2 = styled(Header)`
  background-color: ${({bg}) => bg} !important;
  height: 42px;
  padding: 10px;
`
const GridLines = styled(BaseGrid)`
  position: absolute;
  top: 0;
  left: -5px;
  /* grid-auto-columns: 110px; */
  grid-auto-columns: ${({zoomWidth}) => `${zoomWidth+10}px`};
  border: 1px solid #CCC;
  ${Header2} {
    height: 42px;
    z-index: 0;
    border-radius: 0;
    /* background-color: #CCC; */
  }
  ${Content2} {
    height: 24px;
    padding: 8px 10px !important;
    z-index: 0;
    border-radius: 0;
    background-color: ${({colz}) => colz % 2 === 1 ? '#CCC' : '#FFF'};
    /* ${(props) => {console.log(props)}} */
  }
`
const Controls = styled.div`
  /* height: 40px; */
  padding-bottom: 10px;
`
// const Button = styled.button``

const Wrapper = styled.div`
  margin: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
`

const GridWrapper = styled.div`
  position: relative;
`


export default props => (
  <Wrapper>
    <Controls>
      <Button
        onClick={props.zoomIn}
        disabled={props.zoomWidth > 170}>
          {'Zoom +'}
      </Button>
      <Button
        onClick={props.zoomOut}
        disabled={props.zoomWidth < 30}>
          {'Zoom -'}
      </Button>
    </Controls>
    <GridWrapper>
      <GridLines
        zoomWidth={props.zoomWidth}
        col={props.timeline.length}>
        {props.timeline.map(({date, events}, idx) => (
          <Column key={date} col={idx+1}>
            <Header2 bg={idx%2 === 0 ? '#FFF' : '#F6F6F6'}>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </Header2>
            {Array(7).fill().map((_, i) => (
              <Content2
                key={i}
                bg={idx%2 === 0 ? '#FFF' : '#EEE'}
                row={i}>
                  <p></p>
              </Content2>
            ))}
          </Column>
        ))}
      </GridLines>
      <Grid
        zoomWidth={props.zoomWidth}
        col={props.timeline.length}>
        {props.timeline.map(({date, events}, idx) => (
          <Column key={date} col={idx+1}>
            <Header>
              <div>{props.formatDate(date)}</div>
              <div>{props.formatDay(date)}</div>
            </Header>
            {events.map(event => props.editingEventId === event.id ? (
              <Content
                key={event.id}
                row={event.rowSpan}
                col={event.colSpan}
                bg={event.bg}
                color={event.color}
                >
                  <input
                    value={props.editingEventText}
                    onChange={e => props.setEditingEventText(e.target.value)}
                    onBlur={props.saveEvent}
                  />
              </Content>
            ) : (
              <Content
                key={event.id}
                row={event.rowSpan}
                col={event.colSpan}
                bg={event.bg}
                color={event.color}
                onDoubleClick={() => props.editEvent(event)}
                >
                  <p>{event.name}</p>
              </Content>
            ))}
          </Column>
        ))}
      </Grid>
    </GridWrapper>
  </Wrapper>
)
