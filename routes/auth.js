const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/login', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/secret')
    return
  } else {
    res.render('login')
  }
})

router.get('/signup', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/secret')
    return
  } else {
    res.render('signup')
  }
})

router.post('/login', function(req, _res) {
  passport.authenticate('local'), {
    successRedirect: '/secret',
    failureRedirect: '/login',
    failureFlash: true }
})

router.post('/signup', function (req, res) {
  var salt = bcrypt.genSaltSync(12)
  var hash = bcrypt.hashSync(req.body.password, salt)
  knex('users').select().where('username', req.body.username).first()
  .then(function(user){
    console.log(user)
    if(user){
      res.render('signup', {message: 'That user already exists!'})
    } else {
      knex('users').insert({
          username: req.body.username,
          password: hash,
      }, 'username')
      .then(function (username) {
        res.render('secret', {username: username})
      })
    }
  })
})

router.get('/secret', function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
  } else {
    res.render('secret', {username: req.username})
  }
})

router.post('/logout', function (req, res) {
  req.logout()
  res.end('logged out')
})

module.exports = router
