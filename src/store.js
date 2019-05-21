import reducers from 'reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'

export default initialState => {
  const rootReducer = combineReducers(reducers)
  const middleware = [createLogger()]
  const devTools =
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  const enhancers = compose(
    applyMiddleware(...middleware),
    devTools
  )
  return createStore(rootReducer, initialState, enhancers)
}
