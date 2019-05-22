import React from 'react'
import styled from 'styled-components'

const Grid = styled.div``

const Bar = styled.div``

export default props => (
  <Grid>
    <ul>
      {props.timeline.map(item => (
        <li>
          {item.dayOfWeek}, {item.month} {item.dayNum}
        </li>
      ))}
    </ul>
  </Grid>
)
