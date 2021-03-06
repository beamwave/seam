import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { startLogout } from '../actions/auth'
import { toggleSidebar } from '../actions/app'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

export class Header extends Component {
  state = {
    dropdownOpen: false
  }

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen })

  toggleSidebar = () => {
    this.props.onSetSidebarOpen()
  }

  render = () => {
    const { isAuthenticated, startLogout, photo } = this.props

    return (
      <header className="nav-header">
        <FontAwesomeIcon
          icon="bars"
          className="bars"
          onClick={this.toggleSidebar}
        />
        <Link to="/dashboard" className="seam-sm">
          Seam
        </Link>
        <div className="search-group">
          <FontAwesomeIcon icon="search" className="icon" />
          <input type="text" className="input" placeholder="Search" />
        </div>

        <FontAwesomeIcon
          icon="bell"
          className="alerts"
          onClick={this.toggleSidebar}
        />

        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
          className="dropdown-root"
        >
          <DropdownToggle className="dropdown-toggle">
            <div
              className="image"
              style={{
                background: `url(${photo}) center / cover no-repeat`
              }}
            />
            <FontAwesomeIcon icon="angle-down" className="icon" />
          </DropdownToggle>
          <DropdownMenu
            right
            className="dropdown-menu"
            style={{
              display: this.state.dropdownOpen === false ? 'none' : 'block'
            }}
          >
            <DropdownItem className="dropdown-item">
              <Link to="/settings">Settings</Link>
            </DropdownItem>
            <DropdownItem className="dropdown-item">
              {isAuthenticated ? (
                <p className="logout" onClick={() => startLogout()}>
                  Logout
                </p>
              ) : null}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token,
    photo: state.auth.photo,
    wants: state.wants
  }
}

export default connect(mapStateToProps, { startLogout, toggleSidebar })(Header)
