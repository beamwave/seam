import React, { Component } from 'react'
// import Modal from 'react-modal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

export class NeedsModal extends Component {
  render = () => {
    return (
      <Modal>
        <div className="needs-modal_header">
          <h2>New Need</h2>
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

          <label htmlFor="method">Method</label>
          <span>$</span>
          <select type="text" name="method" placeholder="0">
            <option value="recurrent">Recurrent</option>
            <option value="growth">Growth</option>
          </select>

          <label htmlFor="date">Date</label>
          {/* <select name="date">
            <option value="" />
          </select> */}

          <label htmlFor="description">Description</label>
          <textarea name="description" />

          <label htmlFor="image">Upload Image</label>
          <input type="file" placeholder="new image" />

          <div className="jpeg-placeholder" />

          <div className="needs-modal_buttons">
            <button>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default NeedsModal