const Counter = require('../../models/Counter')

module.exports = app => {
  app.get('/api/counters', (req, res, next) => {
    console.log('hit get counters route')
    Counter.find()
      .exec()
      .then(counter => res.json(counter))
      .catch(err => next(err))
  })

  app.post('/api/counters', function(req, res, next) {
    console.log('hit create counters route')
    const counter = new Counter()

    counter
      .save()
      .then(() => res.json(counter))
      .catch(err => next(err))
  })

  app.delete('/api/counters/:id', function(req, res, next) {
    Counter.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(counter => res.json())
      .catch(err => next(err))
  })

  app.put('/api/counters/:id/increment', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then(counter => {
        counter.count++

        counter
          .save()
          .then(() => res.json(counter))
          .catch(err => next(err))
      })
      .catch(err => next(err))
  })

  app.put('/api/counters/:id/decrement', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then(counter => {
        counter.count--

        counter
          .save()
          .then(() => res.json(counter))
          .catch(err => next(err))
      })
      .catch(err => next(err))
  })
}
