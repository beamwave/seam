import React from 'react'
import { Elements } from 'react-stripe-elements'

import CheckoutForm from './CheckoutForm.jsx'

export const PaymentPage = () => (
  <Elements>
    <CheckoutForm />
  </Elements>
)

export default PaymentPage
