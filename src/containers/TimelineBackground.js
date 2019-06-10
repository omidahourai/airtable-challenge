import TimelineBackground from 'components/TimelineBackground'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import * as selectors from 'selectors'

export default compose(
  connect((state, props) => ({
    timeline: selectors.getTimelineWithParsedEvents(state),
    zoom: state.zoom,
    activeColumn: state.activeColumn,
  })),
)(TimelineBackground)
