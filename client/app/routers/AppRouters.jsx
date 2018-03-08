import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { hot } from 'react-hot-loader'

import Header from '../components/Header.jsx'
import DashboardPage from '../components/DashboardPage.jsx'
import LoadingPage from '../components/LoadingPage.jsx'
import LoginPage from '../components/LoginPage.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'

// alternative to router
export const history = createHistory()

export class AppRouter extends Component {
  render = () => {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={DashboardPage} />
              <Route path="/stuff" component={LoginPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default hot(module)(AppRouter)
