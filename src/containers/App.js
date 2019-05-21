import { compose, withProps } from 'recompose'
import * as selectors from 'selectors'
import App from 'components/App'

export default compose(
  withProps({
    data: [1, 2, 3],
  })
)(App)
