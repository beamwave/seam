import React from 'react'
import api from '../api'

export const createWant = user => ({
  type: 'CREATE_WANT',
  details: user.wants[0],
  points: user.points
})

export const startCreateWant = data => dispatch =>
  api.user.createWant(data).then(user => {
    dispatch(createWant(user))
  })

export const update = user => ({
  type: 'UPDATE',
  user
})

export const updateWant = data => dispatch =>
  api.user.updateAccounts(data).then(user => {
    dispatch(update(user))
  })
