import React from 'react'
import styled from 'styled-components'

const Grid = styled.div``

const Bar = styled.div``

export default props => (
  <Grid>
  <div>Start: {props.firstDate}</div>
  <div>End: {props.lastDate}</div>
  </Grid>
)
