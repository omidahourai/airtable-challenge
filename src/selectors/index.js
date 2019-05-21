import { createSelector } from 'reselect'

const getEvents = state => state.events
const sortStartDates = state => getEvents(state).sort((a, b) => (a.start < b.start ? -1 : 0))
const sortEndDates = state => getEvents(state).sort((a, b) => (a.end < b.end ? -1 : 0))

export const getFirstDate = createSelector(
  [state => state, sortStartDates],
  (state, dates) => dates[0].start
)

export const getLastDate = createSelector(
  [state => state, sortEndDates],
  (state, dates) => dates[dates.length - 1].end
)

export const getDateRange = createSelector(
  [state => state, getFirstDate, getLastDate],
  (state, start, end) => ({ start, end })
)
