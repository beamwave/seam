import cloudinary from 'cloudinary'
// import path from 'path'
// import Datauri from 'datauri'
import multer from 'multer'
import crypto from 'crypto'
import mime from 'mime'

import User from '../../models/User'

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

    // cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: '../../images' })

module.exports = app => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  })

  app.post('/api/get_images', (req, res) => {
    console.log('req.body:')
    console.log(req.body)
    User.findOne({ email: req.body.email }).then(user => {
      res.json(user)
    })
  })

  app.post('/api/upload_image', upload.single('file'), (req, res) => {
    // console.log('req.file:', req.file)

    User.find({ email: req.body.email }).then(userInArr => {
      let user = userInArr[0]

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
            user.images.unshift(result.secure_url)
            user.save().then(user => {
              console.log('image url saved and updated user sent to client.')
              res.json(user)
            })
          }
        }
      )
    })
  })

  app.post('/api/delete_image', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      const updatedGallery = user.images.filter(
        (image, i) => image !== req.body.url
      )

      user.images = updatedGallery

      user.save().then(user => {
        // public id = folder/image without ext
        cloudinary.v2.uploader.destroy(
          req.body.url.substr(68, 45),
          (e, result) => {
            if (e) {
              console.log('cloudinary error: ', e)
            } else {
              console.log('image successfully deleted')
              res.json(user)
            }
          }
        )
      })
      // cloudinary.uploader // image filename ie sample.jpg
      //   .destroy(req.body.name)
      //   .then(result => {
      //     console.log(
      //       `Image ${result.secure_url} successfully deleted from cloudinary.`
      //     )
      //   })
      //   .catch(e => console.log('Error deleteing image: ', e))
    })
  })
}
