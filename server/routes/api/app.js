import cloudinary from 'cloudinary'
import User from '../../models/User'
import moment from 'moment'

module.exports = app => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  })

  app.post('/api/divvy', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      const input = req.body.income
      user.wants.forEach(want => {
        if (!want.completed) {
          const multiplier = want.percent / 100
          const haul = input * multiplier

          const revenue = want.progress + haul

          console.log(
            `
            ------------------------------------------------------------
            stats:
            name : ${want.name}
            input (req.body.income): ${req.body.income}
            multiplier (want.percent / 100): ${multiplier}
            
            want.goal: ${want.goal}

            want.progress: ${want.progress}
            haul (input * multiplier): ${haul} 
            revenue (want.progress + haul): ${revenue}
            `
          )

          console.log('\nis revenue > want.goal? ', revenue > want.goal)
          if (revenue > want.goal) {
            // add this accounts points to global
            user.points += want.percent

            // remove completed goals points
            want.percent = 0

            // store excess cash
            const leftover = revenue - want.goal
            console.log(
              `leftover (revenue (${revenue}) - want.goal (${
                want.goal
              })):  ${leftover}`
            )

            // add excess cash to global
            user.undistributedCash += leftover

            // set progress exactly equal to goal
            want.progress += haul - leftover
            console.log(
              `want.progress += (haul - leftover): 
              want.progress: ${want.progress} += 
              haul: ${haul} - 
              leftover: ${leftover}`
            )

            // set want as finished
            want.completed = true

            // store date completed
            want.dateCompleted = moment()
          } else {
            // add cash to account
            want.progress += haul
          }
        }
      })

      user.needs.forEach(need => {
        const multiplier = need.percent / 100
        const haul = input * multiplier

        console.log('need haul: ', haul)

        need.total += haul
      })

      user.save().then(user => res.json(user))
    })
  })

  app.post('/api/wipe', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      user.wants.forEach(want => (want.progress = 0))
      user.needs.forEach(need => (need.total = 0))

      user.undistributedCash = 0

      user.save().then(user => res.json(user))
    })
  })

  app.post('/api/nuke', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      user.wants = []
      user.needs = []

      user.undistributedCash = 0
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
