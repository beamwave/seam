import React from 'react'

export const needsReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return action.data.needs

    case 'LOGOUT':
      return {}

    case 'CREATE_NEED':
      return [action.details, ...state]

    case 'IMAGES':
      return action.needs

    case 'NUKE':
      return []

    default:
      return state
  }
}
