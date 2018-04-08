import User from '../../models/User'

module.exports = app => {
  app.post('/api/create_want', (req, res) => {
    console.log('hit create want route')
    User.findOne({ email: req.body.email }).then(async user => {
      const name = req.body.name
      const percent = req.body.percent
      const goal = req.body.goal
      const description = req.body.description ? req.body.description : ''

      user.wants.unshift({
        name,
        percent,
        goal,
        description
      })
      user.save().then(user => res.json(user))
    })
  })
}
