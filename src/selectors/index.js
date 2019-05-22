import { createSelector } from 'reselect'
import moment from 'moment'

export const normalizeDate = date => {
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
  return date
}

export const getEvents = state => state.events
const getEventsSortedByStartDates = createSelector(
  [getEvents],
  events => events.sort((a, b) => (a.start < b.start ? -1 : 0))
)
const getEventsSortedByEndDates = createSelector(
  [getEvents],
  events => events.sort((a, b) => (a.end < b.end ? -1 : 0))
)

// const getEventsSortedByStartDates = state => getEvents(state).sort((a, b) => (a.start < b.start ? -1 : 0))
// const getEventsSortedByEndDates = state => getEvents(state).sort((a, b) => (a.end < b.end ? -1 : 0))

export const getFirstDate = createSelector(
  [state => state, getEventsSortedByStartDates],
  (state, events) => events[0].start
)

export const getLastDate = createSelector(
  [state => state, getEventsSortedByEndDates],
  (state, events) => events[events.length - 1].end
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

const oneDay = 24*60*60*1000
const getDateSpan = (d1, d2) => Math.round(Math.abs(((new Date(d1)).getTime() - (new Date(d2)).getTime())/(oneDay)))

export const getTimelineWithEvents = createSelector([
  state => state,
  getEventsSortedByStartDates,
  getTimelineDateRange,
], (state, events, timeline) => timeline.map(date => {
    const items = events.filter(e => e.start === date.dateStr)
    if (items.length) {
      return {
        ...date,
        events: items.map(event => ({
          ...event,
          span: getDateSpan(event.start, event.end),
        }))
      }
    }
    return date
  })
)
