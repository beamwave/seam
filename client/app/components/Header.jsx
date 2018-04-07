import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'
import { toggleSidebar } from '../actions/app'
// import Sidebar from 'react-sidebar'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
// import Sidebar from './Sidebar.jsx'

export class Header extends Component {
  toggleSidebar = () => {
    this.props.onSetSidebarOpen()
  }

  render = () => {
    const { isAuthenticated, startLogout } = this.props

    return (
      <header>
        <FontAwesomeIcon icon="bars" onClick={this.toggleSidebar} />
        <Link to="/dashboard">Seam</Link>
        <FontAwesomeIcon icon="search" />
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon icon="bell" onClick={this.toggleSidebar} />
        <FontAwesomeIcon icon="caret-down" />
        {isAuthenticated ? (
          <button onClick={() => startLogout()}>Logout</button>
        ) : null}
      </header>
    )
  }
}

// export const Header = ({ isAuthenticated, startLogout }) => (
//   <header>
//     <Link to="/dashboard">
//       <FontAwesomeIcon icon="bars" />
//       Home
//     </Link>
//     <Link to="/needs">Needs</Link>
//     <Link to="/wants">Wants</Link>
//     <Link to="/payments">Payments</Link>
//     <Link to="/settings">Settings</Link>
//     {isAuthenticated ? (
//       <button onClick={() => startLogout()}>Logout</button>
//     ) : null}
//   </header>
// )

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps, { startLogout, toggleSidebar })(Header)
