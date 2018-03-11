import React from 'react'
import axios from 'axios'
import api from '../api'

export const login = user => ({
  type: 'LOGIN',
  user
})

export const startLogin = credentials =>
  api.user.login(credentials).then(user => {
    localStorage.appJWT = user.token
    console.log('user logged in and local storage set.')
    return user
  })

export const logout = credentials => ({
  type: 'LOGOUT'
})

// TODO: handle logout
export const startLogout = () => {
  localStorage.removeItem('appJWT')
  return
}

export const startSignup = data => dispatch =>
  api.user.signup(data).then(user => {
    // localStorage.appJWT = user.token
    dispatch(login(user))
  })
