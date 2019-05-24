import TimelineControls from 'components/TimelineControls'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import * as selectors from 'selectors'
import * as actions from 'actions'

export default compose(
  connect(state => ({
    timeline: selectors.getTimelineWithParsedEvents(state),
    zoom: state.zoom,
  }), dispatch => ({
    setZoom: zoom => dispatch(actions.setZoom(zoom)),
  })),
  withHandlers({
    zoomOut: props => e => props.setZoom(props.zoom - 25),
    zoomIn: props => e => props.setZoom(props.zoom + 25),
  }),
)(TimelineControls)
