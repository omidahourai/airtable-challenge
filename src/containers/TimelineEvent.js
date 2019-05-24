import moment from 'moment'
import TimelineEvent from 'components/TimelineEvent'
import { connect } from 'react-redux'
import { compose, flattenProp, withProps, withState, withHandlers } from 'recompose'
import * as selectors from 'selectors'

export default compose(
  flattenProp('event'),
  withState('inputRef', 'setInputRef', null),
  withState('isEditing', 'setEditing', false),
  withState('text', 'setText', props => props.name),
  withProps({
    formatDate: date => moment(date).format('MMM D'),
    formatDay: date => moment(date).format('dddd'),
  }),
  withHandlers({
    onChangeText: props => e => props.setText(e.target.value),
    onBlurInput: props => e => props.setEditing(false),
    onEditEvent: props => e => {
      props.setEditing(true)
      setTimeout(() => props.inputRef.focus(), 0)
    },
  }),
  withProps(props => console.log('event',props))
)(TimelineEvent)
