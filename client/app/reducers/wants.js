import React from 'react'

// const initialState = {
//   oldWants: [],
//   newWants: []
// }

export const wantsReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return { oldWants: [], newWants: action.data.wants }

    case 'LOGIN':
      return { oldWants: [], newWants: [] }

    case 'LOGOUT':
      return {}

    case 'CREATE_WANT':
      return {
        ...state,
        oldWants: [action.details, ...state.newWants],
        newWants: [action.details, ...state.newWants]
      }

    case 'SET_WALLPAPER':
      return {
        oldWants: action.user.wants,
        newWants: action.user.wants
      }

    case 'DIVVY':
      return {
        oldWants: state.newWants,
        newWants: action.user.wants
      }

    case 'TRANSFER':
      return {
        oldWants: state.newWants,
        newWants: action.user.wants
      }

    case 'IMAGES':
      return {
        oldWants: action.user.wants,
        newWants: action.user.wants
      }

    case 'UPDATE':
      return {
        oldWants: action.user.wants,
        newWants: action.user.wants
      }

    case 'DELETE':
      return {
        oldWants: action.user.wants,
        newWants: action.user.wants
      }

    case 'WIPE':
      return {
        oldWants: action.user.wants,
        newWants: action.user.wants
      }

    case 'NUKE':
      return {
        oldWants: [],
        newWants: []
      }

    default:
      return state
  }
}
