import React from 'react'
import { CardExpiryElement } from 'react-stripe-elements'

export const ExpirationSection = () => (
  <label className="input-group">
    <label htmlFor="exp" className="title">
      Exp
    </label>
    <CardExpiryElement className="input" name="exp" />
  </label>
)

export default ExpirationSection
