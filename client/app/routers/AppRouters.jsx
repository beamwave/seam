import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { hot } from 'react-hot-loader'
import { StripeProvider } from 'react-stripe-elements'
import decode from 'jwt-decode'

import { Pages } from './Routes.jsx'

import { login, startDisplay } from '../actions/auth'
import { configureStore } from '../store/configureStore'

const store = configureStore().store
const persistor = configureStore().persistor

// this is where you retrieve data from local storage

// TODO: reconfigure to only send token
if (localStorage.appJWT) {
  const payload = decode(localStorage.appJWT)
  const user = {
    token: localStorage.appJWT,
    email: payload.email,
    username: payload.username,
    photo: payload.photo,
    confirmed: payload.confirmed
  }
  store.dispatch(login(user))
}

export class AppRouter extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <StripeProvider apiKey="pk_test_XBcboz66T7bviKFmVNjtL7CK">
          <PersistGate loading={null} persistor={persistor}>
            <Pages />
          </PersistGate>
        </StripeProvider>
      </Provider>
    )
  }
}

export default hot(module)(AppRouter)
