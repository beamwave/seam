import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
// sidebar is used as HOC in AppRouters.jsx

import { loadModal } from '../actions/modal'

import {
  WANTS_MODAL,
  NEEDS_MODAL,
  TRANSFER_MODAL,
  DISTRIBUTE_MODAL,
  WIPE_MODAL,
  FLUSH_MODAL,
  BUY_MODAL
} from '../constants/modaltypes'

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

  showWantsModal = () => this.props.loadModal(WANTS_MODAL)
  showNeedsModal = () => this.props.loadModal(NEEDS_MODAL)
  showTransferModal = () => this.props.loadModal(TRANSFER_MODAL)
  showDistributeModal = () => this.props.loadModal(DISTRIBUTE_MODAL)
  showWipeModal = () => this.props.loadModal(WIPE_MODAL)
  showFlushModal = () => this.props.loadModal(FLUSH_MODAL)
  showBuyModal = () => this.props.loadModal(BUY_MODAL)

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
        <button onClick={this.showNeedsModal}>
          <FontAwesomeIcon icon="plus" />
          <p>Need</p>
        </button>
        <button onClick={this.showWantsModal}>
          <FontAwesomeIcon icon="plus" />
          <p>Want</p>
        </button>
        <ul>
          <li>Adjust</li>
          <li>Delete</li>
        </ul>
        <FontAwesomeIcon icon="dollar-sign" onClick={this.showTransferModal} />
        <FontAwesomeIcon icon="shopping-cart" onClick={this.showBuyModal} />
        <FontAwesomeIcon icon="sliders-h" />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loadModal: modalType => dispatch(loadModal(modalType))
})

export default connect(null, mapDispatchToProps)(SidebarContent)
