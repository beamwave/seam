import React from 'react'
import api from '../api'

export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.appJWT = user.token
    dispatch(login(user))
  })

export const logout = () => ({
  type: 'LOGOUT'
})

// TODO: handle logout
export const startLogout = () => dispatch => {
  localStorage.removeItem('appJWT')
  dispatch(logout())
}

export const startSignup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.appJWT = user.token
    dispatch(login(user))
  })

export const handleToken = token => async dispatch => {
  const res = await api.user.payWith(token)

  // dispatch({ type: FETCH_USER, payload: res.data })
}

export const display = images => ({
  type: 'IMAGES',
  images
})

export const startDisplay = email => async dispatch => {
  api.user.getImages(email).then(images => {
    dispatch(display(images))
  })
}

export const startUpload = file => async dispatch => {
  api.user.uploadImage(file).then(images => {
    dispatch(display(images))
  })
}

export const startImageDelete = data => async dispatch => {
  api.user.deleteImage(data).then(images => {
    dispatch(display(images))
  })
}
