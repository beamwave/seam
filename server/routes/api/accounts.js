import cloudinary from 'cloudinary'
import multer from 'multer'
import crypto from 'crypto'
import mime from 'mime'
import User from '../../models/User'
import mongoose from 'mongoose'

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

module.exports = app => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  })

  app.post('/api/create_want', upload.single('file'), (req, res) => {
    User.findOne({ email: req.body.email }).then(async user => {
      const name = req.body.name
      const percent = req.body.percent
      const goal = req.body.goal
      const description = req.body.description ? req.body.description : ''

      if (user.points - percent >= 0) {
        if (req.file) {
          cloudinary.v2.uploader.upload(
            req.file.path,
            {
              folder: `${user.id}/wants`, // folder name on cloudinary
              tags: [user.id] // tags for images
            },
            (e, result) => {
              if (e) {
                console.log('cloudinary error: ', e) // HANDLE BETTER FOR PROD
              } else {
                // add new want to array
                user.wants.unshift({
                  _id: mongoose.Types.ObjectId(),
                  name,
                  percent,
                  goal,
                  description,
                  images: [result.secure_url],
                  wallpaper: result.secure_url
                })

                // subtract points
                user.points = user.points - percent

                user.save().then(user => {
                  res.json(user)
                })
              }
            }
          )
        } else {
          const placeholder =
            'http://res.cloudinary.com/project-phantom/image/upload/v1524348278/global/image-placeholder.jpg'
          user.wants.unshift({
            _id: mongoose.Types.ObjectId(),
            name,
            percent,
            goal,
            description,
            wallpaper: placeholder
          })

          // subtract points
          user.points = user.points - percent

          user.save().then(user => {
            res.json(user)
          })
        }
      } else {
        console.log('sorry, you do not have enough points.')
      }
    })
  })

  app.post('/api/delete_image', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      const folder = req.body.acctype

      if (folder === 'wants') {
        const gallery = user.wants
          .id(req.body.id)
          .images.filter((image, i) => image !== req.body.url)

        user.wants.id(req.body.id).images = gallery

        // if deleted image === wallpaper, reset wallpaper
        if (user.wants.id(req.body.id).wallpaper === req.body.url) {
          user.wants.id(req.body.id).wallpaper = user.wants.id(
            req.body.id
          ).images[0]
        }
      }

      if (folder === 'needs') {
        const gallery = user.needs
          .id(req.body.id)
          .images.filter((image, i) => image !== req.body.url)

        user.needs.id(req.body.id).images = gallery

        // if deleted image === wallpaper, reset wallpaper
        if (user.needs.id(req.body.id).wallpaper === req.body.url) {
          user.needs.id(req.body.id).wallpaper = user.needs.id(
            req.body.id
          ).images[0]
        }
      }

      user.save().then(user => {
        // public id = folder/image without ext

        const img = req.body.url.slice(-24, -4)
        const public_id = `${user._id}/${folder}/${img}`
        cloudinary.v2.uploader.destroy(public_id, (e, result) => {
          if (e) {
            console.log('cloudinary error: ', e)
          } else {
            res.json(user)
          }
        })
      })
    })
  })

  app.post('/api/create_need', upload.single('file'), (req, res) => {
    User.findOne({ email: req.body.email }).then(async user => {
      const name = req.body.name
      const percent = req.body.percent
      const method = req.body.method
      const payment = req.body.payment
      const description = req.body.description ? req.body.description : ''

      console.log('reached need route')

      if (user.points - percent >= 0) {
        cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: `${user.id}/needs`, // folder name on cloudinary
            tags: [user.id] // tags for images
          },
          (e, result) => {
            if (e) {
              console.log('cloudinary error: ', e) // HANDLE BETTER FOR PROD
            } else {
              // add new want to array
              user.needs.unshift({
                _id: mongoose.Types.ObjectId(),
                name,
                percent,
                method,
                payment,
                description,
                images: [result.secure_url],
                wallpaper: result.secure_url
              })

              console.log('uploaded to cloudinary')

              // subtract points
              user.points = user.points - percent

              user.save().then(user => {
                res.json(user)
              })
            }
          }
        )
      } else {
        console.log('sorry, you do not have enough points.')
      }
    })
  })

  app.post('/api/upload_image', upload.single('file'), (req, res) => {
    // console.log('req.file:', req.file)

    // find user, then want, then upload, then push result url to array
    User.findOne({ email: req.body.email }).then(user => {
      // folder prop defines cloudinary folder name
      cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: `${user.id}/wants`,
          tags: [user.id],
          secure: true, // generate https urls
          quality: 'auto:eco',
          fetch_format: 'auto', // chooses best format based on browser
          transformation: [{ width: 1080, crop: 'scale' }]
        },
        (e, result) => {
          if (e) {
            console.log('cloudinary error: ', e)
          } else {
            user.wants.id(req.body.id).images.unshift(result.secure_url)

            const placeholder =
              'http://res.cloudinary.com/project-phantom/image/upload/v1524348278/global/image-placeholder.jpg'

            // test default image replacement
            if (user.wants.id(req.body.id).wallpaper === placeholder) {
              user.wants.id(req.body.id).wallpaper = result.secure_url
            }

            user.save().then(user => {
              res.json(user)
            })
          }
        }
      )
    })
  })

  app.post('/api/set_wallpaper', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      const wallpaper = req.body.wallpaper
      user.wants.id(req.body.id).wallpaper = wallpaper

      user.save().then(user => {
        res.json(user)
      })
    })
  })

  // update want (allow for needs too)
  app.post('/api/update', (req, res) => {
    const { email, _id, name, percent, description, goal } = req.body

    User.findOne({ email }).then(user => {
      console.log(`
      old percent: ${user.wants.id(_id).percent}
      new percent: ${percent}
      points: ${user.points}
      `)

      const oldPercent = user.wants.id(_id).percent

      if (percent < oldPercent) {
        const diff = oldPercent - percent
        user.points = user.points + diff
      }

      if (percent > oldPercent) {
        const diff = percent - oldPercent
        user.points = user.points - diff
      }

      user.wants.id(_id).name = name
      user.wants.id(_id).percent = percent
      user.wants.id(_id).description = description
      user.wants.id(_id).goal = goal

      user.save().then(user => res.json(user))
    })
  })

  app.post('/api/transfer', (req, res) => {
    const { email, amount, from, to } = req.body
    User.findOne({ email }).then(user => {
      const wantfrom = user.wants.id(from)
      const needfrom = user.needs.id(from)
      const wantto = user.wants.id(to)
      const needto = user.needs.id(to)

      if (wantfrom) {
        user.wants.id(from).progress -= amount
      }
      if (needfrom) {
        user.needs.id(from).total -= amount
      }
      if (wantto) {
        user.wants.id(to).progress += amount
      }
      if (needto) {
        user.needs.id(to).total += amount
      }

      user.save().then(user => res.json(user))
    })
  })
}
