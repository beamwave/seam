import React, { Component } from 'react'

export class Modal extends Component {
  // accessibility
  listenKeyboard = e => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      this.props.onClose()
    }
  }

  componentDidMount = () => {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard, true)
    }
  }

  // prevent memory leaks
  componentWillUnmount = () => {
    if (this.props.onClose) {
      window.removeEventListener('keydown', this.listenKeyboard, true)
    }
  }

  // close modal when whole page overlay is clicked
  onOverlayClick = () => this.props.onClose()

  // prevents closing modal if click within modal
  // (because closes when whole page overlay is clicked )
  onDialogClick = e => e.stopPropagation()

  render = () => (
    <div>
      <div className="modal-overlay-div" />

      {/* <div className="modal-content-div" onClick={this.onOverlayClick}> */}
      <div className="modal-content-div">
        <div className="modal-dialog-div" onClick={this.onDialogClick}>
          {this.props.children}
        </div>
      </div>
    </div>
  )
}

export default Modal
