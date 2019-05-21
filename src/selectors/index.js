import { createSelector } from 'reselect'

const sortStartDates = data => data.sort((a, b) => (a.start < b.start ? -1 : 0))
const sortEndDates = data => data.sort((a, b) => (a.end < b.end ? -1 : 0))

export const getFirstDate = createSelector(
  [data => data, sortStartDates],
  (data, dates) => dates[0].start
)

export const getLastDate = createSelector(
  [data => data, sortEndDates],
  (data, dates) => dates[dates.length - 1].end
)

export const getDateRange = createSelector(
  [data => data, getFirstDate, getLastDate],
  (data, start, end) => ({ start, end })
)
