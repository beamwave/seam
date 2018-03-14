import React from 'react'
import { PostalCodeElement } from 'react-stripe-elements'

export const PostalSection = () => (
  <label>
    Postal code
    <PostalCodeElement />
  </label>
)

export default PostalSection
