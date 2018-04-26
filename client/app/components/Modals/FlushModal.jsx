import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'
import { startNuke } from '../../actions/app'

export class FlushModal extends Component {
  onClose = () => this.props.hideModal()

  onNuke = e => {
    const { email, startNuke } = this.props

    e.preventDefault()
    if (!!this.props.history) {
      this.props.history.push('/')
      startNuke({ email: email })
    } else {
      startNuke({ email: email })
    }
    this.onClose()
  }

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="flush-modal">
          <div className="flush-modal_header">
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <form className="flush-form" onSubmit={this.onNuke}>
            <div className="input-group">
              <p className="warning">
                Are you sure you want to delete all of your accounts?
              </p>
              <p className="info">
                This action is permanent and cannot be undone.
              </p>
            </div>
            <div className="flush-modal_buttons">
              <button className="cancel" onClick={this.onClose}>
                Cancel
              </button>
              <button className="submit" type="submit" autoFocus="true">
                Yes
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  startNuke: email => dispatch(startNuke(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(FlushModal)
