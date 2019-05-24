import { handleActions } from 'redux-actions'

const data = handleActions({
  ACTION: (state, { payload }) => payload,
}, {events: []})

// const events = handleActions({
//   ACTION: (state, { payload }) => payload,
// }, [])
const zoom = handleActions({
  ZOOM_SET: (state, { payload }) => payload,
}, 100)

// const visibleTimeline = handleActions({
//   INIT_TIMELINE: (state, { payload }) => payload,
// }, [])

export default {
  data,
  zoom,
  // events,
  // visibleTimeline,
}
