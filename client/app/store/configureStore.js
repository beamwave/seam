import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import 'react-redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { appReducer } from '../reducers/app'
import { authReducer } from '../reducers/auth'
import { modalReducer } from '../reducers/modal'
import { wantsReducer } from '../reducers/wants'
import { needsReducer } from '../reducers/needs'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () => {
  const store = createStore(
    persistReducer(
      persistConfig,
      combineReducers({
        app: appReducer,
        auth: authReducer,
        modal: modalReducer,
        wants: wantsReducer,
        needs: needsReducer
      })
    ),
    composeEnhancers(applyMiddleware(thunk))
  )
  const persistor = persistStore(store)
  return { store, persistor }
}

// export default () => {
//   const store = createStore(
//     combineReducers({
//       app: appReducer,
//       auth: authReducer,
//       modal: modalReducer,
//       wants: wantsReducer
//     }),
//     composeEnhancers(applyMiddleware(thunk))
//   )
//   return store
// }
