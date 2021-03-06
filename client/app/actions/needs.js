import React from 'react'
import api from '../api'

export const createNeed = user => ({
  type: 'CREATE_NEED',
  details: user.needs[0],
  points: user.points
})

export const startCreateNeed = data => dispatch =>
  api.user.createNeed(data).then(user => {
    dispatch(createNeed(user))
  })

export const display = needs => ({
  type: 'IMAGES',
  needs
})

export const startDisplay = email => async dispatch => {
  api.user.getImages(email).then(images => {
    dispatch(display(images))
  })
}

export const startUpload = file => async dispatch => {
  api.user.uploadImage(file).then(needs => {
    console.log('return data (images or user) from api call: ', needs)
    dispatch(display(needs))
  })
}
