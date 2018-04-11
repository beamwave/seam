import React from 'react'

export const wantsReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return action.data.wants

    case 'LOGOUT':
      return {}

    case 'CREATE_WANT':
      return [action.details, ...state]

    case 'IMAGES':
      return action.wants

    default:
      return state
  }
}
