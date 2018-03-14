import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'

import CardSection from './CardSection.jsx'
import ExpirationSection from './ExpirationSection.jsx'
import CVCSection from './CVCSection.jsx'
import PostalSection from './PostalSection.jsx'

import { handleToken } from '../actions/auth'

export class CheckoutForm extends Component {
  onSubmit = e => {
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
      .createToken({ email: this.props.email })
      .then(({ token }) => {
        // token.user = this.props.token
        // console.log(token)
        this.props.handleToken(token)
      })
    // this.props.stripe.createToken({ name: 'Eric' }).then(({ token }) => {
    //   token.user = this.props.token
    //   // console.log(token)
    //   this.props.handleToken(token)
    // })
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <CardSection />
        <ExpirationSection />
        <CVCSection />
        <PostalSection />
        <button type="submit">Pay</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  token: state.auth.token
})

export default injectStripe(
  connect(mapStateToProps, { handleToken })(CheckoutForm)
)
