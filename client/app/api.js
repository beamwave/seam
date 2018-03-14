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
      })
  }
}

// const AuthStr = 'Bearer '.concat(USER_TOKEN)
// axios.get(URL, { headers: { Authorization: AuthStr } })
