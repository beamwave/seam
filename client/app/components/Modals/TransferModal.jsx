import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'
import { startTransfer } from '../../actions/app'
import { simplifyNumber } from '../../helpers/helpers'

export class TransferModal extends Component {
  state = {
    amount: '',
    from: 'choose',
    to: 'choose'
  }

  onClose = () => this.props.hideModal()

  onTransfer = e => {
    e.preventDefault()

    const { email, startTransfer } = this.props
    const { amount, from, to } = this.state

    const data = {
      email,
      amount: amount * 100, // convert to pennies
      from,
      to
    }

    startTransfer(data).then(() => this.onClose())
  }

  onFieldChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  onInputChange = ({ target }) => {
    const regex = /^\d{1,}(\.\d{0,2})?$/

    if (
      (!target.value || target.value.match(regex)) &&
      target.value.length < 13
    ) {
      this.setState(() => ({ amount: target.value }))
    }
  }

  render = () => {
    const { wants, needs } = this.props
    const { amount, from, to } = this.state
    return (
      <Modal onClose={this.onClose}>
        <div className="transfer-modal">
          <div className="modal_header">
            <h2 className="title">Make a Transfer</h2>
            <FontAwesomeIcon
              icon="times"
              className="close"
              onClick={this.onClose}
            />
          </div>
          <form
            className="transfer-form"
            autoComplete="off"
            onSubmit={this.onTransfer}
          >
            <div className="input-group">
              <label className="title" htmlFor="amount">
                Amount
              </label>
              <span className="dollar-symbol">$</span>
              <input
                type="text"
                name="amount"
                className="transfer"
                placeholder="0"
                onChange={this.onInputChange}
                value={amount}
              />
            </div>

            <div className="transfer-split-data">
              <div className="input-group">
                <label className="title" htmlFor="from">
                  From
                </label>
                <FontAwesomeIcon className="icon" icon="angle-down" />
                <select
                  className="select"
                  name="from"
                  value={from}
                  onChange={this.onFieldChange}
                >
                  {(wants.length > 0 || needs.length > 0) && (
                    <option value="choose" hidden>
                      Choose account
                    </option>
                  )}
                  {wants.length === 0 &&
                    needs.length === 0 && <option value="none">none</option>}
                  {wants.map(
                    want =>
                      !want.completed && (
                        <option value={want._id} key={want._id}>
                          {want.name}
                        </option>
                      )
                  )}
                  {needs.map(
                    need =>
                      !need.completed && (
                        <option value={need._id} key={need._id}>
                          {need.name}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="input-group">
                <label className="title" htmlFor="to">
                  To
                </label>
                <FontAwesomeIcon className="icon" icon="angle-down" />
                <select
                  className="select"
                  name="to"
                  value={to}
                  onChange={this.onFieldChange}
                >
                  {(wants.length > 0 || needs.length > 0) && (
                    <option value="choose" hidden>
                      Choose account
                    </option>
                  )}
                  {wants.length === 0 &&
                    needs.length === 0 && <option value="none">none</option>}
                  {wants.map(
                    want =>
                      !want.completed && (
                        <option value={want._id} key={want._id}>
                          {want.name}
                        </option>
                      )
                  )}
                  {needs.map(
                    need =>
                      !need.completed && (
                        <option value={need._id} key={need._id}>
                          {need.name}
                        </option>
                      )
                  )}
                </select>
              </div>
            </div>

            <p className="annotation">
              The interest rate for this transfer is 3%. You can change this in
              the settings.
            </p>

            <div className="transfer-modal_buttons">
              <button className="cancel" onClick={this.onClose}>
                Cancel
              </button>
              {+amount === 0 ||
              from === 'choose' ||
              to === 'choose' ||
              from === to ? (
                <button className="submit" type="submit" disabled>
                  Transfer
                </button>
              ) : (
                <button className="submit" type="submit">
                  Transfer $<span>{simplifyNumber(amount)}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  startTransfer: data => dispatch(startTransfer(data))
})

const mapStateToProps = state => ({
  email: state.auth.email,
  wants: state.wants.newWants,
  needs: state.needs.newNeeds
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferModal)
