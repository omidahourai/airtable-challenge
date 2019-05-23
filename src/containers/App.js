import moment from 'moment'
import App from 'components/App'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers } from 'recompose'
import * as selectors from 'selectors'
import * as actions from 'actions'

export default compose(
  connect(state => ({
    timeline: selectors.getTimelineWithParsedEvents(state),
  })),
  withProps({
    formatDate: date => moment(date).format('MMM D'),
    formatDay: date => moment(date).format('dddd'),
  }),
  withProps(props => console.log(props))
)(App)
