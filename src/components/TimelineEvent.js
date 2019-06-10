import React from 'react'
import styled from 'styled-components'
import { Input } from 'components/Base'
import Draggable from 'components/Draggable'

const Text = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 12px;
  ${({isEditing}) => isEditing && 'display: none;'}
`
const Wrapper = styled.div`
  height: 24px;
  /* grid-row-start: ${({ row }) => (row ? row + 2 : 2)};
  grid-column-end: span ${({ col }) => col || 1}; */
  padding: 6px 0;
  border-radius: 4px;
  background-color: ${({ bg }) => bg || '#CCC'};
  color: ${({ color }) => color || '#000'};
  font-size: 14px;
  display: flex;
  align-items: center;
  z-index: 1;
  ${({isEditing}) => isEditing && `
    min-width: 100%;
  `}
  ${Input} {
    width: 100%;
    ${({isEditing}) => !isEditing && `
      display: none;
    `}
  }
  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
    width: min-content;
    min-width: 100%;
  }
`

export default props => (
  <Wrapper
    id={'wrap'}
    isEditing={props.isEditing}
    key={props.id}
    row={props.rowSpan}
    col={props.colSpan}
    bg={props.bg}
    color={props.color}
    onDoubleClick={props.onEditEvent}
  >
    <Input
      isEditing={props.isEditing}
      ref={props.setInputRef} 
      value={props.text}
      onChange={props.onChangeText}
      onBlur={props.onBlurInput}
    />
    <Text isEditing={props.isEditing}>
      {props.text}
    </Text>
  </Wrapper>
)
