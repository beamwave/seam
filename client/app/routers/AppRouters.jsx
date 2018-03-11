import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { hot } from 'react-hot-loader'

import SplashPage from '../components/SplashPage.jsx'
import LoginPage from '../components/LoginPage.jsx'
import SignupPage from '../components/SignupPage.jsx'
import DashboardPage from '../components/DashboardPage.jsx'

import Header from '../components/Header.jsx'

import LoadingPage from '../components/LoadingPage.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'

import configureStore from '../store/configureStore'

// alternative to router
export const history = createHistory()
const store = configureStore()

export class AppRouter extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={SplashPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default hot(module)(AppRouter)
