import React from 'react'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return action.user
    case 'USER_LOGGED_OUT':
      return action.user
    default:
      return state
  }
}
