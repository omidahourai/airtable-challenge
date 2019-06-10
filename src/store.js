import reducers from 'reducers'
import sagas from 'sagas'
import createSagaMiddleware from 'redux-saga'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'

export default initialState => {
  const rootReducer = combineReducers(reducers)
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [createLogger(), sagaMiddleware]
  const devTools =
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  const enhancers = compose(
    applyMiddleware(...middleware),
    devTools
  )
  const store = createStore(rootReducer, initialState, enhancers)
  sagaMiddleware.run(sagas)
  return store
}
