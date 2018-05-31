import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

import ModalContainer from '../components/ModalContainer.jsx'

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

import { startSetUser, editMode } from '../actions/app'

class PrivateRoute extends Component {
  // shortcut key listeners
  listenKeyboard = e => {
    if (e.ctrlKey && e.which == 69) {
      this.props.editMode()
    }

    if (e.ctrlKey && e.which == 87) {
      this.showWantsModal()
    }

    if (e.ctrlKey && e.which == 78) {
      this.showNeedsModal()
    }

    if (e.ctrlKey && e.which == 84) {
      this.showTransferModal()
    }

    if (e.ctrlKey && e.which == 68) {
      this.showDistributeModal()
    }
  }

  componentWillMount = () => {
    console.log('activating start set user')
    this.props.startSetUser({ email: this.props.email })
    window.addEventListener('keydown', this.listenKeyboard, true)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.listenKeyboard, true)
  }

  showWantsModal = () => this.props.loadModal(WANTS_MODAL)
  showNeedsModal = () => this.props.loadModal(NEEDS_MODAL)
  showTransferModal = () => this.props.loadModal(TRANSFER_MODAL)
  showDistributeModal = () => this.props.loadModal(DISTRIBUTE_MODAL)
  showWipeModal = () => this.props.loadModal(WIPE_MODAL)
  showFlushModal = () => this.props.loadModal(FLUSH_MODAL)
  showBuyModal = () => this.props.loadModal(BUY_MODAL)

  render = () => {
    const {
      isAuthenticated,
      onSetSidebarOpen,
      component: Component,
      ...rest
    } = this.props

    return (
      <Route
        {...rest}
        component={props =>
          isAuthenticated ? (
            <div>
              <Header />
              <Component {...props} />
              <ModalContainer />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
  email: state.auth.email
})

export default connect(
  mapStateToProps,
  { startSetUser, loadModal, editMode },
  null,
  {
    pure: false
  }
)(PrivateRoute)
