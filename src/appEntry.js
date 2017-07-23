'use strict'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'   // 利用react-router-redux提供的syncHistoryWithStore,可以结合store同步导航事件

import App from './containers/App'
import configureStore from './stores/configureStore'
import DevTools from './containers/DevTools'
import reducer from './reducers'

const store = configureStore(reducer)

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('content')
)