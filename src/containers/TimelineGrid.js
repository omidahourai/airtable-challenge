import moment from 'moment'
import TimelineGrid from 'components/TimelineGrid'
import { connect } from 'react-redux'
import { compose, withProps, withState, withHandlers } from 'recompose'
import * as selectors from 'selectors'

export default compose(
  connect(state => ({
    timeline: selectors.getTimelineWithParsedEvents(state),
    zoom: state.zoom,
  })),
  withState('inputRef', 'setInputRef', null),
  withState('editingEventId', 'setEditingEventId', null),
  withState('editingEventText', 'setEditingEventText', ''),
  withProps({
    formatDate: date => moment(date).format('MMM D'),
    formatDay: date => moment(date).format('dddd'),
  }),
  withHandlers({
    isEditing: props => ({id}) => id === props.editingEventId,
    saveEvent: props => e => props.setEditingEventId(null),
    editEvent: props => ({ id, name }) => {
      props.setEditingEventText(name)
      props.setEditingEventId(id)
    },
  }),
)(TimelineGrid)
