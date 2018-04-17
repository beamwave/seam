import React from 'react'
import api from '../api'

export const editMode = () => ({
  type: 'EDITMODE'
})

export const toggleSidebar = () => ({
  type: 'SIDEBAR'
})

export const setUser = data => ({
  type: 'INITIAL_DATA',
  data
})

export const startSetUser = email => dispatch => {
  api.user.getUser(email).then(user => {
    // set what information is put in redux on reloads
    dispatch(
      setUser({
        wants: user.wants,
        needs: user.needs
      })
    )
  })
}

export const display = user => ({
  type: 'IMAGES',
  user
})

export const startUpload = file => async dispatch => {
  api.user.uploadImage(file).then(user => {
    dispatch(display(user))
  })
}

export const setWallpaper = user => ({
  type: 'SET_WALLPAPER',
  user
})

export const startWallpaper = data => async dispatch => {
  api.user.setWallpaper(data).then(user => dispatch(setWallpaper(user)))
}

export const deleteImage = data => async dispatch => {
  api.user.deleteImage(data).then(user => {
    dispatch(display(user))
  })
}

export const nuke = () => ({
  type: 'NUKE'
})

export const startNuke = email => dispatch =>
  api.user.nuke(email).then(user => {
    dispatch(nuke())
  })
