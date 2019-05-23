import styled from 'styled-components'

const colors = {
  primary: '#4286f4',
  success: '#3D7400',
  danger: 'red',
  warning: 'orange',
  secondary: '#999',
}

export const Button = styled.button`
  padding: 15px 20px;
  text-transform: uppercase;
  &:not(:last-child) {
    margin-right: 10px;
  }
  font-size: 1rem;
  border: none;
  color: #fff;
  border: 1px solid;
  color: ${({ color }) => (color ? colors[color] : colors.primary)};
  border-color: ${({ color }) => (color ? colors[color] : colors.primary)};
  border-radius: 4px;
  background-color: #FFF;
  &:focus,
  &:active {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
    color: #FFF;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.25);
    background-color: ${({ color }) => (color ? colors[color] : colors.primary)};
  }
  &:active {
    filter: brightness(0.8);
    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.25);
  }
`