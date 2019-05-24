import moment from 'moment'
import TimelineGrid from 'components/TimelineGrid'
import { connect } from 'react-redux'
import { compose, withProps, withState, withHandlers } from 'recompose'
import * as selectors from 'selectors'
import * as actions from 'actions'

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
    editEvent: props => ({ id, name }) => {
      props.setEditingEventText(name)
      props.setEditingEventId(id)
      // setTimeout(() => {
      //   props.inputRef.focus()
      // },100)
    },
    saveEvent: props => e => {
      // props.setEditingEventText(name)
      // console.log('onBlur')
      props.setEditingEventId(null)
    },
  }),
  withProps(props => console.log(props))
)(TimelineGrid)
