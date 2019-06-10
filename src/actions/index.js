import { createAction } from 'redux-actions'

export const initTimeline = createAction('INIT_TIMELINE')
export const setZoom = createAction('ZOOM_SET')
export const setMoveEvent = createAction('EVENT_MOVE')
export const setEventDates = createAction('EVENT_DATES_SET')
export const activateColumn = createAction('COLUMN_ACTIVE')
