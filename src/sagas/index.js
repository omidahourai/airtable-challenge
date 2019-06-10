import { call, put, select, takeEvery, debounce } from 'redux-saga/effects'
import { getCacheKeys, getCacheResolveIds } from 'selectors'
import * as actions from 'actions'
import * as selectors from 'selectors'

export function* moveEvent(action) {
  const { id, offset } = action.payload
  const event = yield select(selectors.getEvent, id)
  const start = yield select(selectors.offsetDate, event.start, offset)
  const end = yield select(selectors.offsetDate, event.end, offset)
  yield put(actions.setEventDates({
    id,
    start,
    end,
  }))
}

export default function* saga() {
  yield takeEvery('EVENT_MOVE', moveEvent)
}
