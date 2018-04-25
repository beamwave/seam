import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import CheckoutForm from '../CheckoutForm.jsx'
import { Elements } from 'react-stripe-elements'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class BuyModal extends Component {
  onClose = () => this.props.hideModal()

  render = () => {
    const { wants, needs } = this.props

    return (
      <Modal onClose={this.onClose}>
        <div className="buy-modal">
          <div className="modal_header">
            <h2 className="title">Add accounts</h2>
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <div>
            {wants.length + needs.length < 4 ? (
              <p className="remaining-accounts">
                You can create {4 - (wants.length + needs.length)} more free
                accounts
              </p>
            ) : (
              <p className="remaining-accounts">
                You have {wants.length + needs.length} total accounts
              </p>
            )}
          </div>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

const mapStateToProps = state => ({
  email: state.auth.email,
  wants: state.wants.newWants,
  needs: state.needs.newNeeds
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyModal)
