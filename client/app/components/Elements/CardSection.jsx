import React from 'react'
import { CardElement } from 'react-stripe-elements'

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '24px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  }
}

const style = {
  base: {
    fontSize: '1.1rem',
    color: '#828282',
    letterSpacing: '1px',
    fontFamily: 'Amiko, Helvetica, Arial, sans-serif',
    '::placeholder': {
      color: '#bdbdbd'
    }
  },
  invalid: {
    color: '#eb5757'
  }
}

export const CardSection = () => (
  <label className="input-group">
    <label className="title" htmlFor="card">
      Card number
    </label>
    <CardElement name="card" className="input purchase" style={style} />
  </label>
)

export default CardSection
