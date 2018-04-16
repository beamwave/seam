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

export const updateGeneral = data => ({
  type: 'GENERAL',
  data
})

export const startUpdateGeneral = data => async dispatch => {
  api.user.updateGeneral(data).then(user => dispatch(updateGeneral(user)))
  // const user = await api.user.updateGeneral(data)

  // dispatch(user)
}

export const updatePassword = data => ({
  type: 'PASSWORD',
  data
})

export const startUpdatePassword = data => async dispatch => {
  const user = await api.user.updatePassword(data)

  // dispatch(user)
}

export const updateTransfer = data => ({
  type: 'TRANSFER',
  data
})

export const startUpdateTransfer = data => async dispatch => {
  const user = await api.user.updateTransfer(data)

  // dispatch(user)
}
