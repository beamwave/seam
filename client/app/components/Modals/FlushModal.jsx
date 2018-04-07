import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class FlushModal extends Component {
  onClose = () => this.props.hideModal()

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="flush-modal_header">
          <FontAwesomeIcon icon="times" onClick={this.onClose} />
        </div>
        <form>
          <p>Are you sure you want to delete all of your accounts?</p>
          <p>This action is permanent and cannot be undone.</p>
          <div className="flush-modal_buttons">
            <button>Cancel</button>
            <button type="submit">Yes</button>
          </div>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(FlushModal)
