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
      axios.post('/api/stripe', token, {
        headers: {
          Authorization: 'Bearer '.concat(localStorage.getItem('appJWT'))
        }
      }),

    getImages: email =>
      axios.post('/api/get_images', email).then(res => res.data.images),

    uploadImage: file =>
      axios.post('/api/upload_image', file).then(res => res.data.images),

    deleteImage: data =>
      axios.post('/api/delete_image', data).then(res => res.data.images)
  }
}

// const AuthStr = 'Bearer '.concat(USER_TOKEN)
// axios.get(URL, { headers: { Authorization: AuthStr } })
