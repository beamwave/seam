import axios from 'axios'

export default {
  user: {
    login: credentials =>
      axios
        .post('/login', { credentials })
        .then(res => console.log(`axios worked!`)),

    signup: user => axios.post('/signup', { user }).then(res => res.user)

    // signup: user => {
    //   console.log('now in api object file')
    //   console.log(user)
    //   fetch('/signup', {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ user })
    //   }).then(res => res.data.user)
    // }

    // confirm: token =>
    //   fetch('/verification', JSON.stringify({ token })).then(
    //     res => res.data.user
    //   )
  }
}
