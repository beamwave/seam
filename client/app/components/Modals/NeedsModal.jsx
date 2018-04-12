import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class NeedsModal extends Component {
  onClose = () => this.props.hideModal()

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="needs-modal">
          <div className="needs-modal_header">
            <h2 className="title">New Need</h2>
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <p className="remaining-points">
            <span>27</span> points remaining
          </p>
          <form className="needs-form">
            <div className="input-group">
              <label className="title" htmlFor="name">
                Name
              </label>
              <input type="text" name="name" />
            </div>

            <div className="needs-numerical-data">
              <div className="input-group">
                <label className="title" htmlFor="percent">
                  Percent
                </label>
                <span className="percent-symbol">%</span>
                <input className="percent" type="number" placeholder="0" />
              </div>

              <div className="input-group">
                <label className="title" htmlFor="method">
                  Method
                </label>
                <select
                  className="method"
                  type="text"
                  name="method"
                  placeholder="0"
                >
                  <option value="recurrent">Recurrent</option>
                  <option value="growth">Growth</option>
                </select>
              </div>
            </div>

            {/* <label htmlFor="date">Date</label> */}
            {/* <select name="date">
            <option value="" />
          </select> */}

            <div className="input-group">
              <label className="title" htmlFor="description">
                Description
              </label>
              <textarea className="description" name="description" />
            </div>

            <div className="input-group">
              <label className="title" htmlFor="image">
                Upload Image
              </label>
              <input className="upload" type="file" placeholder="new image" />
            </div>

            <div className="jpeg-placeholder" />

            <div className="needs-modal_buttons">
              <button className="cancel">Cancel</button>
              <button className="submit" type="submit">
                Create
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

export default connect(null, mapDispatchToProps)(NeedsModal)
