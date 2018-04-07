import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class DistributeModal extends Component {
  onClose = () => this.props.hideModal()

  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="distribute-modal_header">
          <FontAwesomeIcon icon="times" onClick={this.onClose} />
        </div>
        <form>
          <label htmlFor="amount">Distribute</label>
          <span>$</span>
          <input type="text" name="amount" placeholder="5094" />

          <label htmlFor="to">To</label>
          <select name="to">
            <option value="choose" disabled>
              Choose account
            </option>
            <option value="rent">Rent</option>
            <option value="food">Food</option>
          </select>

          <p>Or</p>
          <hr />

          <select>
            <option value="evenly" disabled>
              Evenly Between All Accounts
            </option>
            <option value="wants">Evenly Between Only Wants</option>
            <option value="needs">Evenly Between Only Needs</option>
          </select>

          <div className="distribute-modal_buttons">
            <button>Cancel</button>
            <button type="submit">Distribute</button>
          </div>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(DistributeModal)
