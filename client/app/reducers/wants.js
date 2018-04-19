import React from 'react'

const initialState = {
  oldWants: [],
  newWants: []
}

export const wantsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return { ...state, newWants: action.data.wants }

    case 'LOGOUT':
      return {}

    case 'CREATE_WANT':
      return {
        ...state,
        oldWants: state.newWants,
        newWants: [action.details, ...state.newWants]
      }

    case 'SET_WALLPAPER':
      return action.user.wants

    case 'DIVVY':
      return action.user.wants

    case 'IMAGES':
      return action.user.wants

    case 'NUKE':
      return []

    default:
      return state
  }
}
