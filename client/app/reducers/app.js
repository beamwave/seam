import React from 'react'

const initialState = { sidebarOpen: true, editMode: false }

export const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }

    case 'EDITMODE':
      return { ...state, editMode: !state.editMode }

    default:
      return state
  }
}
