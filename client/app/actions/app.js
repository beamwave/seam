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

export const nuke = () => ({
  type: 'NUKE'
})

export const startNuke = email => dispatch =>
  api.user.nuke(email).then(user => {
    dispatch(nuke())
  })
