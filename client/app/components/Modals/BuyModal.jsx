import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { hideModal } from '../../actions/modal'

export class BuyModal extends Component {
  state = {
    buying: '',
    name: '',
    card: '',
    exp: '',
    cvc: '',
    country: '',
    zip: ''
  }

  onBuyChange = ({ target }) => this.setState({ buying: target.value })

  onFieldChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  onClose = () => this.props.hideModal()

  onSubmitPayment = () => {}

  render = () => {
    const { wants, needs } = this.props
    const { buying } = this.state

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
            {wants.length + needs.length < 5 ? (
              <p className="remaining-accounts">
                You can create {4 - wants.length + needs.length} more free
                accounts
              </p>
            ) : (
              <p className="remaining-accounts">
                You have {wants.length + needs.length} total accounts
              </p>
            )}
          </div>
          <form
            className="buy-form"
            autoComplete="off"
            onSubmit={this.onSubmitPayment}
          >
            <div className="split-card-data">
              <div className="input-group">
                <label className="title" htmlFor="name">
                  Name
                </label>
                <input type="text" name="name" onChange={this.onFieldChange} />
              </div>
              <div className="input-group">
                <label className="title" htmlFor="number">
                  Buying
                </label>
                <input
                  type="text"
                  name="number"
                  value={buying}
                  onChange={this.onBuyChange}
                  placeholder="number of accounts?"
                />
              </div>
            </div>
            <div className="input-group">
              <label className="title" htmlFor="card">
                Card Number
              </label>
              <input type="text" name="card" onChange={this.onFieldChange} />
            </div>
            <div className="split-card-data">
              <div className="input-group">
                <label className="title" htmlFor="exp">
                  Exp
                </label>
                <input type="number" name="exp" onChange={this.onFieldChange} />
              </div>
              <div className="input-group">
                <label className="title" htmlFor="cvc">
                  CVC
                </label>
                <input type="text" name="cvc" onChange={this.onFieldChange} />
              </div>
            </div>
            <div className="split-card-data">
              <div className="input-group">
                <label className="title" htmlFor="country">
                  Country
                </label>
                <FontAwesomeIcon className="icon" icon="angle-down" />
                <select
                  className="select"
                  type="text"
                  name="country"
                  onChange={this.onFieldChange}
                >
                  <option value="US">US</option>
                  <option value="US">Europe</option>
                  <option value="US">Brazil</option>
                  <option value="US">Japan</option>
                  <option value="US">Russia</option>
                </select>
              </div>
              <div className="input-group">
                <label className="title" htmlFor="zip">
                  Zip
                </label>
                <input type="number" name="zip" onChange={this.onFieldChange} />
              </div>
            </div>
            <p className="annotation">Each additional account is 99¢.</p>
            <div className="buy-modal_buttons">
              <button className="cancel" onClick={this.onClose}>
                Cancel
              </button>
              {(+buying === 0 || +buying > 92) && (
                <button className="submit" type="submit" disabled="true">
                  Purchase
                </button>
              )}
              {+buying !== 0 &&
                +buying < 93 && (
                  <button className="submit" type="submit">
                    Purchase for $<span>{(+buying * 99 / 100).toFixed(2)}</span>
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
  hideModal: () => dispatch(hideModal())
})

const mapStateToProps = state => ({
  email: state.auth.email,
  wants: state.wants.newWants,
  needs: state.needs.newNeeds
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyModal)
