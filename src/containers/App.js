import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import App from 'components/App'
import * as selectors from 'selectors'

export default compose(
  connect(state => ({
    data: selectors.getEvents(state),
    timeline: selectors.getTimelineWithEvents(state),
  })),
  withProps(props => console.log(props))
)(App)
