import { handleActions } from 'redux-actions'

const events = handleActions(
  {
    ACTION: (state, { payload }) => payload,
  },
  []
)

export default {
  events,
}
