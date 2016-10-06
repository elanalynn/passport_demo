const express = require('express')
const router = express.Router()
const db = require('../db/api')
// const auth = require('../auth')

router.get('/', function(req, res) {
  db.getUser(req.session.userId).then((user) => {
    res.render('home', { user: user })
  })
})

module.exports = router
