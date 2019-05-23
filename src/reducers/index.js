import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

const data = handleActions({
  ACTION: (state, { payload }) => payload,
}, {events: []})

// const events = handleActions({
//   ACTION: (state, { payload }) => payload,
// }, [])

// const visibleTimeline = handleActions({
//   INIT_TIMELINE: (state, { payload }) => payload,
// }, [])

export default {
  data,
  // events,
  // visibleTimeline,
}
