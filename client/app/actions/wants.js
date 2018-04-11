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

export const display = wants => ({
  type: 'IMAGES',
  wants
})

export const startDisplay = email => async dispatch => {
  api.user.getImages(email).then(images => {
    dispatch(display(images))
  })
}

export const startUpload = file => async dispatch => {
  api.user.uploadImage(file).then(wants => {
    console.log('return data (images or user) from api call: ', wants)
    dispatch(display(wants))
  })
}

export const startImageDelete = data => async dispatch => {
  api.user.deleteImage(data).then(images => {
    dispatch(display(images))
  })
}
