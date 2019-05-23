import moment from 'moment'
import App from 'components/App'
import { connect } from 'react-redux'
import { compose, withProps, withState, withHandlers } from 'recompose'
import * as selectors from 'selectors'
import * as actions from 'actions'

export default compose(
  connect(state => ({
    timeline: selectors.getTimelineWithParsedEvents(state),
  })),
  withState('zoomWidth', 'setZoomWidth', 100),
  withProps({
    formatDate: date => moment(date).format('MMM D'),
    formatDay: date => moment(date).format('dddd'),
  }),
  withHandlers({
    zoomOut: props => e => props.setZoomWidth(props.zoomWidth-25),
    zoomIn: props => e => props.setZoomWidth(props.zoomWidth+25),
  }),
  withProps(props => console.log(props))
)(App)
