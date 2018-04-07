import React, { Component } from 'react'
// import Modal from 'react-modal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

export class WantsModal extends Component {
  render = () => {
    return (
      <Modal>
        <div className="wants-modal_header">
          <h2>New Want</h2>
          <FontAwesomeIcon icon="times" />
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

export default WantsModal
