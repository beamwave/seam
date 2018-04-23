import React from 'react'
import { CardCVCElement } from 'react-stripe-elements'

export const CVCSection = () => (
  <label className="input-group">
    <label className="title" htmlFor="cvc">
      CVC
    </label>
    <CardCVCElement className="input" name="cvc" />
  </label>
)

export default CVCSection
