import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class WipeModal extends Component {
  onClose = () => this.props.hideModal()

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
          <form className="wipe-form">
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
              <button className="submit" type="submit">
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
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(WipeModal)
