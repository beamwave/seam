import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'
import numeral from 'numeral'
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
  setDelete = () => {
    this.setState({ buttonSet: 'delete', activeSet: 2 })
  }

  getCash = () => {
    const {
      wants,
      needs,
      oldWants,
      oldNeeds,
      oldUndistributedCash,
      newUndistributedCash
    } = this.props

    try {
      const prevWantsCash =
        oldWants.length > 0
          ? oldWants.map(want => want.progress / 100).reduce((a, b) => a + b)
          : 0

      const newWantsCash =
        wants.length > 0
          ? wants.map(want => want.progress / 100).reduce((a, b) => a + b)
          : 0

      const prevNeedsCash = oldNeeds.length
        ? oldNeeds.map(need => need.total / 100).reduce((a, b) => a + b)
        : 0

      const newNeedsCash =
        needs.length > 0
          ? needs.map(need => need.total / 100).reduce((a, b) => a + b)
          : 0

      const undistributedCash = newUndistributedCash / 100

      const oldMoney = prevWantsCash + prevNeedsCash + undistributedCash
      const newMoney = newWantsCash + newNeedsCash + undistributedCash

      return { oldMoney, newMoney }
    } catch (e) {
      console.log('sidebar content error: ', e)
    }
  }

  render = () => {
    const {
      oldPoints,
      newPoints,
      oldUndistributedCash,
      newUndistributedCash
    } = this.props
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
          <p className="details">
            <CountUp
              start={this.getCash() !== undefined ? this.getCash().oldMoney : 0}
              end={this.getCash() !== undefined ? this.getCash().newMoney : 0}
              prefix="$"
              separator=","
              duration={2.75}
              useEasing={true}
              // easingFn={'outQuintic'} //, easeOutExpo, outQuintic, outCubic
            />
          </p>
        </div>
        <div className="sidebar-group">
          <h3 className="title">Undistributed Cash</h3>
          <p className="details">
            <CountUp
              start={oldUndistributedCash / 100}
              end={newUndistributedCash / 100}
              prefix="$"
              separator=","
              duration={2.75}
              useEasing={true}
              // easingFn={'outQuintic'} //, easeOutExpo, outQuintic, outCubic
            />
          </p>
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
  oldUndistributedCash: state.app.oldUndistributedCash,
  newUndistributedCash: state.app.newUndistributedCash,
  oldWants: state.wants.oldWants,
  wants: state.wants.newWants,
  oldNeeds: state.needs.oldNeeds,
  needs: state.needs.newNeeds
})

const mapDispatchToProps = dispatch => ({
  loadModal: modalType => dispatch(loadModal(modalType)),
  editMode: () => dispatch(editMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent)
