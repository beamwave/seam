import cloudinary from 'cloudinary'
import multer from 'multer'
import crypto from 'crypto'
import mime from 'mime'

import User from '../../models/User'

// GET READY TO REMOVE THIS, JUST MAKE SURE YOU PORT OVER ROUTES

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

  // app.post('/api/upload_image', upload.single('file'), (req, res) => {
  //   // console.log('req.file:', req.file)

  //   User.find({ email: req.body.email }).then(userInArr => {
  //     let user = userInArr[0]

  //     // folder prop defines cloudinary folder name
  //     cloudinary.v2.uploader.upload(
  //       req.file.path,
  //       {
  //         folder: user.id,
  //         tags: [user.id]
  //       },
  //       (e, result) => {
  //         if (e) {
  //           console.log('cloudinary error: ', e)
  //         } else {
  //           user.images.unshift(result.secure_url)
  //           user.save().then(user => {
  //             console.log('image url saved and updated user sent to client.')
  //             res.json(user)
  //           })
  //         }
  //       }
  //     )
  //   })
  // })
}
