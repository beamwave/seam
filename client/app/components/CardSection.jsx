import React from 'react'
import { CardNumberElement } from 'react-stripe-elements'

export const CardSection = () => (
  <label>
    Card number
    <CardNumberElement />
  </label>
)

export default CardSection
