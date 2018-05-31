import axios from 'axios'

export let getToken = () => {
  console.log('getting token...')
  const token = localStorage.getItem('appJWT')
  //headers must be an object
  return { token }
}
export default {
  user: {
    login: credentials =>
      axios.post('/api/login', { credentials }).then(res => res.data.user),

    signup: user =>
      axios.post('/api/signup', { user }).then(res => res.data.user),
    // confirm: token =>
    //   fetch('/verification', JSON.stringify({ token })).then(
    //     res => res.data.user
    //   )
    payWith: token =>
      axios
        .post('/api/stripe', token, { headers: getToken() })
        .then(res => res.data),

    updateGeneral: file =>
      axios
        .post('/api/general_settings', file, { headers: getToken() })
        .then(res => res.data),

    updatePassword: file =>
      axios
        .post('/api/password_settings', file, { headers: getToken() })
        .then(res => res.data),

    updateTransfer: file =>
      axios
        .post('/api/transfer_settings', file, { headers: getToken() })
        .then(res => res.data),

    transfer: data =>
      axios
        .post('/api/transfer', data, { headers: getToken() })
        .then(res => res.data),

    invite: data =>
      axios
        .post('/api/invite', data, { headers: getToken() })
        .then(res => res.data),

    deleteAccount: data =>
      axios
        .post('/api/delete', data, { headers: getToken() })
        .then(res => res.data),

    updateAccounts: data =>
      axios
        .post('/api/update', data, { headers: getToken() })
        .then(res => res.data),

    getUser: email =>
      axios
        .post('/api/get_user', email, { headers: getToken() })
        .then(res => res.data),

    createWant: details =>
      axios
        .post('/api/create_want', details, { headers: getToken() })
        .then(res => res.data),
    createNeed: details =>
      axios
        .post('/api/create_need', details, { headers: getToken() })
        .then(res => res.data),

    setWallpaper: data =>
      axios
        .post('/api/set_wallpaper', data, { headers: getToken() })
        .then(res => res.data),

    uploadImage: file =>
      axios
        .post('/api/upload_image', file, { headers: getToken() })
        .then(res => res.data),

    deleteImage: data =>
      axios
        .post('/api/delete_image', data, { headers: getToken() })
        .then(res => res.data),

    divvy: data =>
      axios
        .post('/api/divvy', data, { headers: getToken() })
        .then(res => res.data),

    distribute: data =>
      axios
        .post('/api/distribute', data, { headers: getToken() })
        .then(res => res.data),

    wipe: email =>
      axios
        .post('/api/wipe', email, { headers: getToken() })
        .then(res => res.data),

    nuke: email =>
      axios
        .post('/api/nuke', email, { headers: getToken() })
        .then(res => res.data)
  }
}
