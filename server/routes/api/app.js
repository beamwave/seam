import cloudinary from 'cloudinary'
import User from '../../models/User'

module.exports = app => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  })

  app.post('/api/nuke', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      user.wants = []
      user.needs = []

      user.points = 100

      // delete all images from users cloudinary folder
      cloudinary.v2.api.delete_resources_by_prefix(`${user.id}/wants`, result =>
        cloudinary.v2.api.delete_resources_by_prefix(
          `${user.id}/needs`,
          result => user.save().then(user => res.json(user))
        )
      )
    })
  })
}
