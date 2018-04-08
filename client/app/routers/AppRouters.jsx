import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { hot } from 'react-hot-loader'
import { StripeProvider } from 'react-stripe-elements'
import decode from 'jwt-decode'

import PrivateRoute from './PrivateRoute.jsx'
import PublicRoute from './PublicRoute.jsx'

import SplashPage from '../components/SplashPage.jsx'
import LoginPage from '../components/LoginPage.jsx'
import SignupPage from '../components/SignupPage.jsx'
import DashboardPage from '../components/DashboardPage.jsx'
import NeedsPage from '../components/NeedsPage.jsx'
import WantsPage from '../components/WantsPage.jsx'
import PaymentPage from '../components/PaymentPage.jsx'

import LoadingPage from '../components/LoadingPage.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'

import { login, startDisplay } from '../actions/auth'
import configureStore from '../store/configureStore'

// alternative to router
export const history = createHistory()
const store = configureStore()

// this is where you retrieve data from local storage
if (localStorage.appJWT) {
  const payload = decode(localStorage.appJWT)
  const user = {
    token: localStorage.appJWT,
    email: payload.email,
    // wants: payload.wants,
    // images: payload.images,
    confirmed: payload.confirmed
  }
  store.dispatch(login(user))
}

export class AppRouter extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <StripeProvider apiKey="pk_test_XBcboz66T7bviKFmVNjtL7CK">
          <Router history={history}>
            <Switch>
              <PublicRoute exact path="/" component={SplashPage} />
              <PublicRoute path="/login" component={LoginPage} />
              <PublicRoute path="/signup" component={SignupPage} />
              <PrivateRoute path="/dashboard" component={DashboardPage} />
              {/* <PrivateRoute path="/needs" component={NeedsPage} />
                <PrivateRoute path="/wants" component={WantsPage} />
                <PrivateRoute path="/payments" component={PaymentPage} /> */}
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </StripeProvider>
      </Provider>
    )
  }
}

export default hot(module)(AppRouter)
