import React from 'react'

export const appReducer = (state = { sidebarOpen: true }, action = {}) => {
  switch (action.type) {
    case 'SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    default:
      return state
  }
}
