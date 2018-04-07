import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class WantsModal extends Component {
  onClose = () => this.props.hideModal()

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="wants-modal_header">
          <h2>New Want</h2>
          <FontAwesomeIcon icon="times" onClick={this.onClose} />
          <p>
            <span>27</span> points remaining
          </p>
        </div>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />

          <label htmlFor="percent">Percent</label>
          <span>%</span>
          <input type="number" placeholder="0" />

          <label htmlFor="goal">Goal</label>
          <span>$</span>
          <input type="text" placeholder="0" />

          <label htmlFor="description">Description</label>
          <textarea name="description" />

          <label htmlFor="image">Upload Image</label>
          <input type="file" placeholder="new image" />

          <div className="jpeg-placeholder" />

          <div className="wants-modal_buttons">
            <button>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(WantsModal)
