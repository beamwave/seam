import React from 'react'

const initialState = {
  oldNeeds: [],
  newNeeds: []
}

export const needsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return {
        ...state,
        newNeeds: action.data.needs
      }

    case 'LOGOUT':
      return {}

    case 'CREATE_NEED':
      return {
        ...state,
        oldNeeds: state.newNeeds,
        newNeeds: [action.details, ...state.newNeeds]
      }

    case 'SET_WALLPAPER':
      return action.user.needs

    case 'DIVVY':
      return action.user.needs

    case 'IMAGES':
      return action.user.needs

    case 'NUKE':
      return []

    default:
      return state
  }
}
