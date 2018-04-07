import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

// sidebar is used as HOC in AppRouters.jsx

export class SidebarContent extends Component {
  state = {
    wantModalOpened: false,
    needModalOpened: false,
    transferModalOpened: false,
    distributeModalOpened: false,
    wipeModalOpened: false,
    flushModalOpened: false,
    buyModalOpened: false
  }

  render = () => {
    return (
      <div className="sidebar">
        <h2>Options</h2>
        <FontAwesomeIcon icon="arrow-left" />
        <h3>Remaining Points</h3>
        <p>0</p>
        <h3>Total Cash</h3>
        <p>$435,212</p>
        <h3>Undistributed Cash</h3>
        <p>$5,094</p>
        <hr />
        <h3>Create Account</h3>
        <button>
          <FontAwesomeIcon icon="plus" />
          <p>Need</p>
        </button>
        <button>
          <FontAwesomeIcon icon="plus" />
          <p>Want</p>
        </button>
        <ul>
          <li>Adjust</li>
          <li>Delete</li>
        </ul>
        <FontAwesomeIcon icon="dollar-sign" />
        <FontAwesomeIcon icon="shopping-cart" />
        <FontAwesomeIcon icon="sliders-h" />
      </div>
    )
  }
}

export default SidebarContent
