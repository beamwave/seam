import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'
import { startInvite } from '../../actions/app'

export class ShareModal extends Component {
  state = {
    recipient: ''
  }

  onClose = () => this.props.hideModal()

  onInvite = e => {
    e.preventDefault()

    const { email, startInvite } = this.props
    const { recipient } = this.state

    startInvite({ email, recipient })
    this.onClose()
  }

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="share-modal">
          <div className="share-modal_header">
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <form className="share-form" onSubmit={this.onInvite}>
            <div className="input-group">
              <label className="title">Send invite to:</label>
              <textarea
                className="email"
                placeholder="person@email.com"
                data-gramm_editor="false"
              />
              <p className="annotation">
                Seperate multiple emails with a comma
              </p>
            </div>
            <div className="share-modal_buttons">
              <button className="cancel" onClick={this.onClose}>
                Cancel
              </button>
              <button className="submit" type="submit" autoFocus="true">
                Invite
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
  startInvite: data => dispatch(startInvite(data))
})

const mapStateToProps = state => ({
  email: state.auth.email
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareModal)
