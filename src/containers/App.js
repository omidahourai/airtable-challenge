import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import App from 'components/App'
import * as selectors from 'selectors'

export default compose(
  connect(state => ({
    data: state.events,
    firstDate: selectors.getFirstDate(state),
    lastDate: selectors.getLastDate(state),
  })),
)(App)
