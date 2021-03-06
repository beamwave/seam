import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'
import { startWipe } from '../../actions/app'

export class WipeModal extends Component {
  onClose = () => this.props.hideModal()

  onWipe = e => {
    const { email, startWipe } = this.props

    e.preventDefault()
    startWipe({ email })
    this.onClose()
  }

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="wipe-modal">
          <div className="wipe-modal_header">
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <form className="wipe-form" onSubmit={this.onWipe}>
            <div className="input-group">
              <p className="warning">
                Are you sure you want to reset your cash to 0?
              </p>
              <p className="info">
                This action is permanent and cannot be undone.
              </p>
            </div>
            <div className="wipe-modal_buttons">
              <button className="cancel" onClick={this.onClose}>
                Cancel
              </button>
              <button className="submit" type="submit" autoFocus="true">
                Wipe cash
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  startWipe: email => dispatch(startWipe(email))
})

const mapStateToProps = state => ({
  email: state.auth.email
})

export default connect(mapStateToProps, mapDispatchToProps)(WipeModal)
