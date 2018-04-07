import React, { Component } from 'react'
// import Modal from 'react-modal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

export class TransferModal extends Component {
  render = () => {
    return (
      <Modal>
        <div className="transfer-modal_header">
          <FontAwesomeIcon icon="times" />
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

export default TransferModal
