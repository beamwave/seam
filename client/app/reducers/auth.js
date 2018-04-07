import React from 'react'

export const authReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return {}
    case 'IMAGES':
      return { ...state, images: action.images }
    default:
      return state
  }
}
