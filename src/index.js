import React from 'react'
import App from 'components/App'
import events from 'data/mockEvents'
import GlobalStyles from 'styles/global'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore({ data: { events } })

render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById('root')
)
