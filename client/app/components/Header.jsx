import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

import { faUser, faCoffee } from '@fortawesome/fontawesome-free-solid'
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook'

export const Header = ({ isAuthenticated, startLogout }) => (
  <header>
    <Link to="/dashboard">
      <FontAwesomeIcon icon={faCoffee} />
      Home
    </Link>
    <Link to="/payments">Payments</Link>
    <Link to="/settings">Settings</Link>
    {isAuthenticated ? (
      <button onClick={() => startLogout()}>Logout</button>
    ) : null}
  </header>
)

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps, { startLogout })(Header)
