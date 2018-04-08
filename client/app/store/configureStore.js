import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import 'react-redux'
import thunk from 'redux-thunk'
import { appReducer } from '../reducers/app'
import { authReducer } from '../reducers/auth'
import { modalReducer } from '../reducers/modal'
import { wantsReducer } from '../reducers/wants'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(
    combineReducers({
      app: appReducer,
      auth: authReducer,
      modal: modalReducer,
      wants: wantsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
  return store
}
