import React from 'react'
import { PostalCodeElement } from 'react-stripe-elements'

export const PostalSection = () => (
  <label className="input-group">
    <label htmlFor="postal" className="title">
      Postal code
    </label>
    <PostalCodeElement className="input" name="postal" />
  </label>
)

export default PostalSection
