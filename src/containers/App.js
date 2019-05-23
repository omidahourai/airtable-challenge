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
  withState('editingEventId', 'setEditingEventId', null),
  withState('editingEventText', 'setEditingEventText', ''),
  withProps({
    formatDate: date => moment(date).format('MMM D'),
    formatDay: date => moment(date).format('dddd'),
  }),
  withHandlers({
    zoomOut: props => e => props.setZoomWidth(props.zoomWidth-25),
    zoomIn: props => e => props.setZoomWidth(props.zoomWidth+25),
    editEvent: props => ({id, name}) => {
      props.setEditingEventText(name)
      props.setEditingEventId(id)
    },
    saveEvent: props => e => {
      // props.setEditingEventText(name)
      // console.log('onBlur')
      props.setEditingEventId(null)
    },
  }),
  withProps(props => console.log(props))
)(App)
