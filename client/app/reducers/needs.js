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

    case 'LOGIN':
      return { oldNeeds: [], newNeeds: [] }

    case 'LOGOUT':
      return {}

    case 'CREATE_NEED':
      return {
        ...state,
        oldNeeds: [action.details, ...state.newNeeds],
        newNeeds: [action.details, ...state.newNeeds]
      }

    case 'SET_WALLPAPER':
      return {
        oldNeeds: action.user.needs,
        newNeeds: action.user.needs
      }

    case 'DIVVY':
      return {
        oldNeeds: state.newNeeds,
        newNeeds: action.user.needs
      }

    case 'TRANSFER':
      return {
        oldNeeds: state.newNeeds,
        newNeeds: action.user.needs
      }

    case 'IMAGES':
      return {
        oldNeeds: action.user.needs,
        newNeeds: action.user.needs
      }

    case 'UPDATE':
      return {
        oldNeeds: action.user.needs,
        newNeeds: action.user.needs
      }

    case 'DELETE':
      return {
        oldNeeds: action.user.needs,
        newNeeds: action.user.needs
      }

    case 'WIPE':
      return {
        oldNeeds: action.user.needs,
        newNeeds: action.user.needs
      }

    case 'NUKE':
      return {
        oldNeeds: [],
        newNeeds: []
      }

    default:
      return state
  }
}
