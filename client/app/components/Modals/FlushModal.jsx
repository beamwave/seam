import React, { Component } from 'react'
// import Modal from 'react-modal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

export class FlushModal extends Component {
  render = () => {
    return (
      <Modal>
        <div className="flush-modal_header">
          <FontAwesomeIcon icon="times" />
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

export default FlushModal
