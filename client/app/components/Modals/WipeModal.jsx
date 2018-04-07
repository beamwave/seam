import React, { Component } from 'react'
// import Modal from 'react-modal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

export class WipeModal extends Component {
  render = () => {
    return (
      <Modal>
        <div className="wipe-modal_header">
          <FontAwesomeIcon icon="times" />
        </div>
        <form>
          <p>Are you sure you want to reset your cash to 0?</p>
          <p>This action is permanent and cannot be undone.</p>
          <div className="wipe-modal_buttons">
            <button>Cancel</button>
            <button type="submit">Wipe cash</button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default WipeModal
