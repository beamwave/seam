import User from '../../models/User.js'

module.exports = app => {
  app.post('/signup', (req, res, next) => {
    const { email, password } = req.body.user
    console.log(`Here is the destructure: ${email} ${password}`)
    console.log(process.env.JWT_SECRET)
    const user = new User({ email })

    user.setPassword(password)
    console.log('password set.')

    // user.setVerificationToken()
    // console.log('verification token set.')

    user
      .save()
      .then(user => {
        // sendConfirmationEmail(user)
        return res.json({ user: user.toAuthJSON() })
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({ errors: parseErrors(err.errors) })
      })
  })

  app.post('/login', (req, res, next) => {
    const { credentials } = req.body

    User.findOne({ email: credentials.email }).then(user => {
      if (user && user.isValidPassword(credentials.password)) {
        res.json({ user: user.toAuthJSON() })
      } else {
        res.status(400).json({ errors: { global: 'Invalid credentials.' } })
      }
    })
  })
}
