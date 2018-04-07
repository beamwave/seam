import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class BuyModal extends Component {
  onClose = () => this.props.hideModal()

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <FontAwesomeIcon icon="times" onClick={this.onClose} />
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />

          <label htmlFor="number">Card Number</label>
          <input type="text" name="number" />

          <label htmlFor="exp">Exp</label>
          <input type="number" name="exp" />

          <label htmlFor="cvc">CVC</label>
          <input type="text" name="cvc" />

          <label htmlFor="country">Country</label>
          <select type="text" name="country">
            <option value="US">US</option>
          </select>

          <label htmlFor="zip">Zip</label>
          <input type="number" name="zip" />

          <div>
            <p>You currently have 43 accounts.</p>
            <p>Each additional account is 99¢.</p>
            <p>How many accounts would you like to add?</p>
          </div>
          <input type="text" placeholder="0" />

          <div className="wants-modal_buttons">
            <button>Cancel</button>
            <button type="submit">
              Buy for $<span>6.99</span>
            </button>
          </div>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(BuyModal)
