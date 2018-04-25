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
  api.user.deleteImage(data).then(user => dispatch(display(user)))
}

export const divvy = user => ({
  type: 'DIVVY',
  user
})

export const startDivvy = data => async dispatch =>
  api.user.divvy(data).then(user => dispatch(divvy(user)))

export const transfer = user => ({
  type: 'TRANSFER',
  user
})

export const startTransfer = data => async dispatch =>
  api.user.transfer(data).then(user => dispatch(transfer(user)))

export const invite = user => ({
  type: 'INVITE',
  user
})

export const startInvite = data => dispatch =>
  api.user.invite(data).then(user => {
    dispatch(invite(user))
  })

export const deleteAccount = user => ({
  type: 'DELETE',
  user
})

export const startDeleteAccount = data => dispatch =>
  api.user.deleteAccount(data).then(user => dispatch(deleteAccount(user)))

export const wipe = user => ({
  type: 'WIPE',
  user
})

export const startWipe = email => dispatch =>
  api.user.wipe(email).then(user => {
    dispatch(wipe(user))
  })

export const nuke = user => ({
  type: 'NUKE',
  user
})

export const startNuke = email => dispatch =>
  api.user.nuke(email).then(user => {
    dispatch(nuke(user))
  })
