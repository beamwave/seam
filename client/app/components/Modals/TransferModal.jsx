import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class TransferModal extends Component {
  onClose = () => this.props.hideModal()

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="transfer-modal_header">
          <FontAwesomeIcon icon="times" onClick={this.onClose} />
        </div>
        <form>
          <label htmlFor="amount">Amount</label>
          <input type="text" name="amount" placeholder="0" />

          <label htmlFor="from">From</label>
          <select name="from">
            <option value="choose" disabled>
              Choose account
            </option>
            <option value="rent">Rent</option>
          </select>

          <label htmlFor="to">To</label>
          <select name="to">
            <option value="choose" disabled>
              Choose account
            </option>
            <option value="food">Food</option>
          </select>

          <p>
            The interest rate for this transfer is 3%. To change your interest
            rate, go to the settings page.
          </p>

          <div className="transfer-modal_buttons">
            <button>Cancel</button>
            <button type="submit">
              Transfer $<span>(input amount)</span>
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

export default connect(null, mapDispatchToProps)(TransferModal)
