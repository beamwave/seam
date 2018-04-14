import React from 'react'

const initialState = { sidebarOpen: true, editMode: false, points: 100 }

export const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }

    case 'EDITMODE':
      return { ...state, editMode: !state.editMode }

    case 'NUKE':
      return { ...state, points: 100 }

    case 'CREATE_WANT':
      return { ...state, points: action.points }

    case 'CREATE_NEED':
      return { ...state, points: action.points }

    default:
      return state
  }
}
