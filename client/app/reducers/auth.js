import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const authReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.user.token,
        email: action.user.email,
        confirmed: action.user.confirmed
      }

    case 'LOGOUT':
      return {}

    case 'IMAGES':
      return { ...state, images: action.images }
    default:
      return state
  }
}
