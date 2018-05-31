import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import 'react-redux'
import thunk from 'redux-thunk'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { persistStore, persistReducer } from 'redux-persist'
import { appReducer } from '../reducers/app'
import { authReducer } from '../reducers/auth'
import { modalReducer } from '../reducers/modal'
import { wantsReducer } from '../reducers/wants'
import { needsReducer } from '../reducers/needs'
import { startLogout } from '../actions/auth'
import jwtDecode from 'jwt-decode'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
  // blacklist: ['auth'],
  // stateReconciler: autoMergeLevel2
}

// this middleware is called everytime the store is updated
const checkTokenExpirationMiddleware = store => next => action => {
  // if (localStorage.appJWT) {
  //   const token = jwtDecode(localStorage.appJWT)

  //   if (token.exp < Date.now() / 1000) {
  //     next(action)
  //     store.dispatch(startLogout())
  //   }
  // }
  next(action)
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
    composeEnhancers(applyMiddleware(thunk, checkTokenExpirationMiddleware))
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
