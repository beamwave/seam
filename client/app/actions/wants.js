import React from 'react'
import api from '../api'

export const createWant = details => ({
  type: 'CREATE_WANT',
  details
})

export const startCreateWant = data => dispatch =>
  api.user.createWant(data).then(wants => {
    const lastestWant = wants[0]
    dispatch(createWant(lastestWant))
  })
