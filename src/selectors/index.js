import { createSelector } from 'reselect'
import moment from 'moment'

const oneDay = 24 * 60 * 60 * 1000
const getDateSpan = (d1, d2) =>
  Math.round(Math.abs((new Date(d1).getTime() - new Date(d2).getTime()) / oneDay))
const getEvents = state => state.data.events

const normalizeDate = date => {
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
  return date
}

export const getEvent = createSelector(
  [(state, id) => id, getEvents],
  (id, events) => events.find(e => e.id === id)
)

export const offsetDate = (state, date, daysOffset) => {
  const d = normalizeDate(new Date(date))
  d.setDate(d.getDate()+daysOffset)
  const offset = moment(d).format('YYYY-MM-DD')
  return offset
}

const getEventsSortedByStartDates = createSelector(
  [getEvents],
  events => events.sort((a, b) => (a.start < b.start ? -1 : 0))
)

const getEventsSortedByEndDates = createSelector(
  [getEvents],
  events => events.sort((a, b) => (a.end < b.end ? -1 : 0))
)

const getFirstDate = createSelector(
  [getEventsSortedByStartDates],
  events => events[0].start
)

const getLastDate = createSelector(
  [getEventsSortedByEndDates],
  events => events[events.length - 1].end
)

const getDateRange = createSelector(
  [getFirstDate, getLastDate],
  (start, end) => ({ start, end })
)

export const getTimelineDatesRange = createSelector(
  [getDateRange],
  ({ start, end }) => {
    const dates = []
    let day = normalizeDate(new Date(start))
    const final = normalizeDate(new Date(end))
    do {
      dates.push(moment(day).format('YYYY-MM-DD'))
      day.setDate(day.getDate() + 1)
    } while (day <= final)
    return dates
  }
)

export const getEventsWithDatesRange = createSelector(
  [getEventsSortedByStartDates],
  events =>
    events.map(event => {
      const colSpan = getDateSpan(event.start, event.end)
      const start = normalizeDate(new Date(event.start))
      const end = normalizeDate(new Date(event.end))
      let day = start
      const dates = []
      for (let i = 0; i < colSpan; i++) {
        dates.push(moment(day).format('YYYY-MM-DD'))
        let next = new Date(day)
        next.setDate(day.getDate() + 1)
        day = next
      }
      if (start !== end) {
        dates.push(moment(end).format('YYYY-MM-DD'))
      }
      return {
        ...event,
        colSpan,
        dates,
      }
    })
)

/*
Returns event id array for each date
*/
export const getTimelineDatesEventIds = createSelector(
  [getEventsWithDatesRange, getTimelineDatesRange],
  (eventWithDatesRange, timelineDatesRange) =>
    timelineDatesRange.map(date =>
      eventWithDatesRange.filter(({ dates }) => dates.includes(date)).map(({ id }) => id)
    )
)

/*
Assign events to timeline with row span
*/
export const getEventsWithRowColSpan = createSelector(
  [getEventsWithDatesRange, getTimelineDatesEventIds],
  (eventWithDatesRange, timelineDatesEventIds) => {
    const events = eventWithDatesRange.map(o => ({ ...o })) // clone objects
    timelineDatesEventIds.forEach(eventIds => {
      eventIds.forEach(id => {
        const dateEventsRowSpan = events
          .filter(e => e.rowSpan && eventIds.includes(e.id))
          .map(({ rowSpan }) => rowSpan)
        const index = events.findIndex(e => e.id === id)
        if (!events[index].rowSpan) {
          let count = 0
          let found = false
          do {
            count += 1
            if (!dateEventsRowSpan.includes(count)) {
              found = true
            }
          } while (!found)
          events[index].rowSpan = count
        }
      })
    })
    return events
  }
)

export const getTimelineWithStartEvents = createSelector(
  [getEventsSortedByStartDates, getTimelineDatesRange],
  (events, timelineDatesRange) =>
    timelineDatesRange.map(date => {
      const items = events.filter(e => e.start === date)
      return items.length ? { date, eventIds: items.map(({ id }) => id) } : { date, eventIds: [] }
    })
)

export const getTimelineWithParsedEvents = createSelector(
  [getEventsWithRowColSpan, getTimelineWithStartEvents],
  (events, timeline) =>
    timeline.map(({ date, eventIds }) => ({
      date,
      events: eventIds.map(id => events.find(e => e.id === id)),
    }))
)
