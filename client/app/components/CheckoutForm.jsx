import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'

import CardSection from './Elements/CardSection.jsx'
import ExpirationSection from './Elements/ExpirationSection.jsx'
import CVCSection from './Elements/CVCSection.jsx'
import PostalSection from './Elements/PostalSection.jsx'

import { hideModal } from '../actions/modal'
import { handleToken } from '../actions/auth'

export class CheckoutForm extends Component {
  state = { name: '', qty: '' }

  onClose = () => this.props.hideModal()

  onFieldChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  onSubmit = e => {
    const { name, qty } = this.state
    const { email, token } = this.props
    e.preventDefault()

    // const token = this.props.stripe.createToken()

    // this.props.handleToken(token).then(({ token }) => {
    //   console.log(`Received Stripe token: ${token}`)
    // })

    // passed down from injectStripe HOC
    // this.props.stripe.createToken({ name: 'Eric' }).then(token => {
    //   console.log(`Received Stripe token:`)
    //   console.log(token)
    // })

    this.props.stripe.createToken({ email }).then(({ token }) => {
      token.user = this.props.token
      token.qty = qty
      token.name = name

      console.log('token: ', token)
      console.log('qty: ', qty)
      this.props.handleToken(token).then(() => this.onClose())
    })
  }

  onQtyChange = ({ target }) => {
    const regex = /^\d{1,}$/

    if (
      (!target.value || target.value.match(regex)) &&
      target.value.length < 3
    ) {
      this.setState(() => ({ qty: target.value }))
    }
  }

  render() {
    const { hideModal, available, wants, needs } = this.props
    const { qty } = this.state
    const floor =
      wants.length + needs.length < 4 ? 4 : wants.length + needs.length
    const remaining = 100 - available - floor
    // remaining doesn't = 0 or 1, then display available
    // else if remaining does = 0, display max
    // else if remaining does = 1, display 1
    const placeholder =
      remaining != 0 && remaining != 1
        ? `${1}-${96 - available}`
        : remaining === 0
          ? 'Maximum reached'
          : '1'
    console.log('remaining: ', remaining)
    return (
      <form className="buy-form" onSubmit={this.onSubmit}>
        <div className="split-card-data">
          <div className="input-group">
            <div className="stats">
              <p className="subtext">accounts</p>
              <p className="text">{wants.length + needs.length}/100</p>
            </div>
          </div>
          <div className="input-group">
            <label className="title" htmlFor="amount">
              Quantity
            </label>
            {remaining !== 0 && (
              <input
                className="quantity"
                type="text"
                placeholder={placeholder}
                value={qty}
                onChange={this.onQtyChange}
              />
            )}
            {remaining === 0 && (
              <input
                className="quantity"
                type="text"
                placeholder={placeholder}
                value={qty}
                onChange={this.onQtyChange}
                disabled
              />
            )}

            <p className="annotation">Each additional account is 0.99¢.</p>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="name" className="title">
            Cardholder
          </label>
          {remaining !== 0 && (
            <input
              type="text"
              className="input"
              name="name"
              onChange={this.onFieldChange}
              placeholder="Name as printed on card"
            />
          )}
          {remaining === 0 && (
            <input
              type="text"
              className="input"
              name="name"
              onChange={this.onFieldChange}
              placeholder="Name as printed on card"
              disabled
            />
          )}
        </div>
        {remaining !== 0 && <CardSection />}
        {remaining === 0 && <CardSection disabled="true" />}
        <div className="buy-modal_buttons">
          <button type="button" className="cancel" onClick={this.onClose}>
            Cancel
          </button>
          {remaining === 0 && (
            <button className="submit" type="submit" disabled="true">
              Maximum accounts purchased
            </button>
          )}
          {+qty === 1 &&
            remaining !== 0 && (
              <button className="submit" type="submit">
                Pay $<span>0.99</span>
              </button>
            )}
          {+qty !== 0 &&
            +qty > 1 &&
            +qty <= remaining && (
              <button className="submit" type="submit">
                Pay $<span>{+qty - 1 + 99 / 100}</span>
              </button>
            )}
          {+qty > remaining &&
            remaining !== 0 && (
              <button className="submit" type="submit" disabled="true">
                Pay
              </button>
            )}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  token: state.auth.token,
  wants: state.wants.newWants,
  needs: state.needs.newNeeds,
  available: state.app.available
})

export default injectStripe(
  connect(mapStateToProps, { handleToken, hideModal })(CheckoutForm)
)
