import multer from 'multer'
import crypto from 'crypto'
import mime from 'mime'
import cloudinary from 'cloudinary'
import stripeApi from 'stripe'
const stripe = stripeApi(process.env.SECRET_KEY)
import User from '../../models/User.js'
import parseErrors from '../../utils/parseErrors.js'
import { verifyToken } from '../../utils/verifyToken'

module.exports = app => {
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      crypto.pseudoRandomBytes(16, (e, raw) => {
        cb(
          null,
          `${raw.toString('hex')}${Date.now()}.${mime.getExtension(
            file.mimetype
          )}`
        )
      })
    }
  })

  const upload = multer({ storage: storage })

  app.post('/api/signup', async (req, res, next) => {
    const { username, email, password } = req.body.user

    const user = new User({ username, email })

    // user.stripe = customer.id

    user.setPassword(password)
    // console.log('password set.')

    user.setVerificationToken()
    // console.log('token set.')

    user
      .save()
      .then(async user => {
        const customer = await stripe.customers.create({ email })
        user.stripe = customer.id

        user.save().then(user => {
          // sendConfirmationEmail(user)
          res.json({ user: user.toAuthJSON() })
        })
      })
      .catch(err => {
        console.log('YOUR ERROR: ', err.errors.email.message)
        // res.status(400).json({ errors: parseErrors(err.errors) })
        res.status(400).json({ errors: { global: err.errors.email.message } })
      })
  })

  app.post('/api/login', (req, res, next) => {
    // takes credentials out of object
    const { credentials } = req.body

    User.findOne({ email: credentials.email }).then(async user => {
      if (user && user.isValidPassword(credentials.password)) {
        if (user.stripe === undefined) {
          const customer = await stripe.customers.create({
            email: credentials.email
          })
          console.log('customer created:')
          console.log(customer)

          user.stripe = customer.id
          console.log('stripe property added:')
          console.log(user.stripe)

          user.save().then(user => {
            res.json({ user: user.toAuthJSON() })
          })
        } else {
          res.json({ user: user.toAuthJSON() })
        }
      } else {
        res.status(400).json({ errors: { global: 'Invalid credentials.' } })
      }
    })
  })

  // update user settings
  app.post(
    '/api/general_settings',
    verifyToken,
    upload.single('file'),
    (req, res) => {
      const { email, username, newEmail } = req.body
      User.findOne({ email: req.body.email }).then(user => {
        if (newEmail.length > 0) {
          user.email = newEmail
        }
        if (username.length > 0) {
          user.username = username
        }
        if (req.file.path.length > 0) {
          cloudinary.v2.uploader.upload(
            req.file.path,
            {
              folder: `${user.id}/profile`, // folder name on cloudinary
              tags: [user.id] // tags for images
            },
            (e, result) => {
              if (e) {
                console.log('cloudinary error: ', e) // HANDLE BETTER FOR PROD
              } else {
                // overwrite profile image
                user.photo = result.secure_url

                user.save().then(user => {
                  res.json(user)
                })
              }
            }
          )
        } else {
          user.save().then(user => {
            res.json(user)
          })
        }
      })
    }
  )

  app.post('/api/password_settings', verifyToken, (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (req.body.email.length) console.log('user found man: ', user)
    })
  })

  app.post('/api/transfer_settings', verifyToken, (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      console.log('user found man: ', user)
    })
  })

  app.post('/api/get_user', verifyToken, (req, res) => {
    User.findOne({ email: req.body.email }).then(user => res.json(user))
  })
}
