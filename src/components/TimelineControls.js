import React from 'react'
import styled from 'styled-components'
import { Button } from 'components/Base'

const Wrapper = styled.div`
  padding-bottom: 10px;
`

export default props => (
  <Wrapper>
    <Button
      data-test={'zoom-in'}
      onClick={props.zoomIn}
      disabled={props.zoom > 170}>
      {'Zoom +'}
    </Button>
    <Button
      data-test={'zoom-out'}
      onClick={props.zoomOut}
      disabled={props.zoom < 30}>
      {'Zoom -'}
    </Button>
  </Wrapper>
)
