import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';
import DevTools from '../containers/DevTools'

const loggerMiddleware = createLogger()

const middleware = [ thunkMiddleware, promiseMiddleware(), loggerMiddleware]

// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument(),
)(createStore)

export default finalCreateStore