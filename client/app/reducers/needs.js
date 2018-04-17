import React from 'react'

export const needsReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return action.data.needs

    case 'LOGOUT':
      return {}

    case 'CREATE_NEED':
      return [action.details, ...state]

    case 'SET_WALLPAPER':
      return action.user.needs

    // case 'UPDATED_NEED_IMAGES':
    //   return action.needs

    case 'IMAGES':
      return action.user.needs

    case 'NUKE':
      return []

    default:
      return state
  }
}
