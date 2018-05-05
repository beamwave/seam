import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Sidebar from 'react-sidebar'
import SidebarContent from '../components/SidebarContent.jsx'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute.jsx'
import PublicRoute from './PublicRoute.jsx'

import SplashPage from '../components/SplashPage.jsx'
import LoginPage from '../components/LoginPage.jsx'
import SignupPage from '../components/SignupPage.jsx'
import SettingsPage from '../components/SettingsPage.jsx'
import DashboardPage from '../components/DashboardPage.jsx'
import NeedsPage from '../components/NeedsPage.jsx'
import WantsPage from '../components/WantsPage.jsx'
import PaymentPage from '../components/PaymentPage.jsx'

import LoadingPage from '../components/LoadingPage.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'

import { toggleSidebar, setDockMode } from '../actions/app'

export const history = createHistory()
const mql = window.matchMedia(`(min-width: 800px)`)

export class Pages extends Component {
  state = {
    mql: mql,
    sidebarDocked: false,
    // docked: this.props.docked,
    sidebarOpen: false
  }

  componentWillMount = () => {
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mql, sidebarDocked: mql.matches })
  }

  componentWillUnmount = () => {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged = () => {
    const { setDockMode } = this.props
    // setDockMode({ sidebarDocked: this.state.mql.matches })
    this.setState({ sidebarDocked: this.state.mql.matches })
  }

  onSetSidebarOpen = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen })

  render = () => {
    const sidebar = <SidebarContent />

    return (
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/" component={SplashPage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/signup" component={SignupPage} />
          <Sidebar
            sidebar={sidebar}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
          >
            <PrivateRoute path="/settings" component={SettingsPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/wants/:id" component={WantsPage} />
            <PrivateRoute path="/needs/:id" component={NeedsPage} />
          </Sidebar>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  // docked: state.app.sidebarDocked,
  sidebarOpen: state.app.sidebarOpen
})

export default connect(mapStateToProps)(Pages)
