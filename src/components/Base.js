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
  background-color: #fff;
  &:focus,
  &:active {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
    color: #fff;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.25);
    background-color: ${({ color }) => (color ? colors[color] : colors.primary)};
  }
  &:active {
    filter: brightness(0.8);
    box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.25);
  }
`

export const Input = styled.input`
  display: block;
  font-size: 12px;
  line-height: 1.25;
  color: #55595c;
  background-color: #fff;
  background-image: none;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  margin: 0 5px;
  height: 100%;
  padding-left: 5px;
`
