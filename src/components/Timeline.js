import React from 'react'
import styled from 'styled-components'
import TimelineControls from 'containers/TimelineControls'
import Background from 'containers/TimelineBackground'
import Grid from 'containers/TimelineGrid'

const Controls = styled(TimelineControls)`
  padding-bottom: 10px;
`
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
    <Controls />
    <GridWrapper>
      <Background />
      <Grid />
    </GridWrapper>
  </Wrapper>
)
