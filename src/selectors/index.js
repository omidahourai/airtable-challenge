import { createSelector } from 'reselect'
import moment from 'moment'

export const normalizeDate = date => {
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
  return date
}

export const getEvents = state => state.events
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

export const getTimelineDateRange = createSelector(
  [state => state, getDateRange],
  (state, {start, end}) => {
    const dates = []
    let day = normalizeDate(new Date(start))
    const final = normalizeDate(new Date(end))
    do {
      const m = moment(day)
      dates.push({
        month: m.format('MMM'),
        dayNum: m.format('E'),
        dayOfWeekShort: m.format('dd'),
        dayOfWeek: m.format('dddd'),//dayNames[day.getUTCDay()],
        dateStr: m.format('YYYY-MM-DD'),
      })
      day.setDate(day.getDate()+1)
    } while (day <= final)
    return dates
  }
)
