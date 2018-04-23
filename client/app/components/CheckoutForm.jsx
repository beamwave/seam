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
  state = { qty: '' }

  onSubmit = e => {
    const { qty } = this.state
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

    this.props.stripe
      .createToken({ email: this.props.email, qty })
      .then(({ token }) => {
        token.user = this.props.token
        console.log(token)
        this.props.handleToken(token)
      })
    // this.props.stripe.createToken({ name: 'Eric' }).then(({ token }) => {
    //   token.user = this.props.token
    //   // console.log(token)
    //   this.props.handleToken(token)
    // })
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
    const { hideModal, wants, needs } = this.props
    const { qty } = this.state
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
            {wants.length + needs.length < 5 ? (
              <input
                className="quantity"
                type="text"
                placeholder={`${1}-${96}`}
                value={qty}
                onChange={this.onQtyChange}
              />
            ) : (
              <input
                className="quantity"
                type="text"
                placeholder={`${1}-${100 - wants.length + needs.length}`}
                value={qty}
                onChange={this.onQtyChange}
              />
            )}
            <p className="annotation">Each additional account is 0.99¢.</p>
          </div>
        </div>
        <CardSection />
        <div className="buy-modal_buttons">
          <button type="button" className="cancel" onClick={this.onClose}>
            Cancel
          </button>
          {(+qty === 0 || +qty > 92) && (
            <button className="submit" type="submit" disabled="true">
              Pay
            </button>
          )}
          {+qty === 1 && (
            <button className="submit" type="submit">
              Pay $<span>{0.99}</span>
            </button>
          )}
          {+qty !== 0 &&
            +qty > 1 &&
            +qty < 96 && (
              <button className="submit" type="submit">
                Pay $<span>{+qty - 1 + 99 / 100}</span>
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
  needs: state.needs.newNeeds
})

export default injectStripe(
  connect(mapStateToProps, { handleToken, hideModal })(CheckoutForm)
)
