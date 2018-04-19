import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
// sidebar is used as HOC in AppRouters.jsx

import { loadModal } from '../actions/modal'
import { editMode } from '../actions/app'

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
    buyModalOpened: false,
    buttonSet: 'adjust',
    activeSet: 1
  }

  showWantsModal = () => this.props.loadModal(WANTS_MODAL)
  showNeedsModal = () => this.props.loadModal(NEEDS_MODAL)
  showTransferModal = () => this.props.loadModal(TRANSFER_MODAL)
  showDistributeModal = () => this.props.loadModal(DISTRIBUTE_MODAL)
  showWipeModal = () => this.props.loadModal(WIPE_MODAL)
  showFlushModal = () => this.props.loadModal(FLUSH_MODAL)
  showBuyModal = () => this.props.loadModal(BUY_MODAL)

  setAdjust = () => this.setState({ buttonSet: 'adjust', activeSet: 1 })
  setDelete = () => this.setState({ buttonSet: 'delete', activeSet: 2 })

  // getCash = () => {
  //   const { wants } = this.props
  //   return wants.length > 0
  //     ? wants.map(want => want.progress / 100).reduce((a, b) => a + b)
  //     : 0
  // }

  getCash = () => {
    const { wants, needs } = this.props
    let wcash, ncash
    if (wants.length > 0) {
      wcash = wants.map(want => want.progress / 100).reduce((a, b) => a + b)
    } else {
      wcash = 0
    }
    console.log('wcash: ', wcash)

    if (needs.length > 0) {
      ncash = needs.map(need => need.total / 100).reduce((a, b) => a + b)
    } else {
      ncash = 0
    }
    console.log('ncash: ', ncash)

    return wcash + ncash
  }

  render = () => {
    const { oldPoints, newPoints, undistributedCash } = this.props
    return (
      <div className="sidebar">
        <Link to="/dashboard" className="seam">
          Seam
        </Link>
        <div className="sidebar-group">
          <h3 className="title">Remaining Points</h3>
          <p
            className="details"
            style={{ color: 'white' }}
            // style={{ color: points < 100 && points > 0 ? '#e87c7c' : 'white' }}
          >
            <CountUp
              start={oldPoints}
              end={newPoints}
              duration={2.75}
              useEasing={true}
            />
          </p>
        </div>
        <div className="sidebar-group">
          <h3 className="title">Total Cash</h3>
          <p className="details">${this.getCash()}</p>
        </div>
        <div className="sidebar-group">
          <h3 className="title">Undistributed Cash</h3>
          <p className="details">${undistributedCash}</p>
        </div>
        <hr />
        <div className="account-headers">
          <h3 className="title">Create Account</h3>
          <button className="button -green" onClick={this.showWantsModal}>
            <FontAwesomeIcon className="symbol" icon="plus" size="1x" />
            <p className="text">Want</p>
          </button>
          <button className="button -blue" onClick={this.showNeedsModal}>
            <FontAwesomeIcon className="symbol" icon="plus" size="1x" />
            <p className="text">Need</p>
          </button>
        </div>
        <div className="control-headers">
          <h3
            className={this.state.activeSet === 1 ? 'title -active' : 'title'}
            onClick={this.setAdjust}
          >
            Adjust
          </h3>
          <h3
            className={this.state.activeSet === 2 ? 'title -active' : 'title'}
            onClick={this.setDelete}
          >
            Delete
          </h3>
        </div>

        {this.state.buttonSet === 'adjust' ? (
          <div className="adjust-icons">
            <FontAwesomeIcon
              icon="dollar-sign"
              size="lg"
              className="icon dollar"
              onClick={this.showTransferModal}
            />
            <FontAwesomeIcon
              icon="shopping-cart"
              size="lg"
              className="icon cart"
              onClick={this.showBuyModal}
            />
            <FontAwesomeIcon
              icon="sliders-h"
              size="lg"
              className="icon settings"
              onClick={this.props.editMode}
            />
          </div>
        ) : (
          <div className="delete-icons">
            <FontAwesomeIcon
              icon="sitemap"
              size="lg"
              className="icon boxes"
              onClick={this.showDistributeModal}
            />
            <FontAwesomeIcon
              icon="eraser"
              size="lg"
              className="icon eraser"
              onClick={this.showWipeModal}
            />
            <FontAwesomeIcon
              icon="trash"
              size="lg"
              className="icon trash"
              onClick={this.showFlushModal}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  oldPoints: state.app.oldPoints,
  newPoints: state.app.newPoints,
  undistributedCash: state.app.undistributedCash,
  wants: state.wants,
  needs: state.needs
})

const mapDispatchToProps = dispatch => ({
  loadModal: modalType => dispatch(loadModal(modalType)),
  editMode: () => dispatch(editMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent)
