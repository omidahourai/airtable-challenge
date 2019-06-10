import { handleActions } from 'redux-actions'

const data = handleActions({
  EVENT_DATES_SET: (state, { payload }) => ({
    events: state.events.map(event => (
      event.id !== payload.id ? event : ({
        ...event,
        start: payload.start,
        end: payload.end,
      })
    )),
  }),
}, {events: []})

const activeColumn = handleActions({
  COLUMN_ACTIVE: (state, { payload }) => payload,
}, null)

const zoom = handleActions({
  ZOOM_SET: (state, { payload }) => payload,
}, 100)

export default {
  data,
  zoom,
  activeColumn,
}
