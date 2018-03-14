import React from 'react'
import { CardCVCElement } from 'react-stripe-elements'

export const CVCSection = () => (
  <label>
    CVC
    <CardCVCElement />
  </label>
)

export default CVCSection
