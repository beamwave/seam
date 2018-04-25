import axios from 'axios'

export default {
  user: {
    // implicit return of user data
    login: credentials =>
      // put credentials in object
      axios.post('/api/login', { credentials }).then(res => res.data.user),

    // implicit return of user data
    signup: user =>
      axios.post('/api/signup', { user }).then(res => res.data.user),
    // confirm: token =>
    //   fetch('/verification', JSON.stringify({ token })).then(
    //     res => res.data.user
    //   )
    payWith: token =>
      axios
        .post('/api/stripe', token, {
          headers: {
            Authorization: 'Bearer '.concat(localStorage.getItem('appJWT'))
          }
        })
        .then(res => res.data),

    updateGeneral: file =>
      axios.post('/api/general_settings', file).then(res => res.data),

    updatePassword: file =>
      axios.post('/api/password_settings', file).then(res => res.data),

    updateTransfer: file =>
      axios.post('/api/transfer_settings', file).then(res => res.data),

    transfer: data => axios.post('/api/transfer', data).then(res => res.data),

    invite: data => axios.post('/api/invite', data).then(res => res.data),

    deleteAccount: data =>
      axios.post('/api/delete', data).then(res => res.data),

    updateAccounts: data =>
      axios.post('/api/update', data).then(res => res.data),

    getUser: email => axios.post('/api/get_user', email).then(res => res.data),

    createWant: details =>
      axios.post('/api/create_want', details).then(res => res.data),

    createNeed: details =>
      axios.post('/api/create_need', details).then(res => res.data),

    setWallpaper: data =>
      axios.post('/api/set_wallpaper', data).then(res => res.data),

    uploadImage: file =>
      axios.post('/api/upload_image', file).then(res => res.data),

    deleteImage: data =>
      axios.post('/api/delete_image', data).then(res => res.data),

    divvy: data => axios.post('/api/divvy', data).then(res => res.data),

    wipe: email => axios.post('/api/wipe', email).then(res => res.data),

    nuke: email => axios.post('/api/nuke', email).then(res => res.data)
  }
}

// const AuthStr = 'Bearer '.concat(USER_TOKEN)
// axios.get(URL, { headers: { Authorization: AuthStr } })
