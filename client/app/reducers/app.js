import React from 'react'

// toggleSidebar = () =>
//     this.setState(prevState => ({ sidebarOpen: !this.prevState.sidebarOpen }))

export const appReducer = (state = { sidebarOpen: true }, action = {}) => {
  switch (action.type) {
    case 'SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    default:
      return state
  }
}
