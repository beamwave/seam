import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import createHistory from 'history/createBrowserHistory'
import { hot } from 'react-hot-loader'
import { StripeProvider } from 'react-stripe-elements'
import decode from 'jwt-decode'
import Sidebar from 'react-sidebar'
import SidebarContent from '../components/SidebarContent.jsx'

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

import { login, startDisplay } from '../actions/auth'
import { configureStore } from '../store/configureStore'
// import configureStore from '../store/configureStore'
// import { store, persistor } from '../store/configureStore'

// alternative to router
export const history = createHistory()
// const store = store() // matches configureStore import
// console.log('store: ', store)
// console.log('persistor: ', persistor)
const store = configureStore().store
const persistor = configureStore().persistor

const mql = window.matchMedia(`(min-width: 800px)`)

// this is where you retrieve data from local storage
if (localStorage.appJWT) {
  const payload = decode(localStorage.appJWT)
  const user = {
    token: localStorage.appJWT,
    email: payload.email,
    confirmed: payload.confirmed
  }
  store.dispatch(login(user))
}

export class AppRouter extends Component {
  state = {
    mql: mql,
    docked: this.props.docked,
    sidebarOpen: true
  }

  componentWillMount = () => {
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mql, sidebarDocked: mql.matches })
  }

  componentWillUnmount = () => {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged = () =>
    this.setState({ sidebarDocked: this.state.mql.matches })

  onSetSidebarOpen = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen })

  render = () => {
    const sidebar = <SidebarContent />
    return (
      <Provider store={store}>
        <StripeProvider apiKey="pk_test_XBcboz66T7bviKFmVNjtL7CK">
          <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
              <Sidebar
                sidebar={sidebar}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
              >
                <Switch>
                  <PublicRoute exact path="/" component={SplashPage} />
                  <PublicRoute path="/login" component={LoginPage} />
                  <PublicRoute path="/signup" component={SignupPage} />
                  <PrivateRoute path="/settings" component={SettingsPage} />
                  <PrivateRoute path="/dashboard" component={DashboardPage} />
                  <PrivateRoute path="/wants/:id" component={WantsPage} />
                  <PrivateRoute path="/needs/:id" component={NeedsPage} />
                  {/* <PrivateRoute path="/needs" component={NeedsPage} />
                <PrivateRoute path="/wants" component={WantsPage} />
                <PrivateRoute path="/payments" component={PaymentPage} /> */}
                  <Route component={NotFoundPage} />
                </Switch>
              </Sidebar>
            </Router>
          </PersistGate>
        </StripeProvider>
      </Provider>
    )
  }
}

export default hot(module)(AppRouter)
