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

      cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: user.id, // folder name on cloudinary
          tags: [user.id] // tags for images
        },
        (e, result) => {
          if (e) {
            console.log('cloudinary error: ', e) // HANDLE BETTER FOR PROD
          } else {
            // user.images.unshift(result.secure_url)
            user.wants.unshift({
              _id: mongoose.Types.ObjectId(),
              name,
              percent,
              goal,
              description,
              images: [result.secure_url],
              wallpaper: result.secure_url
            })
            user.save().then(user => {
              res.json(user)
            })
          }
        }
      )
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
          folder: user.id,
          tags: [user.id]
        },
        (e, result) => {
          if (e) {
            console.log('cloudinary error: ', e)
          } else {
            user.wants.id(req.body.id).images.unshift(result.secure_url)

            user.save().then(user => {
              res.json(user.wants)
            })
          }
        }
      )
    })
  })
}
