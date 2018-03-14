import React from 'react'
import { CardExpiryElement } from 'react-stripe-elements'

export const ExpirationSection = () => (
  <label>
    Expiration date
    <CardExpiryElement />
  </label>
)

export default ExpirationSection
