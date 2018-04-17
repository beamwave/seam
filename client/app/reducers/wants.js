import React from 'react'

export const wantsReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return action.data.wants

    case 'LOGOUT':
      return {}

    case 'CREATE_WANT':
      return [action.details, ...state]

    case 'SET_WALLPAPER':
      return action.user.wants

    // case 'UPDATED_WANTS_IMAGES':
    //   return action.wants

    case 'IMAGES':
      return action.user.wants

    case 'NUKE':
      return []

    default:
      return state
  }
}
