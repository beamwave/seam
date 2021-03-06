import React from 'react'

const initialState = {
  sidebarOpen: true,
  docked: true,
  editMode: false,
  oldPoints: 100,
  newPoints: 100,
  oldUndistributedCash: 0,
  newUndistributedCash: 0,
  available: 4
}

export const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'DOCK':
      return {
        ...state,
        sidebarOpen: !state.app.sidebarOpen
      }

    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.app.sidebarOpen
      }

    case 'EDITMODE':
      return { ...state, editMode: !state.editMode }

    case 'DIVVY':
      return {
        ...state,
        oldPoints: state.newPoints,
        newPoints: action.user.points,
        oldUndistributedCash: state.newUndistributedCash,
        newUndistributedCash: action.user.undistributedCash
      }

    case 'DISTRIBUTE':
      return {
        ...state,
        oldUndistributedCash: state.newUndistributedCash,
        newUndistributedCash: action.user.undistributedCash
      }

    case 'UPDATE':
      return {
        ...state,
        oldPoints: state.newPoints,
        newPoints: action.user.points
      }

    case 'CREATE_WANT':
      return {
        ...state,
        oldPoints: state.newPoints,
        newPoints: action.points
      }

    case 'CREATE_NEED':
      return {
        ...state,
        oldPoints: state.newPoints,
        newPoints: action.points
      }

    case 'IMAGES':
      return { ...state, wallpaper: action.user.wallpaper }

    case 'PURCHASE':
      return { ...state, available: action.user.available }

    case 'DELETE':
      return {
        ...state,
        oldPoints: state.newPoints,
        newPoints: action.user.points,
        oldUndistributedCash: state.newUndistributedCash,
        newUndistributedCash: action.user.undistributedCash
      }

    case 'WIPE':
      return {
        ...state,
        oldUndistributedCash: state.newUndistributedCash,
        newUndistributedCash: action.user.undistributedCash
      }

    case 'NUKE':
      return {
        ...state,
        oldPoints: 100,
        newPoints: 100,
        oldUndistributedCash: state.newUndistributedCash,
        newUndistributedCash: action.user.undistributedCash
      }

    default:
      return state
  }
}
